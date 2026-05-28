const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SOURCE_LOGCODES = path.join(ROOT, "handover_logcode_structure.json");
const SOURCE_B821_TREE = path.join(ROOT, "b821_field_tree_table.json");
const EVENTS_DIR = path.join(ROOT, "data", "events");
const LOGCODES_DIR = path.join(ROOT, "data", "logcodes");
const FIELDS_DIR = path.join(ROOT, "data", "fields");
const GENERATED_DIR = path.join(ROOT, "data", "generated");

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

function splitTitle(title) {
  const match = title.match(/^(0x[0-9A-Fa-f]+)\s+(.*)$/);
  return match ? { logcode: match[1], name: match[2] } : { logcode: "", name: title };
}

function recordId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function categoryFor(name) {
  if (/rrc/i.test(name)) return "RRC";
  if (/ml1/i.test(name)) return "ML1";
  if (/mac/i.test(name)) return "MAC";
  if (/event/i.test(name)) return "Event";
  if (/lte/i.test(name)) return "LTE";
  return "Other";
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

function build() {
  const source = readJson(SOURCE_LOGCODES, {});
  const b821Tree = readJson(SOURCE_B821_TREE, []);
  fs.mkdirSync(LOGCODES_DIR, { recursive: true });
  fs.mkdirSync(GENERATED_DIR, { recursive: true });

  const records = Object.entries(source).map(([title, detail]) => {
    const parts = splitTitle(title);
    const record = {
      id: recordId(title),
      logcode: parts.logcode,
      name: parts.name,
      title,
      category: categoryFor(parts.name),
      detail
    };
    if (parts.logcode.toLowerCase() === "0xb821") {
      record.fieldTreeTable = b821Tree;
    }
    return record;
  });

  records.forEach((record) => {
    writeJson(path.join(LOGCODES_DIR, `${record.logcode}.json`), record);
  });

  const logcodeIndex = records.map(({ id, logcode, name, title, category, fieldTreeTable }) => ({
    id,
    logcode,
    name,
    title,
    category,
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

  fs.mkdirSync(FIELDS_DIR, { recursive: true });
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

  console.log(`Wrote ${records.length} logcode files`);
  console.log(`Wrote ${fieldIndex.length} field index entries`);
  console.log(`Wrote ${fieldIndex.length} field detail files`);
  console.log(`Wrote ${eventToLogcodes.length} event-to-logcode entries`);
}

build();
