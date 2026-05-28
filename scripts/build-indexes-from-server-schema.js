const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const UPSTREAM_DIR = path.join(ROOT, "data", "upstream", "server_schema_20260526");
const UPSTREAM_SCHEMAS_DIR = path.join(UPSTREAM_DIR, "schemas");
const LOGCODES_DIR = path.join(ROOT, "data", "logcodes");
const FIELDS_DIR = path.join(ROOT, "data", "fields");
const EVENTS_DIR = path.join(ROOT, "data", "events");
const GENERATED_DIR = path.join(ROOT, "data", "generated");
const PRESERVED_B821 = path.join(LOGCODES_DIR, "0xB821.json");

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeJs(filePath, globalName, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `window.${globalName} = ${JSON.stringify(value, null, 2)};\n`);
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function recordId(logcode, name) {
  return `${logcode} ${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function categoryFor(logcode, name) {
  if (logcode === "0x1FFB" || /^EVENT_/i.test(name)) return "Other";
  if (/\bNAS\b|MM5G|EMM|GMM|ESM|5GMM|5GSM/i.test(name)) return "NAS";
  if (/\bIMS\b|SIP/i.test(name)) return "IMS";
  if (/\bRRC\b/i.test(name)) return "RRC";
  if (/\bML1\b|\bLL1\b/i.test(name)) return "ML1";
  if (/\bMAC\b/i.test(name)) return "MAC";
  if (/\bRLC\b/i.test(name)) return "RLC";
  if (/\bPDCP\b/i.test(name)) return "PDCP";
  if (/\bL2\b/i.test(name)) return "L2";
  if (/\bLTE\b/i.test(name)) return "LTE";
  return "Other";
}

function displayHeaderName(key) {
  const map = {
    timestamp: "Timestamp",
    log_name: "Log Name",
    length: "Length",
    log_code: "Log Code",
    inner_timestamp: "Inner Timestamp",
    version: "Version"
  };
  return map[key] || key;
}

function convertSchemaNode(node) {
  if (!node || typeof node !== "object") return null;
  if (node.type === "scalar") return null;
  if (node.type === "array") {
    const itemSchema = node.array_item_schema || node.item_schema || node.items || null;
    return { "[]": convertSchemaNode(itemSchema) };
  }
  if (node.type === "object") {
    const fields = node.fields || {};
    return Object.fromEntries(Object.entries(fields).map(([key, child]) => [key, convertSchemaNode(child)]));
  }
  return null;
}

function buildDetailFromServerSchema(schema) {
  const headerFields = schema.header_schema?.fields || {};
  const header = Object.fromEntries(Object.keys(headerFields).map((key) => [displayHeaderName(key), null]));
  const body = convertSchemaNode(schema.body_schema_merged || { type: "object", fields: {} });
  return {
    Header: header,
    [schema.log_name]: body
  };
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isFieldKey(key) {
  return Boolean(key) && key !== "[]" && !/^\d+$/.test(key);
}

function parseTreeLine(line) {
  const indent = (line.match(/^ */) || [""])[0].length;
  const text = line.trim();
  if (!text) return null;
  const label = text.includes(" : ") ? text.split(" : ")[0].trim() : text;
  return {
    level: Math.floor(indent / 2),
    label,
    isIndex: /^\[\*\]/.test(label) || /^\d+$/.test(label)
  };
}

function addField(index, fieldName, record, pathParts) {
  const id = normalize(fieldName);
  if (!id) return;
  if (!index.has(id)) {
    index.set(id, {
      id,
      name: fieldName,
      records: new Map()
    });
  }

  const field = index.get(id);
  if (!field.records.has(record.id)) {
    field.records.set(record.id, {
      id: record.id,
      logcode: record.logcode,
      title: record.title,
      name: record.name,
      category: record.category,
      dataFile: record.dataFile,
      paths: new Set()
    });
  }
  field.records.get(record.id).paths.add(pathParts.join(" -> "));
}

function collectFromObject(value, record, index, pathParts = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectFromObject(item, record, index, pathParts));
    return;
  }
  if (!isPlainObject(value)) return;

  Object.entries(value).forEach(([key, childValue]) => {
    const nextPath = pathParts.concat(key);
    if (isFieldKey(key)) {
      addField(index, key, record, nextPath);
    }
    collectFromObject(childValue, record, index, nextPath);
  });
}

function collectFromB821Tree(rows, record, index) {
  rows.forEach((row) => {
    const stack = [];
    row.tree.split("\n").forEach((line) => {
      const parsed = parseTreeLine(line);
      if (!parsed) return;
      stack.length = parsed.level;
      stack[parsed.level] = parsed.label;
      if (parsed.isIndex || !isFieldKey(parsed.label)) return;
      addField(index, parsed.label, record, [
        row.message_type,
        ...stack.slice(0, parsed.level + 1).filter((part) => part && part !== "[*]")
      ]);
    });
  });
}

function buildFieldIndex(records) {
  const index = new Map();
  records.forEach((record) => {
    if (record.fieldTreeTable && record.fieldTreeTable.length) {
      collectFromB821Tree(record.fieldTreeTable, record, index);
    } else {
      collectFromObject(record.detail, record, index);
    }
  });

  return [...index.values()]
    .map((field) => ({
      id: field.id,
      name: field.name,
      records: [...field.records.values()]
        .map((entry) => ({
          ...entry,
          paths: [...entry.paths].sort()
        }))
        .sort((a, b) => a.title.localeCompare(b.title))
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function collectEventLogcodes(eventData) {
  const logcodes = new Set();
  Object.values(eventData.steps || {}).forEach((step) => {
    [
      ...(step.logcodes || []),
      ...(step.confirmLogcodes || []),
      ...(step.identityLogcodes || [])
    ].forEach((logcode) => logcodes.add(logcode));
  });
  return [...logcodes].sort();
}

function loadServerRecords() {
  const index = readJson(path.join(UPSTREAM_SCHEMAS_DIR, "_index.json"));
  if (!index?.logs?.length) {
    throw new Error(`Missing upstream schema index: ${path.join(UPSTREAM_SCHEMAS_DIR, "_index.json")}`);
  }

  return index.logs
    .filter((entry) => String(entry.log_code).toUpperCase() !== "0XB821")
    .map((entry) => {
      const schemaFile = entry.schema_file;
      const schema = readJson(path.join(UPSTREAM_SCHEMAS_DIR, schemaFile));
      const logcode = schema.log_code;
      const name = schema.log_name;
      return {
        id: recordId(logcode, name),
        logcode,
        name,
        title: `${logcode} ${name}`,
        category: categoryFor(logcode, name),
        dataFile: schemaFile,
        detail: buildDetailFromServerSchema(schema),
        schemaMeta: {
          samplesTotal: schema.samples_total,
          samplesParsedSuccessfully: schema.samples_parsed_successfully,
          parseSuccessRate: schema.parse_success_rate,
          versionStrategy: schema.version_strategy,
          observedInTraces: schema.observed_in_traces || [],
          sourceSchemaFile: schemaFile
        }
      };
    });
}

function build() {
  fs.mkdirSync(LOGCODES_DIR, { recursive: true });
  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  fs.mkdirSync(FIELDS_DIR, { recursive: true });

  const serverRecords = loadServerRecords();
  const b821 = readJson(PRESERVED_B821);
  if (!b821) throw new Error(`Missing preserved B821 file: ${PRESERVED_B821}`);
  b821.dataFile = "0xB821.json";

  const records = [b821, ...serverRecords].sort((a, b) => {
    const byCode = a.logcode.localeCompare(b.logcode);
    return byCode || a.name.localeCompare(b.name);
  });
  const wantedLogcodeFiles = new Set(records.map((record) => record.dataFile));
  fs.readdirSync(LOGCODES_DIR)
    .filter((fileName) => fileName.endsWith(".json") && !wantedLogcodeFiles.has(fileName))
    .forEach((fileName) => fs.unlinkSync(path.join(LOGCODES_DIR, fileName)));

  serverRecords.forEach((record) => {
    writeJson(path.join(LOGCODES_DIR, record.dataFile), record);
  });
  writeJson(PRESERVED_B821, b821);

  const logcodeIndex = records.map(({ id, logcode, name, title, category, dataFile, fieldTreeTable }) => ({
    id,
    logcode,
    name,
    title,
    category,
    dataFile,
    hasFieldTreeTable: Boolean(fieldTreeTable && fieldTreeTable.length)
  }));

  const fieldIndex = buildFieldIndex(records);
  const fieldIndexLight = fieldIndex.map((field) => ({
    id: field.id,
    name: field.name,
    records: field.records.map(({ paths, ...record }) => ({
      ...record,
      pathCount: paths.length
    }))
  }));

  fieldIndex.forEach((field) => {
    writeJson(path.join(FIELDS_DIR, `${field.id}.json`), field);
  });

  const eventToLogcodes = fs.readdirSync(EVENTS_DIR)
    .filter((fileName) => fileName.endsWith(".json") && fileName !== "index.json")
    .map((fileName) => {
      const eventData = readJson(path.join(EVENTS_DIR, fileName), {});
      return {
        event_id: eventData.id || path.basename(fileName, ".json"),
        title: eventData.title || eventData.id || fileName,
        logcodes: collectEventLogcodes(eventData)
      };
    })
    .sort((a, b) => a.event_id.localeCompare(b.event_id));

  writeJson(path.join(GENERATED_DIR, "logcode_index.json"), logcodeIndex);
  writeJson(path.join(GENERATED_DIR, "logcode_bundle.json"), records);
  writeJson(path.join(GENERATED_DIR, "field_index.json"), fieldIndexLight);
  writeJson(path.join(GENERATED_DIR, "field_to_logcodes.json"), fieldIndex);
  writeJson(path.join(GENERATED_DIR, "event_to_logcodes.json"), eventToLogcodes);

  writeJs(path.join(GENERATED_DIR, "logcode_index.js"), "LOGCODE_INDEX", logcodeIndex);
  writeJs(path.join(GENERATED_DIR, "logcode_bundle.js"), "LOGCODE_RECORDS", records);
  writeJs(path.join(GENERATED_DIR, "field_index.js"), "FIELD_INDEX", fieldIndexLight);
  writeJs(path.join(GENERATED_DIR, "field_to_logcodes.js"), "FIELD_TO_LOGCODES", fieldIndex);
  writeJs(path.join(GENERATED_DIR, "event_to_logcodes.js"), "EVENT_TO_LOGCODES", eventToLogcodes);

  console.log(`Imported ${serverRecords.length} server schema records`);
  console.log(`Preserved 0xB821 as ${b821.dataFile}`);
  console.log(`Wrote ${records.length} logcode index records`);
  console.log(`Wrote ${fieldIndex.length} field index entries`);
}

build();
