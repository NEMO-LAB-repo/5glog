import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { eventIndex, findLogcodeRecord, handoverEvent, loadFieldIndex, loadLogcodeRecord, logcodeById, logcodeRecords, normalizeForMatch, nrMeasurementEvents, recordLabel, repositoryFieldNotes, repositoryMessageNotes } from "./data";
import type { FieldIndexEntry, LogcodeRecord, LogcodeRef, LogcodeSummary, MeasurementEventInfo, MessageNoteEntry, MessageNotesStore, StepEvidenceItem, StepInfo, ViewName } from "./types";

type LogcodeVariantItem = {
  label: string;
  meaning: string;
  role: string;
  fields: string[];
  values?: string[];
};

type LogcodeVariantSection = {
  title: string;
  description: string;
  selectorLabel: string;
  items: LogcodeVariantItem[];
};

type MessageLogcodeGroup = {
  logcode: string;
  title: string;
  category: string;
  records: LogcodeSummary[];
};

type AppRoute = {
  view: ViewName;
  detailId?: string;
  selectedTerms?: string[];
  selectedMessageLayer?: string | null;
  selectedLogcodeGroup?: string | null;
  messageQuery?: string;
};

type AppHistoryState = {
  stack: AppRoute[];
  index: number;
};

const initialRoute: AppRoute = { view: "home" };
const localMessageNotesStorageKey = "5glog.localMessageNotes.v1";
const localFieldNotesStorageKey = "5glog.localFieldNotes.v1";

function normalizeRoute(route: AppRoute): AppRoute {
  if (route.view !== "message") return { view: route.view };
  return {
    view: "message",
    selectedMessageLayer: route.selectedMessageLayer || null,
    selectedLogcodeGroup: route.selectedLogcodeGroup || null,
    detailId: route.detailId,
    selectedTerms: route.selectedTerms || [],
    messageQuery: route.messageQuery || ""
  };
}

function routesEqual(left: AppRoute, right: AppRoute) {
  return JSON.stringify(normalizeRoute(left)) === JSON.stringify(normalizeRoute(right));
}

const logcodeGroupNameOverrides: Record<string, string> = {
  "0x1FFB": "Encapsulated Event Report",
  "0xB80A": "MM5G NAS Downlink Message",
  "0xB80B": "MM5G NAS Uplink Message"
};

const networkHandoverTypeTerms = [
  "same gNB-CU / different DU handover",
  "inter-gNB Xn handover",
  "N2 handover"
];

const logcodeVariantSections: Record<string, LogcodeVariantSection[]> = {
  "0x1FFB": [
    {
      title: "Event subtype variants",
      description: "0x1FFB is an event container. For handover, classify the record by the Event subtype / Event ID, then use Timestamp to align it with RRC, ML1, and MAC logs. Some expected HO event names may not appear in this sample field tree, but they are the values to look for in real logs.",
      selectorLabel: "Event subtype / ID",
      items: [
        {
          label: "EVENT_NR5G_RRC_HO_STARTED_V2",
          meaning: "RRC handover procedure started.",
          role: "Confirms the beginning of the HO window; usually near the handover command/config stage.",
          fields: ["Event", "ID", "Timestamp", "Payload Size"],
          values: ["EVENT_NR5G_RRC_HO_STARTED_V2"]
        },
        {
          label: "EVENT_NR5G_RRC_HO_SUCCESS",
          meaning: "RRC handover succeeded.",
          role: "Strong confirmation that target-cell access and RRC completion succeeded.",
          fields: ["Event", "ID", "Timestamp", "Payload Size"],
          values: ["EVENT_NR5G_RRC_HO_SUCCESS"]
        },
        {
          label: "EVENT_NR5G_RRC_NEW_CELL_IND_V2",
          meaning: "UE indicates the new serving cell.",
          role: "Use with 0xB823 / 0xB821 SIB1 to identify source and target cell identity.",
          fields: ["Event", "ID", "Timestamp", "Physical Cell ID", "Frequency", "Cell Id"],
          values: ["EVENT_NR5G_RRC_NEW_CELL_IND_V2"]
        },
        {
          label: "EVENT_NR5G_RRC_UL_MSG_MEAS_REPORT_V4",
          meaning: "UE uplink measurement report event.",
          role: "Useful supporting evidence for Step 3 when paired with 0xB821 UL-DCCH MeasurementReport.",
          fields: ["Event", "ID", "Timestamp", "meas_id", "meas_report_type"],
          values: ["EVENT_NR5G_RRC_UL_MSG_MEAS_REPORT_V4"]
        },
        {
          label: "EVENT_NR5G_RRC_UL_MSG_V2",
          meaning: "Generic NR RRC uplink message event.",
          role: "Use LC Type and Message Type to cross-check uplink RRC activity such as measurement report or completion.",
          fields: ["Event", "ID", "Timestamp", "LC Type", "Message Type"],
          values: ["EVENT_NR5G_RRC_UL_MSG_V2"]
        }
      ]
    }
  ],
  "0xB88A": [
    {
      title: "RACH attempt stage variants",
      description: "0xB88A is one MAC RACH-attempt structure, but the useful evidence is split across Msg1, Msg2, Msg3, Msg4, and the final result fields.",
      selectorLabel: "RACH stage",
      items: [
        {
          label: "Attempt summary / Result",
          meaning: "Overall random-access outcome for this attempt.",
          role: "For handover, look for RACH Result: SUCCESS and whether Contention Type is CONT_FREE or contention-based.",
          fields: ["Num Attempts", "SSB ID", "CSI-RS ID", "Carrier ID", "RACH Result", "Contention Type", "RACH MSG Bitmask"],
          values: ["SUCCESS", "CONT_FREE"]
        },
        {
          label: "RACH Msg1",
          meaning: "UE sends PRACH preamble on the target cell.",
          role: "Shows PRACH timing, preamble configuration, RA-RNTI, and RAR window.",
          fields: ["RACH Msg1", "System Time", "Preamble Format", "PRACH Config", "RAID", "RA_RNTI", "RAR Window Start", "RAR Window End"]
        },
        {
          label: "RACH Msg2",
          meaning: "Network random-access response.",
          role: "Shows temporary RNTI, timing advance, and whether Msg2 response was received.",
          fields: ["RACH Msg2", "T_RNTI", "TA Value", "Result", "SCS"]
        },
        {
          label: "RACH Msg3",
          meaning: "UE sends scheduled uplink message after RAR grant.",
          role: "Useful when the handover RA is contention-based and Msg3 is present.",
          fields: ["RACH Msg3", "Msg3 Grant Raw", "Msg3 Grant Bytes", "HARQ ID", "Mac PDU"]
        },
        {
          label: "RACH Msg4",
          meaning: "Contention resolution.",
          role: "If present, confirms the contention-resolution part of RA and C-RNTI handling.",
          fields: ["RACH Msg4", "Contention Resolution Start", "Contention Resolution End", "C_RNTI"]
        }
      ]
    }
  ],
  "0xB9A7": [
    {
      title: "ML1 event value variants",
      description: "0xB9A7 is not a message-type container like 0xB821. The handover meaning comes from the Event field and the carrier metrics around that timestamp.",
      selectorLabel: "Event value",
      items: [
        {
          label: "HANDOVER_START",
          meaning: "ML1 starts the handover execution window.",
          role: "Align this timestamp after target config is applied and before target-cell random access.",
          fields: ["Event", "Current Systime", "Slot", "Sub FN", "Sys FN", "SCS", "PCI", "DL EARFCN", "Band"],
          values: ["HANDOVER_START"]
        },
        {
          label: "HANDOVER_END",
          meaning: "ML1 ends the handover execution window.",
          role: "Use as supporting timing evidence near random-access success and RRCReconfigurationComplete.",
          fields: ["Event", "Current Systime", "Slot", "Sub FN", "Sys FN", "SCS", "PCI", "DL EARFCN", "Band"],
          values: ["HANDOVER_END"]
        }
      ]
    }
  ]
};

const measurementConfigInput = {
  code: "0xB821",
  codeLabel: "Step 1: 0xB821",
  label: "RRCReconfiguration with measConfig",
  text: "Network delivers RRC measurement rules to UE RRC",
  fields: ["measConfig", "measObjectId", "ssbFrequency", "smtc1", "reportConfigId", "eventId", "a3-Offset", "timeToTrigger"]
};

const measurementMl1ConfigInput = {
  code: "0xB96E",
  codeLabel: "0xB96E",
  label: "ML1 Searcher Measurement Config",
  text: "UE internal measurement config for ML1",
  fields: ["conn_meas_id_cfg", "meas_id", "meas_obj_id", "rpt_cfg_id", "report_cfg"]
};

const measurementRelationNodes = [
  {
    code: "0xB96D",
    label: "Search / Acquisition",
    text: "Radio observation, not signaling",
    fields: ["Raster List", "raster frequency", "nrarfcn", "ARFCN", "Phy Cell Id", "PCI", "SSB Index", "MIB", "RSRP Raw"]
  },
  {
    code: "0xB96A",
    label: "Raw Cell Measurement",
    text: "nrarfcn, PCI, SSB, RSRP/RSRQ/SINR",
    fields: ["nrarfcn", "cellId", "PCI", "ARFCN", "SSB Index", "rsrp", "rsrq", "sinr", "RSRP", "RSRQ", "SINR"]
  },
  {
    code: "0xB97F",
    label: "Measurement Database Update",
    text: "Filtered CellQuality",
    fields: ["Serving Cell PCI", "CellQualityRsrp", "CellQualityRsrq", "Detected Beams"]
  },
  {
    code: "0xB96F",
    label: "Connected Evaluation",
    text: "State, Measurement Id, time-to-trigger, reports sent",
    fields: ["Meas Id", "Cell Id", "State", "Num Reports Sent", "TTT Remaining"]
  },
  {
    code: "0xB821",
    label: "MeasurementReport",
    text: "UE RRC sends final report",
    fields: ["MeasurementReport", "measId", "measResults", "measResultNeighCells", "physCellId", "rsrp", "rsrq", "sinr"]
  }
];

const handoverFieldTerms = new Set(
  [
    "absoluteFrequencySSB",
    "ARFCN",
    "Carrier Id",
    "Cell Id",
    "CellQualityRsrp",
    "CellQualityRsrq",
    "CONT_FREE",
    "Contention Type",
    "CORESET",
    "CRNTI",
    "Event",
    "Event A3",
    "Frequency",
    "HANDOVER",
    "HANDOVER_END",
    "HANDOVER_START",
    "Meas Id",
    "MIB",
    "Num Reports Sent",
    "SIB",
    "Search Space",
    "SSB Index",
    "State",
    "SUCCESS",
    "TDD UL DL CFG",
    "TTT Remaining",
    "a3-Offset",
    "eventId",
    "hysteresis",
    "measConfig",
    "measId",
    "measIdToAddModList",
    "measObjectId",
    "measObjectToAddModList",
    "measResultNeighCells",
    "measResults",
    "MeasurementReport",
    "masterKeyUpdate",
    "mobilityControlInfo",
    "newUE-Identity",
    "nextHopChainingCount",
    "Physical Cell Id",
    "physCellId",
    "Rach Reason",
    "RACH Result",
    "rach-ConfigDedicated",
    "RACH Contention",
    "reportConfigId",
    "reportConfigToAddModList",
    "reportQuantityCell",
    "reconfigurationWithSync",
    "Result",
    "rrcReconfiguration",
    "rrcReconfigurationComplete",
    "rsrp",
    "rsrq",
    "smtc1",
    "sinr",
    "ssb-ToMeasure",
    "ssbFrequency",
    "spCellConfigCommon"
  ].map(normalizeForMatch)
);

const handoverPatterns = [
  /handover/i,
  /random access/i,
  /\brauch\b/i,
  /reconfigurationWithSync/i,
  /rrcReconfiguration/i,
  /measurementReport/i,
  /rach result/i,
  /\bsuccess\b/i
];

const selectedFieldExplanations: Record<string, Record<string, string>> = {
  "0xB96F": {
    "Meas Id": "links this ML1 evaluation to measConfig / MeasurementReport measId",
    "Cell Id": "cell being evaluated for the configured report condition",
    "State": "ENTERING with TTT Remaining = 0, or ENTERED, means the event condition is ready/active",
    "Num Reports Sent": "1 or more means ML1 has already triggered report evidence",
    "TTT Remaining": "0 means time-to-trigger has expired"
  }
};

const messageLayerOrder = ["RRC", "ML1", "MAC", "RLC", "PDCP", "L2", "NAS", "IMS", "LTE", "Other"];

function messageLayerLabel(layer: string): string {
  return layer;
}

function is5gMessageRecord(record: Pick<LogcodeSummary, "logcode" | "name">): boolean {
  return /NR5G|MM5G|5G|EVENT_NR5G/i.test(record.name) || record.logcode === "0xB821";
}

function buildMessageLogcodeGroups(records: LogcodeSummary[]): MessageLogcodeGroup[] {
  const grouped = new Map<string, LogcodeSummary[]>();
  records.filter(is5gMessageRecord).forEach((record) => {
    const key = record.logcode.toLowerCase();
    const group = grouped.get(key) || [];
    group.push(record);
    grouped.set(key, group);
  });

  return [...grouped.values()].map((groupRecords) => {
    const sortedRecords = [...groupRecords].sort((a, b) => a.name.localeCompare(b.name));
    const logcode = sortedRecords[0].logcode;
    const categories = [...new Set(sortedRecords.map((record) => record.category))];
    return {
      logcode,
      title: `${logcode} ${logcodeGroupNameOverrides[logcode] || sortedRecords[0].name}`,
      category: categories.length === 1 ? categories[0] : categories.join(" / "),
      records: sortedRecords
    };
  }).sort((a, b) => {
    const aOrder = messageLayerOrder.indexOf(a.category);
    const bOrder = messageLayerOrder.indexOf(b.category);
    if (aOrder !== -1 || bOrder !== -1) {
      const orderDelta = (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
      if (orderDelta !== 0) return orderDelta;
    }
    return a.logcode.localeCompare(b.logcode);
  });
}

function matchesMessageGroup(group: MessageLogcodeGroup, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  return normalizeForMatch([
    group.logcode,
    group.title,
    group.category,
    ...group.records.map((record) => record.name)
  ].join(" ")).includes(normalizedQuery);
}

function noteCountForGroup(notes: MessageNotesStore, group: MessageLogcodeGroup): number {
  return group.records.reduce((count, record) => count + (notes[record.id]?.notes.length || 0), 0);
}

function emptyMessageNoteEntry(): MessageNoteEntry {
  return {
    description: "",
    notes: []
  };
}

function sanitizeNotesStore(value: unknown, wrapperKey?: "messages" | "fields"): MessageNotesStore {
  const source = wrapperKey && isRecord(value) && isRecord(value[wrapperKey]) ? value[wrapperKey] : value;
  if (!isRecord(source)) return {};

  return Object.fromEntries(
    Object.entries(source).flatMap(([messageId, entry]) => {
      if (!isRecord(entry)) return [];
      const notes = Array.isArray(entry.notes)
        ? entry.notes.flatMap((note) => {
            if (!isRecord(note)) return [];
            const text = typeof note.text === "string" ? note.text.trim() : "";
            if (!text) return [];
            return [{
              id: typeof note.id === "string" && note.id ? note.id : createNoteId(),
              author: typeof note.author === "string" ? note.author : "",
              text,
              createdAt: typeof note.createdAt === "string" && note.createdAt ? note.createdAt : new Date().toISOString()
            }];
          })
        : [];
      const legacyDescription = typeof entry.description === "string" ? entry.description.trim() : "";
      if (legacyDescription && !notes.some((note) => note.text === legacyDescription)) {
        notes.unshift({
          id: `legacy-description-${messageId}`,
          author: "",
          text: legacyDescription,
          createdAt: typeof entry.updatedAt === "string" && entry.updatedAt ? entry.updatedAt : new Date().toISOString()
        });
      }
      const updatedAt = typeof entry.updatedAt === "string" ? entry.updatedAt : undefined;
      return [[messageId, { description: "", notes, updatedAt }]];
    })
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function createNoteId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `note-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function noteCountLabel(entry?: MessageNoteEntry): string {
  if (!entry) return "";
  if (!entry.notes.length) return "";
  return `${entry.notes.length} note${entry.notes.length === 1 ? "" : "s"}`;
}

function readLocalNotesStore(storageKey: string): MessageNotesStore {
  if (typeof window === "undefined") return {};
  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) return {};
    return sanitizeNotesStore(JSON.parse(rawValue));
  } catch {
    return {};
  }
}

function writeLocalNotesStore(storageKey: string, notes: MessageNotesStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(notes, null, 2));
}

function mergeNotesStores(repositoryNotes: MessageNotesStore, localNotes: MessageNotesStore): MessageNotesStore {
  const targetIds = new Set([...Object.keys(repositoryNotes), ...Object.keys(localNotes)]);
  return Object.fromEntries([...targetIds].map((targetId) => {
    const repositoryEntry = repositoryNotes[targetId] || emptyMessageNoteEntry();
    const localEntry = localNotes[targetId] || emptyMessageNoteEntry();
    return [targetId, {
      description: "",
      notes: [...repositoryEntry.notes, ...localEntry.notes],
      updatedAt: localEntry.updatedAt || repositoryEntry.updatedAt
    }];
  }));
}

function appendLocalNote(notes: MessageNotesStore, targetId: string, text: string): MessageNotesStore {
  const trimmedText = text.trim();
  if (!trimmedText) return notes;
  const existingEntry = notes[targetId] || emptyMessageNoteEntry();
  const createdAt = new Date().toISOString();
  return {
    ...notes,
    [targetId]: {
      description: "",
      notes: [
        ...existingEntry.notes,
        {
          id: createNoteId(),
          author: "",
          text: trimmedText,
          createdAt
        }
      ],
      updatedAt: createdAt
    }
  };
}

function formatNoteTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString([], { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function isHandoverRelated(parts: string[]): boolean {
  const text = parts.join(" ");
  return parts.some((part) => handoverFieldTerms.has(normalizeForMatch(part))) || handoverPatterns.some((pattern) => pattern.test(text));
}

function isDisplayableFieldName(name: string): boolean {
  const trimmed = name.trim();
  if (!trimmed) return false;
  if (/[\u0000-\u001f\u007f]/.test(trimmed)) return false;
  if (/^<\?xml\b/i.test(trimmed)) return false;
  return true;
}

function isSelected(parts: string[], selectedTerms: string[]): boolean {
  if (!selectedTerms.length) return false;
  const normalizedParts = parts.map(normalizeForMatch);
  return selectedTerms.some((term) => normalizedParts.includes(normalizeForMatch(term)));
}

function selectedFieldExplanation(logcode: string | undefined, fieldName: string): string {
  if (!logcode) return "";
  const explanations = selectedFieldExplanations[logcode];
  if (!explanations) return "";
  const normalizedFieldName = normalizeForMatch(fieldName);
  return Object.entries(explanations).find(([key]) => normalizeForMatch(key) === normalizedFieldName)?.[1] || "";
}

function FieldAnnotation({
  fieldName,
  logcode,
  selected,
  handover
}: {
  fieldName: string;
  logcode?: string;
  selected: boolean;
  handover: boolean;
}) {
  const explanation = selectedFieldExplanation(logcode, fieldName);
  if (explanation) {
    return <span className="field-explanation">({explanation})</span>;
  }
  if (selected) return <span className="handover-note">(selected handover field)</span>;
  if (handover) return <span className="handover-note">(handover-related)</span>;
  return null;
}

function parseTreeLine(line: string) {
  const indent = line.match(/^ */)?.[0].length ?? 0;
  const text = line.trim();
  if (!text) return null;
  const label = text.includes(" : ") ? text.split(" : ")[0].trim() : text;
  return {
    level: Math.floor(indent / 2),
    label,
    text
  };
}

function JsonValue({ value, depth = 0, path = [], selectedTerms = [], logcode }: { value: unknown; depth?: number; path?: string[]; selectedTerms?: string[]; logcode?: string }) {
  if (value === null) return null;

  if (Array.isArray(value)) {
    if (!value.length) return null;
    return (
      <>
        {value.map((item, index) => (
          <JsonValue key={index} value={item} depth={depth} path={path} selectedTerms={selectedTerms} logcode={logcode} />
        ))}
      </>
    );
  }

  if (typeof value === "object") {
    return (
      <>
        {Object.entries(value as Record<string, unknown>).map(([key, child]) => {
          const nextPath = [...path, key];
          const selected = isSelected([key], selectedTerms);
          const handover = isHandoverRelated([key]);
          return (
            <div key={nextPath.join(".")}>
              <div className={`json-line ${selected ? "field-hit" : ""} ${handover ? "handover-hit" : ""}`} style={{ "--depth": depth } as CSSProperties}>
                "{key}": <FieldAnnotation fieldName={key} logcode={logcode} selected={selected} handover={handover} />
              </div>
              <JsonValue value={child} depth={depth + 1} path={nextPath} selectedTerms={selectedTerms} logcode={logcode} />
            </div>
          );
        })}
      </>
    );
  }

  const key = path[path.length - 1] || "";
  const selected = isSelected([key, String(value)], selectedTerms);
  const handover = isHandoverRelated([key, String(value)]);
  return (
    <div className={`json-line ${selected ? "field-hit" : ""} ${handover ? "handover-hit" : ""}`} style={{ "--depth": depth } as CSSProperties}>
      "{key}": {JSON.stringify(value)} <FieldAnnotation fieldName={key} logcode={logcode} selected={selected} handover={handover} />
    </div>
  );
}

function B821FieldPaths({ record, selectedTerms }: { record: LogcodeRecord; selectedTerms: string[] }) {
  return (
    <div className="b821-structure">
      <div className="b821-note">0xB821 NR5G RRC OTA Packet is the main message-type variant log. For handover, the important classes are pdu_type 4 DL-DCCH-Message, pdu_type 8 UL-DCCH-Message, and pdu_type 2 BCCH-DL-SCH-Message / SIB1 for cell identity. Open Field paths to inspect the merged path tree.</div>
      <div className="b821-table-wrap">
        <table className="b821-table">
          <thead>
            <tr>
              <th>pdu_type</th>
              <th>message type</th>
              <th>field paths</th>
            </tr>
          </thead>
          <tbody>
            {(record.fieldTreeTable || []).map((row) => {
              const hasSelected = row.tree.split("\n").some((line) => {
                const parsed = parseTreeLine(line);
                return parsed ? isSelected([parsed.label], selectedTerms) : false;
              });
              return (
                <tr key={`${row.pdu_type}-${row.message_type}`}>
                  <td>{row.pdu_type}</td>
                  <td className="b821-message-type">{row.message_type}</td>
                  <td>
                    <details open={hasSelected}>
                      <summary>Field paths</summary>
                      <div className="b821-path-list">
                        {row.tree.split("\n").map((line, index) => {
                          const parsed = parseTreeLine(line);
                          if (!parsed) return null;
                          const selected = isSelected([parsed.label], selectedTerms);
                          const handover = isHandoverRelated([parsed.label, parsed.text]);
                          return (
                            <div key={index} className={`b821-path-line ${selected ? "field-hit" : ""} ${handover ? "handover-hit" : ""}`} style={{ "--depth": parsed.level } as CSSProperties}>
                              {parsed.label} <FieldAnnotation fieldName={parsed.label} logcode={record.logcode} selected={selected} handover={handover} />
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VariantFieldList({ values, selectedTerms }: { values: string[]; selectedTerms: string[] }) {
  if (!values.length) return null;
  return (
    <div className="variant-chip-list">
      {values.map((value) => {
        const selected = isSelected([value], selectedTerms);
        const handover = isHandoverRelated([value]);
        return (
          <span key={value} className={`variant-chip ${selected ? "field-hit" : ""} ${handover ? "handover-hit" : ""}`}>
            {value}
            {selected ? <span className="handover-note"> (selected handover field)</span> : handover ? <span className="handover-note"> (handover-related)</span> : null}
          </span>
        );
      })}
    </div>
  );
}

function LogcodeVariantSections({ record, selectedTerms }: { record: LogcodeRecord; selectedTerms: string[] }) {
  if (record.logcode === "0x1FFB" && record.name.startsWith("EVENT_")) return null;
  const sections = logcodeVariantSections[record.logcode];
  if (!sections?.length) return null;

  return (
    <div className="variant-section-list">
      {sections.map((section) => (
        <details key={section.title} className="variant-section">
          <summary className="variant-section-summary">
            <span>{section.title}</span>
            <span>Variant / subtype help</span>
          </summary>
          <p className="variant-section-description">{section.description}</p>
          <div className="variant-table-wrap">
            <table className="variant-table">
              <thead>
                <tr>
                  <th>{section.selectorLabel}</th>
                  <th>Meaning</th>
                  <th>Handover use</th>
                  <th>Key fields / values</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item) => (
                  <tr key={item.label}>
                    <td className={`variant-label ${isHandoverRelated([item.label]) || isSelected([item.label], selectedTerms) ? "handover-hit" : ""}`}>{item.label}</td>
                    <td>{item.meaning}</td>
                    <td>{item.role}</td>
                    <td>
                      <VariantFieldList values={[...(item.values || []), ...item.fields]} selectedTerms={selectedTerms} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}
    </div>
  );
}

function LogcodeDetail({ record, selectedTerms }: { record: LogcodeRecord; selectedTerms: string[] }) {
  if (record.fieldTreeTable?.length) {
    return <B821FieldPaths record={record} selectedTerms={selectedTerms} />;
  }

  return (
    <>
      <LogcodeVariantSections record={record} selectedTerms={selectedTerms} />
      <div className="field-item">
        <div className="field-item-title">Logcode structure</div>
        <div className="json-tree">
          <div className="json-line" style={{ "--depth": 0 } as CSSProperties}>
            "{record.title}":
          </div>
          <JsonValue value={record.detail} depth={1} selectedTerms={selectedTerms} logcode={record.logcode} />
        </div>
      </div>
    </>
  );
}

function NotesPanel({
  targetId,
  targetLabel,
  entry,
  sourcePath,
  onAddNote,
  ariaLabel = "Notes"
}: {
  targetId: string;
  targetLabel: string;
  entry: MessageNoteEntry;
  sourcePath: string;
  onAddNote: (targetId: string, text: string) => void;
  ariaLabel?: string;
}) {
  const [draftNote, setDraftNote] = useState("");
  const trimmedDraft = draftNote.trim();

  function submitNote() {
    if (!trimmedDraft) return;
    onAddNote(targetId, trimmedDraft);
    setDraftNote("");
  }

  return (
    <section className="message-notes-panel" aria-label={ariaLabel} data-note-target={targetId}>
      <div className="message-notes-header">
        <div>
          <div className="message-notes-title">Notes</div>
          <div className="message-notes-target">{targetLabel}</div>
        </div>
      </div>

      <div className="message-notes-source">
        Team notes are stored in <code>{sourcePath}</code>. Notes added here are saved in this browser.
      </div>

      <div className="message-note-form">
        <label>
          <span>New note</span>
          <textarea
            value={draftNote}
            onChange={(event) => setDraftNote(event.target.value)}
            placeholder="Add evidence, log pattern, caveat, or explanation"
            rows={3}
          />
        </label>
        <button type="button" onClick={submitNote} disabled={!trimmedDraft}>Add note</button>
      </div>

      <div className="message-note-list">
        {entry.notes.length ? entry.notes.map((note) => (
          <article key={note.id} className="message-note-card">
            <div className="message-note-meta">
              <span>{formatNoteTime(note.createdAt)}</span>
            </div>
            <div className="message-note-text">{note.text}</div>
          </article>
        )) : <div className="message-note-empty">No notes yet.</div>}
      </div>
    </section>
  );
}

function MessageNotesPanel({
  record,
  entry,
  onAddNote
}: {
  record: LogcodeRecord;
  entry: MessageNoteEntry;
  onAddNote: (targetId: string, text: string) => void;
}) {
  return (
    <NotesPanel
      targetId={record.id}
      targetLabel={recordLabel(record)}
      entry={entry}
      sourcePath="data/notes/message_notes.json"
      onAddNote={onAddNote}
      ariaLabel="Message notes"
    />
  );
}

function FieldNotesPanel({
  field,
  entry,
  onAddNote
}: {
  field: FieldIndexEntry;
  entry: MessageNoteEntry;
  onAddNote: (targetId: string, text: string) => void;
}) {
  return (
    <NotesPanel
      targetId={field.id}
      targetLabel={field.name}
      entry={entry}
      sourcePath="data/notes/field_notes.json"
      onAddNote={onAddNote}
      ariaLabel="Field notes"
    />
  );
}

function MeasurementEventsTable({ events }: { events: MeasurementEventInfo[] }) {
  return (
    <div className="event-table-wrap">
      <table className="event-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Condition</th>
            <th>Relation to handover</th>
          </tr>
        </thead>
        <tbody>
          {events.map((eventItem) => (
            <tr key={eventItem.id}>
              <td className="event-code">{eventItem.id}</td>
              <td>{eventItem.condition}</td>
              <td>{eventItem.handoverRelation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NRMeasurementEventsView({ onOpenLogcode }: { onOpenLogcode: (record: LogcodeRef, terms?: string[]) => void }) {
  function openB821Config() {
    const record = findLogcodeRecord(nrMeasurementEvents.logEvidence.logcode, nrMeasurementEvents.logEvidence.fields);
    if (record) onOpenLogcode(record, nrMeasurementEvents.logEvidence.fields);
  }

  return (
    <div className="event-config-panel">
      <section className="event-config-hero">
        <h1>{nrMeasurementEvents.title}</h1>
        <p>{nrMeasurementEvents.description}</p>
      </section>

      <section className="event-config-card">
        <h2>Log Evidence</h2>
        <p>{nrMeasurementEvents.logEvidence.summary}</p>
        <div className="event-chip-row">
          <button className="event-chip is-action" type="button" onClick={openB821Config}>{nrMeasurementEvents.logEvidence.logcode}</button>
          {nrMeasurementEvents.logEvidence.fields.map((field) => (
            <span key={field} className="event-chip">{field}</span>
          ))}
        </div>
      </section>

      <section className="event-config-card">
        <h2>A-Events: Normal NR Cell Measurement</h2>
        <MeasurementEventsTable events={nrMeasurementEvents.events} />
      </section>

      <section className="event-config-card">
        <h2>B-Events: Inter-RAT Measurement</h2>
        <MeasurementEventsTable events={nrMeasurementEvents.interRatEvents} />
      </section>
    </div>
  );
}

function PopupText({
  value,
  logcodes = [],
  fields = [],
  onOpenLogcode
}: {
  value?: string;
  logcodes?: string[];
  fields?: string[];
  onOpenLogcode: (logcode: string, terms: string[]) => void;
}) {
  if (!value) return null;

  const tokens = [...logcodes, ...fields].filter(Boolean).sort((a, b) => b.length - a.length);
  const parts: Array<{ text: string; type: "plain" | "logcode" | "field" }> = [];
  let index = 0;

  while (index < value.length) {
    const token = tokens.find((candidate) => value.slice(index, index + candidate.length).toLowerCase() === candidate.toLowerCase());
    if (token) {
      parts.push({ text: value.slice(index, index + token.length), type: logcodes.includes(token) ? "logcode" : "field" });
      index += token.length;
    } else {
      parts.push({ text: value[index], type: "plain" });
      index += 1;
    }
  }

  return (
    <>
      {parts.map((part, idx) => {
        if (part.type === "logcode") {
          return (
            <button key={idx} className="popup-logcode-link" type="button" onClick={() => onOpenLogcode(part.text, fields)}>
              {part.text}
            </button>
          );
        }
        if (part.type === "field") return <span key={idx} className="popup-hot-field">{part.text}</span>;
        return <span key={idx}>{part.text}</span>;
      })}
    </>
  );
}

function MeasurementRelationDiagram({ onOpenLogcode }: { onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  const lifelines = [
    { key: "source", label: "Source gNB", x: 160 },
    { key: "rrc", label: "UE RRC", x: 530 },
    { key: "ml1", label: "UE ML1", x: 900 }
  ];
  const sequenceItems = [
    {
      key: "config",
      y: 90,
      x1: lifelines[0].x,
      x2: lifelines[1].x,
      direction: "right",
      tag: "Step 1",
      tagWidth: 68,
      code: measurementConfigInput.code,
      codeText: measurementConfigInput.code,
      codeWidth: 62,
      label: "Measurement configuration",
      detail: "Air-interface RRC message from network",
      description: "Source gNB sends an RRCReconfiguration that carries measConfig. This tells UE RRC what objects, frequencies, SSB beams, and event rules should be measured.",
      fields: measurementConfigInput.fields
    },
    {
      key: "rules",
      y: 152,
      x1: lifelines[1].x,
      x2: lifelines[2].x,
      direction: "right",
      tag: "RRC->ML1",
      tagWidth: 86,
      code: measurementMl1ConfigInput.code,
      codeText: measurementMl1ConfigInput.code,
      codeWidth: 62,
      label: "ML1 measurement configuration",
      detail: "UE internal config; not network signaling",
      description: "UE internal config that tells ML1 which measurement objects and report rules to run. It is the rule set ML1 will use, not measured quality values.",
      fields: measurementMl1ConfigInput.fields
    },
    {
      key: "search",
      y: 214,
      x1: lifelines[2].x - 138,
      x2: lifelines[2].x + 154,
      direction: "right",
      tag: "ML1",
      tagWidth: 58,
      code: measurementRelationNodes[0].code,
      codeText: measurementRelationNodes[0].code,
      codeWidth: 62,
      label: measurementRelationNodes[0].label,
      detail: measurementRelationNodes[0].text,
      description: "UE ML1 locally searches/acquires configured NR frequencies and SSB beams. The cells are observed over radio; this is not target-cell signaling to UE.",
      fields: measurementRelationNodes[0].fields
    },
    {
      key: "raw",
      y: 276,
      x1: lifelines[2].x - 138,
      x2: lifelines[2].x + 154,
      direction: "right",
      tag: "ML1",
      tagWidth: 58,
      code: measurementRelationNodes[1].code,
      codeText: measurementRelationNodes[1].code,
      codeWidth: 62,
      label: "Raw Measurement",
      detail: measurementRelationNodes[1].text,
      description: "UE ML1 locally records raw cell measurements such as PCI, SSB index, RSRP, RSRQ, and SINR from observed radio signals.",
      fields: measurementRelationNodes[1].fields
    },
    {
      key: "filtered",
      y: 338,
      x1: lifelines[2].x - 138,
      x2: lifelines[2].x + 154,
      direction: "right",
      tag: "ML1",
      tagWidth: 58,
      code: measurementRelationNodes[2].code,
      codeText: measurementRelationNodes[2].code,
      codeWidth: 62,
      label: "Filtered Database",
      detail: measurementRelationNodes[2].text,
      description: "UE ML1 updates its measurement database with filtered or stabilized cell quality values. This is the evidence used before event evaluation.",
      fields: measurementRelationNodes[2].fields
    },
    {
      key: "eval",
      y: 400,
      x1: lifelines[2].x - 138,
      x2: lifelines[2].x + 154,
      direction: "right",
      tag: "ML1",
      tagWidth: 58,
      code: measurementRelationNodes[3].code,
      codeText: measurementRelationNodes[3].code,
      codeWidth: 62,
      label: "Connected Evaluation",
      detail: "State, time-to-trigger remaining, reports sent",
      description: "UE ML1 evaluates the configured connected-mode event condition and time-to-trigger. Key evidence is State, Meas Id, Cell Id, TTT Remaining (time-to-trigger), and Num Reports Sent.",
      fields: measurementRelationNodes[3].fields
    },
    {
      key: "eval-to-rrc",
      y: 462,
      x1: lifelines[1].x,
      x2: lifelines[2].x,
      direction: "left",
      tag: "ML1->RRC",
      tagWidth: 86,
      code: measurementRelationNodes[3].code,
      codeText: measurementRelationNodes[3].code,
      codeWidth: 62,
      label: "Report trigger",
      detail: "Event entered or time-to-trigger expired",
      description: "When the event condition is entered and time-to-trigger expires, ML1 provides evidence that an RRC MeasurementReport should be triggered.",
      fields: measurementRelationNodes[3].fields
    },
    {
      key: "report",
      y: 524,
      x1: lifelines[0].x,
      x2: lifelines[1].x,
      direction: "left",
      tag: "RRC",
      tagWidth: 58,
      code: measurementRelationNodes[4].code,
      codeText: measurementRelationNodes[4].code,
      codeWidth: 62,
      label: "MeasurementReport",
      detail: measurementRelationNodes[4].text,
      description: "UE RRC sends the final MeasurementReport to the source gNB. The report usually carries measId and cell quality results; resolve measId through the earlier measConfig to know the event type.",
      fields: measurementRelationNodes[4].fields
    }
  ];
  const [activeSequenceKey, setActiveSequenceKey] = useState<string | null>(null);
  const activeSequenceItem = activeSequenceKey
    ? sequenceItems.find((item) => item.key === activeSequenceKey) || null
    : null;

  function isMl1LocalItem(itemKey: string) {
    return itemKey === "search" || itemKey === "raw" || itemKey === "filtered" || itemKey === "eval";
  }

  function messagePath(item: (typeof sequenceItems)[number]) {
    const height = 48;
    const head = 28;
    if (isMl1LocalItem(item.key)) {
      return `M ${item.x1} ${item.y} L ${item.x2} ${item.y} L ${item.x2} ${item.y + height} L ${item.x1} ${item.y + height} Z`;
    }
    if (item.direction === "left") {
      return `M ${item.x2} ${item.y} L ${item.x1 + head} ${item.y} L ${item.x1} ${item.y + height / 2} L ${item.x1 + head} ${item.y + height} L ${item.x2} ${item.y + height} Z`;
    }
    return `M ${item.x1} ${item.y} L ${item.x2 - head} ${item.y} L ${item.x2} ${item.y + height / 2} L ${item.x2 - head} ${item.y + height} L ${item.x1} ${item.y + height} Z`;
  }

  function tagDividerX(item: (typeof sequenceItems)[number]) {
    const headOffset = item.direction === "left" ? 28 : 0;
    return item.x1 + headOffset + item.tagWidth;
  }

  function tagCenterX(item: (typeof sequenceItems)[number]) {
    const headOffset = item.direction === "left" ? 28 : 0;
    return item.x1 + headOffset + item.tagWidth / 2;
  }

  function openSequenceItem(item: (typeof sequenceItems)[number]) {
    setActiveSequenceKey(item.key);
  }

  function closeSequencePopup() {
    setActiveSequenceKey(null);
  }

  function MeasurementSubstepVisual({ itemKey }: { itemKey: string }) {
    const visualMap: Record<string, {
      title: string;
      aria: string;
      top: [string, string];
      left: [string, string];
      center: [string, string, string];
      right: [string, string];
      bottom: [string, string];
    }> = {
      rules: {
        title: "What 0xB96E configures",
        aria: "ML1 measurement configuration rules",
        top: ["NR frequency", "ARFCN / SSB freq"],
        left: ["Cells", "PCI / SSB"],
        center: ["UE ML1 config", "0xB96E", "measurement rules"],
        right: ["Report rule", "eventId / TTT /\nreport interval"],
        bottom: ["measId mapping", "measId -> measObjId +\nreportCfgId"]
      },
      search: {
        title: "What ML1 searches and acquires",
        aria: "ML1 search acquisition targets",
        top: ["NR frequency", "raster / ARFCN"],
        left: ["Cells", "candidate PCI"],
        center: ["UE ML1", "0xB96D", "search acquisition"],
        right: ["SSB beams", "SSB index"],
        bottom: ["Acquired info", "MIB / timing"]
      },
      raw: {
        title: "What ML1 measures as raw radio quality",
        aria: "ML1 raw measurement targets",
        top: ["Observed cell", "PCI / SSB"],
        left: ["Power", "RSRP"],
        center: ["UE ML1", "0xB96A", "raw measurement"],
        right: ["Quality", "RSRQ / SINR"],
        bottom: ["Raw sample", "per beam / cell"]
      },
      filtered: {
        title: "What ML1 stores after filtering",
        aria: "ML1 filtered measurement database",
        top: ["Raw samples", "from 0xB96A"],
        left: ["Serving cell", "CellQuality"],
        center: ["UE ML1", "0xB97F", "measurement database"],
        right: ["Neighbor cells", "CellQuality"],
        bottom: ["Stable values", "CellQualityRsrp/Rsrq"]
      },
      eval: {
        title: "What ML1 evaluates",
        aria: "ML1 connected mode event evaluation",
        top: ["Event rule", "reportConfig"],
        left: ["Measured cell", "Meas Id / Cell Id"],
        center: ["UE ML1", "0xB96F", "connected evaluation"],
        right: ["Event state", "ENTERING / ENTERED"],
        bottom: ["Trigger evidence", "time-to-trigger / report count"]
      }
    };

    if (itemKey === "eval-to-rrc") {
      return (
        <div className="measurement-substep-visual measurement-trigger-visual">
          <div className="measurement-substep-visual-title">Report trigger logic</div>
          <div className="measurement-trigger-grid">
            <div className="measurement-trigger-card">
              <div className="measurement-trigger-heading">New report trigger</div>
              <div className="measurement-trigger-lines">
                <div><span>State</span><b>ENTERING</b></div>
                <div><span>TTT Remaining</span><b>0</b></div>
                <div><span>Num Reports Sent</span><b>1</b></div>
              </div>
              <p>The event condition just entered, time-to-trigger expired, and ML1 reports that one MeasurementReport was sent or triggered.</p>
            </div>
            <div className="measurement-trigger-card">
              <div className="measurement-trigger-heading">Already-triggered event state</div>
              <div className="measurement-trigger-lines">
                <div><span>State</span><b>ENTERED</b></div>
                <div><span>TTT Remaining</span><b>65535</b></div>
                <div><span>Num Reports Sent</span><b>{">= 1"}</b></div>
              </div>
              <p>The event is already entered. The time-to-trigger timer is no longer running, and at least one MeasurementReport was sent or triggered.</p>
            </div>
          </div>
          <div className="measurement-trigger-confirm">
            <span>Final confirmation</span>
            <b>0xB821 MeasurementReport</b>
            <em>same measId</em>
          </div>
        </div>
      );
    }
    const visual = visualMap[itemKey];
    if (!visual) return null;

    function svgTextLines(text: string, x: number, y: number, className: string, anchor: "middle" | "start" = "middle", lineHeight = 13) {
      return text.split("\n").map((line, index) => (
        <text key={`${text}-${index}`} x={x} y={y + index * lineHeight} className={className} textAnchor={anchor}>{line}</text>
      ));
    }

    return (
      <div className="measurement-substep-visual">
        <div className="measurement-substep-visual-title">{visual.title}</div>
        <svg className="measurement-substep-svg" viewBox="0 0 430 230" role="img" aria-label={visual.aria}>
          <line x1="215" y1="82" x2="215" y2="56" className="measurement-substep-svg-line" />
          <line x1="215" y1="148" x2="215" y2="170" className="measurement-substep-svg-line" />
          <line x1="150" y1="115" x2="92" y2="115" className="measurement-substep-svg-line" />
          <line x1="280" y1="115" x2="338" y2="115" className="measurement-substep-svg-line" />

          <rect x="142" y="20" width="146" height="36" rx="7" className="measurement-substep-svg-box" />
          <text x="215" y="37" className="measurement-substep-svg-label" textAnchor="middle">{visual.top[0]}</text>
          {svgTextLines(visual.top[1], 215, 50, "measurement-substep-svg-muted")}

          <rect x="18" y="86" width="112" height="58" rx="7" className="measurement-substep-svg-box" />
          <text x="74" y="109" className="measurement-substep-svg-label" textAnchor="middle">{visual.left[0]}</text>
          {svgTextLines(visual.left[1], 74, 128, "measurement-substep-svg-muted")}

          <rect x="150" y="82" width="130" height="66" rx="7" className="measurement-substep-svg-center" />
          <text x="215" y="103" className="measurement-substep-svg-label" textAnchor="middle">{visual.center[0]}</text>
          <text x="215" y="121" className="measurement-substep-svg-red" textAnchor="middle">{visual.center[1]}</text>
          {svgTextLines(visual.center[2], 215, 136, "measurement-substep-svg-muted")}

          <rect x="300" y="86" width="112" height="58" rx="7" className="measurement-substep-svg-box" />
          <text x="356" y="109" className="measurement-substep-svg-label" textAnchor="middle">{visual.right[0]}</text>
          {svgTextLines(visual.right[1], 356, 125, "measurement-substep-svg-muted")}

          <rect x="120" y="170" width="190" height="48" rx="7" className="measurement-substep-svg-box" />
          <text x="215" y="188" className="measurement-substep-svg-label" textAnchor="middle">{visual.bottom[0]}</text>
          {svgTextLines(visual.bottom[1], 215, 202, "measurement-substep-svg-muted", "middle", 12)}
        </svg>
      </div>
    );
  }

  return (
    <div className="measurement-relation">
      <div className="measurement-relation-title">Measurement sequence</div>
      <svg className="measurement-sequence" viewBox="0 0 1100 620" role="img" aria-label="Measurement log sequence diagram">
        <defs>
          <marker id="measurement-sequence-arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <rect x="28" y="26" width="1044" height="568" rx="8" className="measurement-sequence-frame" />

        {lifelines.map((line) => (
          <g key={line.key}>
            <text x={line.x} y="56" className="measurement-sequence-header" textAnchor="middle">{line.label}</text>
            <line x1={line.x} y1="76" x2={line.x} y2="574" className="measurement-sequence-lifeline" />
          </g>
        ))}

        {sequenceItems.map((item) => {
          const dividerX = tagDividerX(item);
          const textX = dividerX + 16;
          return (
            <g
              key={item.key}
              className={`measurement-sequence-message ${isMl1LocalItem(item.key) ? "is-observation" : ""} ${item.key === activeSequenceItem?.key ? "is-selected" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => openSequenceItem(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openSequenceItem(item);
                }
              }}
            >
              <path d={messagePath(item)} className="measurement-sequence-body" />
              <line x1={dividerX} y1={item.y} x2={dividerX} y2={item.y + 48} className="measurement-sequence-divider" />
              <text x={tagCenterX(item)} y={item.y + 30} className="measurement-sequence-tag" textAnchor="middle">{item.tag}</text>
              <text x={textX} y={item.y + 21} className="measurement-sequence-code">{item.codeText}</text>
              <text x={textX} y={item.y + 40} className="measurement-sequence-label">{item.label}</text>
            </g>
          );
        })}
      </svg>
      {activeSequenceItem ? (
        <div className="measurement-substep-popup" role="dialog" aria-label={`${activeSequenceItem.codeText} ${activeSequenceItem.label}`}>
          <button className="measurement-substep-close" type="button" onClick={closeSequencePopup} aria-label="Close substep detail">x</button>
          <div className="measurement-substep-title">
            {activeSequenceItem.codeText} {activeSequenceItem.label}
          </div>
          <div className="measurement-substep-text">{activeSequenceItem.description}</div>
          <MeasurementSubstepVisual itemKey={activeSequenceItem.key} />
          {activeSequenceItem.key !== "eval-to-rrc" ? (
            <div className="measurement-substep-fields">
              {activeSequenceItem.fields.slice(0, 8).map((field) => (
                <span className="measurement-substep-field" key={field}>{field}</span>
              ))}
            </div>
          ) : null}
          <button className="measurement-substep-open" type="button" onClick={() => onOpenLogcode(activeSequenceItem.code, activeSequenceItem.fields)}>
            Open logcode structure
          </button>
        </div>
      ) : null}
      <div className="measurement-relation-note">
        Logical order, not a strict one-time sequence. These logs can repeat and interleave across frequencies, PCIs, and SSB beams before the RRC MeasurementReport.
      </div>
    </div>
  );
}

function StepEvidenceList({ items, title = "Evidence", onOpenLogcode }: { items: StepEvidenceItem[]; title?: string; onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  const isInterfaceList = title === "Interfaces";
  return (
    <div className="step-evidence">
      <div className="step-evidence-title">{title}</div>
      <div className="step-evidence-list">
        {items.map((item, index) => {
          const fields = item.fields || [];
          const detailHighlights = isInterfaceList ? networkHandoverTypeTerms : fields;
          return (
            <div className="step-evidence-card" key={`${item.title}-${index}`}>
              <div className="step-evidence-heading">
                <span>{item.title}</span>
                {item.logcodes?.length ? (
                  <span className="step-evidence-codes">
                    {item.logcodes.map((logcode) => (
                      <button key={logcode} className="popup-logcode-link" type="button" onClick={() => onOpenLogcode(logcode, fields)}>
                        {logcode}
                      </button>
                    ))}
                  </span>
                ) : null}
              </div>
              {item.detail ? (
                <div className="step-evidence-detail">
                  <PopupText value={item.detail} logcodes={item.logcodes} fields={detailHighlights} onOpenLogcode={onOpenLogcode} />
                </div>
              ) : null}
              {fields.length ? (
                <div className="step-evidence-fields">
                  {fields.map((field) => (
                    <span key={field} className="popup-hot-field">{field}</span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MeasurementConfigDiagram() {
  return (
    <div className="measurement-config-diagram">
      <div className="measurement-config-title">measConfig structure</div>
      <svg className="measurement-config-svg" viewBox="0 0 820 430" role="img" aria-label="RRC measConfig structure and later measurement output">
        <line x1="410" y1="72" x2="410" y2="110" className="measurement-config-svg-line" />
        <line x1="410" y1="162" x2="410" y2="186" className="measurement-config-svg-line" />
        <line x1="145" y1="186" x2="675" y2="186" className="measurement-config-svg-line" />
        <line x1="145" y1="186" x2="145" y2="205" className="measurement-config-svg-line" />
        <line x1="410" y1="186" x2="410" y2="205" className="measurement-config-svg-line" />
        <line x1="675" y1="186" x2="675" y2="205" className="measurement-config-svg-line" />

        <rect x="250" y="18" width="320" height="54" rx="8" className="measurement-config-svg-center" />
        <text x="410" y="42" className="measurement-config-svg-red-large" textAnchor="middle">0xB821 RRCReconfiguration</text>
        <text x="410" y="61" className="measurement-config-svg-muted" textAnchor="middle">DL-DCCH message carries measurement rules</text>

        <rect x="310" y="110" width="200" height="52" rx="8" className="measurement-config-svg-center" />
        <text x="410" y="143" className="measurement-config-svg-red-large" textAnchor="middle">measConfig</text>

        <rect x="40" y="205" width="210" height="96" rx="8" className="measurement-config-svg-box" />
        <text x="145" y="232" className="measurement-config-svg-red-large" textAnchor="middle">measObject</text>
        <text x="145" y="255" className="measurement-config-svg-title-small" textAnchor="middle">what to measure</text>
        <text x="145" y="278" className="measurement-config-svg-muted" textAnchor="middle">NR frequency / SSB</text>
        <text x="145" y="294" className="measurement-config-svg-muted" textAnchor="middle">serving + neighbor cells</text>

        <rect x="305" y="205" width="210" height="96" rx="8" className="measurement-config-svg-box" />
        <text x="410" y="232" className="measurement-config-svg-red-large" textAnchor="middle">reportConfig</text>
        <text x="410" y="255" className="measurement-config-svg-title-small" textAnchor="middle">when to report</text>
        <text x="410" y="278" className="measurement-config-svg-muted" textAnchor="middle">eventA3 / eventA5</text>
        <text x="410" y="294" className="measurement-config-svg-muted" textAnchor="middle">threshold / hysteresis / TTT</text>

        <rect x="570" y="205" width="210" height="96" rx="8" className="measurement-config-svg-box" />
        <text x="675" y="232" className="measurement-config-svg-red-large" textAnchor="middle">measId</text>
        <text x="675" y="255" className="measurement-config-svg-title-small" textAnchor="middle">link between them</text>
        <text x="675" y="278" className="measurement-config-svg-muted" textAnchor="middle">measId -&gt; measObjectId</text>
        <text x="675" y="294" className="measurement-config-svg-muted" textAnchor="middle">+ reportConfigId</text>

        <rect x="55" y="340" width="430" height="66" rx="8" className="measurement-config-svg-box" />
        <text x="75" y="365" className="measurement-config-svg-title-small" textAnchor="start">UE ML1 uses this config to measure</text>
        <text x="75" y="390" className="measurement-config-svg-red" textAnchor="start">PCI / SSB index / RSRP / RSRQ / SINR</text>

        <rect x="520" y="340" width="245" height="66" rx="8" className="measurement-config-svg-box" />
        <text x="540" y="365" className="measurement-config-svg-title-small" textAnchor="start">UE RRC reports with</text>
        <text x="540" y="390" className="measurement-config-svg-red" textAnchor="start">MeasurementReport.measId</text>
      </svg>
    </div>
  );
}

function MeasurementReportDiagram() {
  return (
    <div className="rrc-step-diagram">
      <div className="rrc-step-title">What this step does</div>
      <svg className="rrc-step-svg" viewBox="0 0 820 270" role="img" aria-label="MeasurementReport reported fields">
        <rect x="240" y="22" width="340" height="76" rx="8" className="rrc-step-message-box" />
        <text x="410" y="53" className="rrc-step-svg-red" textAnchor="middle">0xB821</text>
        <text x="410" y="79" className="rrc-step-svg-title" textAnchor="middle">MeasurementReport payload</text>

        <rect x="20" y="132" width="240" height="104" rx="8" className="rrc-step-box" />
        <text x="140" y="163" className="rrc-step-svg-red" textAnchor="middle">measId</text>
        <text x="140" y="190" className="rrc-step-svg-body" textAnchor="middle">
          links report to <tspan className="rrc-step-svg-red-inline">measConfig</tspan>
        </text>
        <text x="140" y="216" className="rrc-step-svg-chain" textAnchor="middle">
          <tspan className="rrc-step-svg-red-inline">measId</tspan><tspan> -&gt; </tspan><tspan className="rrc-step-svg-red-inline">reportConfigId</tspan><tspan> -&gt; </tspan><tspan className="rrc-step-svg-red-inline">eventId</tspan>
        </text>

        <rect x="290" y="132" width="240" height="104" rx="8" className="rrc-step-box" />
        <text x="410" y="163" className="rrc-step-svg-title" textAnchor="middle">Serving cell</text>
        <text x="410" y="190" className="rrc-step-svg-body" textAnchor="middle">
          serving <tspan className="rrc-step-svg-red-inline">PCI</tspan>
        </text>
        <text x="410" y="213" className="rrc-step-svg-red" textAnchor="middle">RSRP / RSRQ / SINR</text>

        <rect x="560" y="132" width="240" height="104" rx="8" className="rrc-step-box" />
        <text x="680" y="163" className="rrc-step-svg-title" textAnchor="middle">Neighbor cells</text>
        <text x="680" y="190" className="rrc-step-svg-red" textAnchor="middle">physCellId</text>
        <text x="680" y="213" className="rrc-step-svg-red" textAnchor="middle">RSRP / RSRQ / SINR</text>
      </svg>
    </div>
  );
}

function HandoverCommandDiagram() {
  return (
    <div className="rrc-step-diagram">
      <div className="rrc-step-title">What this step does</div>
      <svg className="rrc-step-svg" viewBox="0 0 820 250" role="img" aria-label="Handover command with synchronization">
        <defs>
          <marker id="rrc-command-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="rrc-step-arrowhead" />
          </marker>
        </defs>

        <rect x="32" y="52" width="190" height="82" rx="8" className="rrc-step-box" />
        <text x="127" y="86" className="rrc-step-svg-title" textAnchor="middle">Source gNB</text>
        <text x="127" y="112" className="rrc-step-svg-muted" textAnchor="middle">selects target config</text>

        <line x1="222" y1="93" x2="288" y2="93" className="rrc-step-arrow" markerEnd="url(#rrc-command-arrow)" />

        <rect x="288" y="40" width="272" height="106" rx="8" className="rrc-step-message-box" />
        <text x="424" y="75" className="rrc-step-svg-red" textAnchor="middle">0xB821</text>
        <text x="424" y="102" className="rrc-step-svg-title" textAnchor="middle">RRCReconfiguration w/ Sync</text>
        <text x="424" y="127" className="rrc-step-svg-muted" textAnchor="middle">handover command</text>

        <line x1="560" y1="93" x2="626" y2="93" className="rrc-step-arrow" markerEnd="url(#rrc-command-arrow)" />

        <rect x="626" y="52" width="162" height="82" rx="8" className="rrc-step-box" />
        <text x="707" y="86" className="rrc-step-svg-title" textAnchor="middle">UE RRC</text>
        <text x="707" y="112" className="rrc-step-svg-muted" textAnchor="middle">receives target config</text>

        <rect x="74" y="178" width="172" height="42" rx="7" className="rrc-step-small-box" />
        <text x="160" y="205" className="rrc-step-svg-label" textAnchor="middle">target PCI / freq</text>

        <rect x="324" y="178" width="172" height="42" rx="7" className="rrc-step-small-box" />
        <text x="410" y="205" className="rrc-step-svg-label" textAnchor="middle">new UE identity</text>

        <rect x="574" y="178" width="172" height="42" rx="7" className="rrc-step-small-box" />
        <text x="660" y="205" className="rrc-step-svg-label" textAnchor="middle">RACH resources</text>
      </svg>
    </div>
  );
}

function RrcCompletionDiagram() {
  return (
    <div className="rrc-step-diagram">
      <div className="rrc-step-title">What this step does</div>
      <svg className="rrc-step-svg" viewBox="0 0 820 250" role="img" aria-label="RRCReconfigurationComplete step">
        <defs>
          <marker id="rrc-complete-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="rrc-step-arrowhead" />
          </marker>
        </defs>

        <rect x="32" y="52" width="190" height="82" rx="8" className="rrc-step-box" />
        <text x="127" y="86" className="rrc-step-svg-title" textAnchor="middle">UE RRC</text>
        <text x="127" y="112" className="rrc-step-svg-muted" textAnchor="middle">target access complete</text>

        <line x1="222" y1="93" x2="288" y2="93" className="rrc-step-arrow" markerEnd="url(#rrc-complete-arrow)" />

        <rect x="288" y="40" width="272" height="106" rx="8" className="rrc-step-message-box" />
        <text x="424" y="75" className="rrc-step-svg-red" textAnchor="middle">0xB821</text>
        <text x="424" y="102" className="rrc-step-svg-title" textAnchor="middle">RRCReconfigurationComplete</text>
        <text x="424" y="127" className="rrc-step-svg-muted" textAnchor="middle">handover completion confirm</text>

        <line x1="560" y1="93" x2="626" y2="93" className="rrc-step-arrow" markerEnd="url(#rrc-complete-arrow)" />

        <rect x="626" y="52" width="162" height="82" rx="8" className="rrc-step-box" />
        <text x="707" y="86" className="rrc-step-svg-title" textAnchor="middle">Target gNB</text>
        <text x="707" y="112" className="rrc-step-svg-muted" textAnchor="middle">accepts completion</text>

        <rect x="158" y="178" width="190" height="42" rx="7" className="rrc-step-small-box" />
        <text x="253" y="205" className="rrc-step-svg-label" textAnchor="middle">transaction id</text>

        <rect x="472" y="178" width="190" height="42" rx="7" className="rrc-step-small-box" />
        <text x="567" y="205" className="rrc-step-svg-label" textAnchor="middle">completion timing</text>
      </svg>
    </div>
  );
}

function PostHoOperationDiagram() {
  return (
    <div className="rrc-step-diagram">
      <div className="rrc-step-title">What this step does</div>
      <svg className="rrc-step-svg" viewBox="0 0 820 250" role="img" aria-label="Post handover operation step">
        <defs>
          <marker id="post-ho-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="rrc-step-arrowhead" />
          </marker>
        </defs>

        <rect x="32" y="52" width="190" height="82" rx="8" className="rrc-step-box" />
        <text x="127" y="86" className="rrc-step-svg-title" textAnchor="middle">Target cell</text>
        <text x="127" y="112" className="rrc-step-svg-muted" textAnchor="middle">new serving cell</text>

        <line x1="222" y1="93" x2="302" y2="93" className="rrc-step-arrow" markerEnd="url(#post-ho-arrow)" />

        <rect x="302" y="40" width="244" height="106" rx="8" className="rrc-step-message-box" />
        <text x="424" y="75" className="rrc-step-svg-title" textAnchor="middle">UE operates</text>
        <text x="424" y="102" className="rrc-step-svg-red" textAnchor="middle">post-HO state</text>
        <text x="424" y="127" className="rrc-step-svg-muted" textAnchor="middle">serving cell + data resume</text>

        <line x1="546" y1="93" x2="626" y2="93" className="rrc-step-arrow" markerEnd="url(#post-ho-arrow)" />

        <rect x="626" y="52" width="162" height="82" rx="8" className="rrc-step-box" />
        <text x="707" y="86" className="rrc-step-svg-title" textAnchor="middle">User plane</text>
        <text x="707" y="112" className="rrc-step-svg-muted" textAnchor="middle">data resumes</text>

        <rect x="86" y="178" width="150" height="42" rx="7" className="rrc-step-small-box" />
        <text x="161" y="205" className="rrc-step-svg-label" textAnchor="middle">serving cell info</text>

        <rect x="335" y="178" width="150" height="42" rx="7" className="rrc-step-small-box" />
        <text x="410" y="205" className="rrc-step-svg-label" textAnchor="middle">MIB / SIB</text>

        <rect x="584" y="178" width="150" height="42" rx="7" className="rrc-step-small-box" />
        <text x="659" y="205" className="rrc-step-svg-label" textAnchor="middle">DL / UL data</text>
      </svg>
    </div>
  );
}

function NetworkTargetPreparationDiagram() {
  return (
    <div className="network-prep-step">
      <section className="network-prep-section">
        <h3>What this step does</h3>
        <p>
          The source side selects the target cell and prepares the target side before sending the handover command to UE.
        </p>
      </section>

      <section className="network-prep-section">
        <h3>Preparation contents</h3>
        <div className="network-prep-grid">
          <div className="network-prep-card">
            <h4>Source side</h4>
            <ul>
              <li>selects the target cell based on MeasurementReport and RRM information</li>
              <li>sends UE context, current configuration, QoS / DRB information, and measurement information to the target side</li>
            </ul>
          </div>
          <div className="network-prep-card">
            <h4>Target side</h4>
            <ul>
              <li>performs admission control and checks radio resource availability</li>
              <li>prepares target-cell configuration, new C-RNTI, RACH resources, and the target RRC configuration container for UE</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

type StepFlowNode = {
  title: string;
  detail: string;
};

type StepLogCard = {
  code: string;
  title: string;
  role: string;
  detail: string;
  fields: string[];
  points: Array<{ label: string; text: string }>;
};

function StepProcessFlow({ nodes, ariaLabel }: { nodes: StepFlowNode[]; ariaLabel: string }) {
  return (
    <div className="step-process-flow" aria-label={ariaLabel}>
      {nodes.map((node, index) => (
        <div className="step-process-segment" key={`${node.title}-${index}`}>
          <div className="step-process-node">
            <b>{node.title}</b>
            <span>{node.detail}</span>
          </div>
          {index < nodes.length - 1 ? <div className="step-process-arrow" aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  );
}

function StepLogCards({ cards, onOpenLogcode }: { cards: StepLogCard[]; onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  return (
    <div className="step-log-card-list">
      {cards.map((card) => (
        <div className="step-log-card" key={card.code}>
          <div className="step-log-card-summary">
            <button className="step-log-code" type="button" onClick={() => onOpenLogcode(card.code, card.fields)}>
              {card.code}
            </button>
            <span>{card.role}</span>
            <b>{card.title}</b>
            <p>{card.detail}</p>
          </div>
          <div className="step-log-card-points">
            {card.points.map((point) => (
              <div className="step-log-point" key={point.label}>
                <b>{point.label}</b>
                <span>{point.text}</span>
              </div>
            ))}
          </div>
          <div className="step-log-card-fields">
            {card.fields.map((field) => (
              <span key={field} className="popup-hot-field">{field}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StepStructuredDiagram({
  flowLabel,
  flowNodes,
  cards,
  onOpenLogcode
}: {
  flowLabel: string;
  flowNodes: StepFlowNode[];
  cards: StepLogCard[];
  onOpenLogcode: (logcode: string, terms: string[]) => void;
}) {
  return (
    <div className="step-structured-diagram">
      <div className="step-structured-title">What this step does</div>
      <StepProcessFlow nodes={flowNodes} ariaLabel={flowLabel} />
      <div className="step-structured-subtitle">How to find it in logs</div>
      <StepLogCards cards={cards} onOpenLogcode={onOpenLogcode} />
    </div>
  );
}

function ApplyTargetLogRow({
  code,
  fields,
  onOpenLogcode
}: {
  code: string;
  fields: string[];
  onOpenLogcode: (logcode: string, terms: string[]) => void;
}) {
  return (
    <div className="apply-target-log-row">
      <button className="step-log-code" type="button" onClick={() => onOpenLogcode(code, fields)}>
        {code}
      </button>
      <div className="apply-target-log-fields">
        {fields.map((field) => (
          <span key={field} className="popup-hot-field">{field}</span>
        ))}
      </div>
    </div>
  );
}

function ApplyTargetConfigDiagram({ onOpenLogcode }: { onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  return (
    <div className="step-structured-diagram">
      <div className="step-structured-title">What this step does</div>
      <StepProcessFlow
        ariaLabel="Apply target configuration flow"
        nodes={[
          { title: "handover command", detail: "target-cell config from Step 5" },
          { title: "UE ML1", detail: "applies target physical config" },
          { title: "target access ready", detail: "synchronization + RACH preparation" }
        ]}
      />
      <div className="step-structured-subtitle">How to find it in logs</div>
      <div className="apply-target-log-summary">
        <div className="apply-target-log-section">
          <div className="apply-target-log-title">Primary handover evidence:</div>
          <ApplyTargetLogRow
            code="0xB952"
            fields={["Target Phy Cell Id", "Target DL Cell Frequency", "Crnti CFG"]}
            onOpenLogcode={onOpenLogcode}
          />
        </div>
        <div className="apply-target-log-section">
          <div className="apply-target-log-title">Target config support:</div>
          <ApplyTargetLogRow
            code="0xB950"
            fields={["DL Frequency Info", "SSB", "BWP", "CORESET", "Search Space", "TDD UL DL CFG"]}
            onOpenLogcode={onOpenLogcode}
          />
          <ApplyTargetLogRow
            code="0xB951"
            fields={["Dedicated BWP", "PDCCH/Search Space", "PDSCH Config", "Serving Cell Config"]}
            onOpenLogcode={onOpenLogcode}
          />
        </div>
      </div>
    </div>
  );
}

function HandoverExecutionDiagram({ onOpenLogcode }: { onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  return (
    <div className="step-structured-diagram handover-execution-simple">
      <div className="step-structured-title">What this step does</div>
      <p className="step-simple-description">
        UE switches from source-cell context to target-cell context. This is the execution window between target config apply and target RACH.
      </p>
      <div className="step-structured-subtitle">How to find it in logs</div>
      <div className="step-simple-log-list">
        <section className="step-simple-log-card">
          <button
            className="step-log-code"
            type="button"
            onClick={() => onOpenLogcode("0xB9A7", ["Event", "HANDOVER_START", "HANDOVER_END", "PCI", "DL EARFCN", "Band"])}
          >
            0xB9A7
          </button>
          <h3>Handover timing</h3>
          <p>Use only when Event is:</p>
          <ul>
            <li>HANDOVER_START</li>
            <li>HANDOVER_END</li>
          </ul>
          <div className="step-simple-key-fields">
            <b>Key fields:</b>
            {["Event", "PCI", "DL EARFCN", "Band"].map((field) => (
              <span key={field} className="popup-hot-field">{field}</span>
            ))}
          </div>
        </section>
        <section className="step-simple-log-card">
          <button
            className="step-log-code"
            type="button"
            onClick={() => onOpenLogcode("0xB952", ["Target Phy Cell Id", "Target DL Cell Frequency", "Crnti CFG"])}
          >
            0xB952
          </button>
          <h3>Target context</h3>
          <p>Confirms the target cell being applied.</p>
          <div className="step-simple-key-fields">
            <b>Key fields:</b>
            {["Target Phy Cell Id", "Target DL Cell Frequency", "Crnti CFG"].map((field) => (
              <span key={field} className="popup-hot-field">{field}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function RandomAccessDiagram({ onOpenLogcode }: { onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  const cards: StepLogCard[] = [
    {
      code: "0xB889",
      title: "RACH trigger",
      role: "access start",
      detail: "MAC starts target-cell random access because the trigger reason is handover.",
      fields: ["Rach Reason", "HANDOVER", "CRNTI", "RACH Contention", "Carrier Id", "RA Id"],
      points: [
        { label: "why RA starts", text: "Rach Reason = HANDOVER" },
        { label: "UE identity", text: "CRNTI" },
        { label: "access mode", text: "RACH Contention" },
        { label: "target access id", text: "Carrier Id + RA Id" }
      ]
    },
    {
      code: "0xB88A",
      title: "RACH attempt",
      role: "attempt details",
      detail: "Records the random-access exchange on the target cell when attempt details are present.",
      fields: ["RACH Msg1", "RACH Msg2", "RACH Msg3", "RACH Msg4", "Contention Type", "RACH Result"],
      points: [
        { label: "Msg1", text: "preamble" },
        { label: "Msg2", text: "random access response" },
        { label: "Msg3 / Msg4", text: "contention resolution" },
        { label: "attempt result", text: "Contention Type + RACH Result" }
      ]
    }
  ];

  return (
    <StepStructuredDiagram
      flowLabel="Random access flow"
      flowNodes={[
        { title: "target cell ready", detail: "handover execution reaches MAC access" },
        { title: "RACH trigger", detail: "MAC starts random access for handover" },
        { title: "RACH attempt", detail: "Msg1-Msg4 target-cell access exchange" }
      ]}
      cards={cards}
      onOpenLogcode={onOpenLogcode}
    />
  );
}

function RandomAccessSuccessDiagram({ onOpenLogcode }: { onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  const cards: StepLogCard[] = [
    {
      code: "0xB88A",
      title: "MAC RA result",
      role: "direct RA result",
      detail: "Best direct MAC evidence that random access completed successfully.",
      fields: ["RACH Result", "SUCCESS", "Contention Type", "CONT_FREE"],
      points: [
        { label: "final result", text: "RACH Result = SUCCESS" },
        { label: "contention mode", text: "CONT_FREE when present" },
        { label: "attempt context", text: "same target-cell attempt" },
        { label: "handover access", text: "RA finished on target cell" }
      ]
    },
    {
      code: "0xB9BF",
      title: "HO acquisition confirm",
      role: "target acquisition",
      detail: "ML1 confirms target-cell acquisition after the handover access step.",
      fields: ["Result", "ARFCN", "Cell Id"],
      points: [
        { label: "acq result", text: "Result" },
        { label: "frequency", text: "ARFCN" },
        { label: "target cell", text: "Cell Id" },
        { label: "timing", text: "near RA success" }
      ]
    }
  ];

  return (
    <StepStructuredDiagram
      flowLabel="Random access success flow"
      flowNodes={[
        { title: "RACH attempt finishes", detail: "MAC attempt reaches a final status" },
        { title: "RA success", detail: "target-cell random access succeeds" },
        { title: "target acquired", detail: "ML1 confirms handover acquisition" }
      ]}
      cards={cards}
      onOpenLogcode={onOpenLogcode}
    />
  );
}

function StepPopup({ step, onClose, onOpenLogcode }: { step: StepInfo; onClose: () => void; onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  const isMeasurementConfigStep = step.title.startsWith("1.");
  const isMeasurementRelationStep = step.title.startsWith("2.");
  const isMeasurementReportStep = step.title.startsWith("3.");
  const isNetworkInterfaceStep = step.title.startsWith("4.");
  const isHandoverCommandStep = step.title.startsWith("5.");
  const isApplyTargetConfigStep = step.title.startsWith("6.");
  const isHandoverExecutionStep = step.title.startsWith("7.");
  const isRandomAccessStep = step.title.startsWith("8.");
  const isRandomAccessSuccessStep = step.title.startsWith("9.");
  const isRrcCompletionStep = step.title.startsWith("10.");
  const isPostHoStep = step.title.startsWith("11.");
  const hasEvidence = Boolean(step.evidence?.length);
  const usesCustomDiagram = isNetworkInterfaceStep || isApplyTargetConfigStep || isHandoverExecutionStep || isRandomAccessStep || isRandomAccessSuccessStep;
  const usesStructuredStep = isMeasurementConfigStep || isMeasurementReportStep || isHandoverCommandStep || isRrcCompletionStep || isPostHoStep;

  return (
    <div className={`popup open react-popup ${usesStructuredStep ? "structured-step-popup" : ""} ${isMeasurementRelationStep ? "measurement-popup" : ""} ${isNetworkInterfaceStep ? "network-type-popup" : ""} ${isApplyTargetConfigStep ? "target-config-popup" : ""} ${isHandoverExecutionStep ? "execution-popup" : ""} ${isRandomAccessStep || isRandomAccessSuccessStep ? "rach-popup" : ""}`} role="dialog">
      <button className="popup-close" type="button" aria-label="Close popup" onClick={onClose}>x</button>
      <h2 className="popup-title">{step.title}</h2>
      <div className="popup-row"><b>Layer:</b> {step.layer}</div>
      {step.decide && !usesStructuredStep && !usesCustomDiagram ? <div className="popup-row"><b>How to decide from log:</b> {step.decide}</div> : null}
      {step.logcode && !isMeasurementRelationStep && !isApplyTargetConfigStep && !hasEvidence ? (
        <div className="popup-row">
          <b>Logcode + key fields:</b>{" "}
          <PopupText value={step.logcode} logcodes={step.logcodes} fields={step.fields} onOpenLogcode={onOpenLogcode} />
        </div>
      ) : null}
      {isMeasurementConfigStep ? <MeasurementConfigDiagram /> : null}
      {isMeasurementRelationStep ? <MeasurementRelationDiagram onOpenLogcode={onOpenLogcode} /> : null}
      {isMeasurementReportStep ? <MeasurementReportDiagram /> : null}
      {isNetworkInterfaceStep ? <NetworkTargetPreparationDiagram /> : null}
      {isHandoverCommandStep ? <HandoverCommandDiagram /> : null}
      {isApplyTargetConfigStep ? <ApplyTargetConfigDiagram onOpenLogcode={onOpenLogcode} /> : null}
      {isHandoverExecutionStep ? <HandoverExecutionDiagram onOpenLogcode={onOpenLogcode} /> : null}
      {isRandomAccessStep ? <RandomAccessDiagram onOpenLogcode={onOpenLogcode} /> : null}
      {isRandomAccessSuccessStep ? <RandomAccessSuccessDiagram onOpenLogcode={onOpenLogcode} /> : null}
      {isRrcCompletionStep ? <RrcCompletionDiagram /> : null}
      {isPostHoStep ? <PostHoOperationDiagram /> : null}
      {hasEvidence && !usesCustomDiagram ? <StepEvidenceList items={step.evidence!} title={usesStructuredStep ? "How to find it in logs" : "Evidence"} onOpenLogcode={onOpenLogcode} /> : null}
      {step.sequence && !isMeasurementRelationStep && !isApplyTargetConfigStep && !hasEvidence ? (
        <div className="popup-row">
          <b>Logic sequence:</b>{" "}
          <PopupText value={step.sequence} logcodes={step.sequenceLogcodes} fields={step.sequenceFields} onOpenLogcode={onOpenLogcode} />
        </div>
      ) : null}
      {step.note ? (
        <div className="popup-row">
          <b>Note:</b>{" "}
          <PopupText value={step.note} logcodes={step.noteLogcodes} fields={step.noteFields} onOpenLogcode={onOpenLogcode} />
        </div>
      ) : null}
      {step.confirm && !hasEvidence ? (
        <div className="popup-row">
          <b>HO confirmed by:</b>{" "}
          <PopupText value={step.confirm} logcodes={step.confirmLogcodes} fields={step.confirmFields} onOpenLogcode={onOpenLogcode} />
        </div>
      ) : null}
      {step.identity && !hasEvidence ? (
        <div className="popup-row">
          <b>Source / target identity:</b>{" "}
          <PopupText value={step.identity} logcodes={step.identityLogcodes} fields={step.identityFields} onOpenLogcode={onOpenLogcode} />
        </div>
      ) : null}
    </div>
  );
}

type LegacyStepShape = {
  stepNumber: string;
  body: string;
  divider: { x1: number; y1: number; x2: number; y2: number };
  tag: { x: number; y: number; text?: string };
  message: { x: number; y: number; small?: boolean; lines?: string[] };
  tail?: string;
  dashedTail?: boolean;
};

const legacyStepShapes: LegacyStepShape[] = [
  {
    stepNumber: "1",
    body: "M 190 338 L 672 338 L 720 360 L 672 382 L 190 382 Z",
    divider: { x1: 274, y1: 338, x2: 274, y2: 382 },
    tag: { x: 232, y: 368 },
    message: { x: 298, y: 369 }
  },
  {
    stepNumber: "2",
    body: "M 700 410 L 1072 410 L 1120 432 L 1072 454 L 700 454 Z",
    divider: { x1: 850, y1: 410, x2: 850, y2: 454 },
    tag: { x: 775, y: 440, text: "RRC->ML1" },
    message: { x: 872, y: 441, small: true }
  },
  {
    stepNumber: "3",
    body: "M 238 482 L 720 482 L 720 526 L 238 526 L 190 504 Z",
    divider: { x1: 322, y1: 482, x2: 322, y2: 526 },
    tag: { x: 280, y: 512 },
    message: { x: 346, y: 513 }
  },
  {
    stepNumber: "4",
    tail: "M 190 576 L 560 576",
    dashedTail: true,
    body: "M 560 554 L 1832 554 L 1880 576 L 1832 598 L 560 598 Z",
    divider: { x1: 690, y1: 554, x2: 690, y2: 598 },
    tag: { x: 625, y: 584 },
    message: { x: 715, y: 585, small: true }
  },
  {
    stepNumber: "5",
    body: "M 190 626 L 672 626 L 720 648 L 672 670 L 190 670 Z",
    divider: { x1: 274, y1: 626, x2: 274, y2: 670 },
    tag: { x: 232, y: 656 },
    message: { x: 298, y: 657 }
  },
  {
    stepNumber: "6",
    body: "M 700 698 L 1072 698 L 1120 720 L 1072 742 L 700 742 Z",
    divider: { x1: 784, y1: 698, x2: 784, y2: 742 },
    tag: { x: 742, y: 728 },
    message: { x: 808, y: 729 }
  },
  {
    stepNumber: "7",
    body: "M 1020 770 L 1342 770 L 1390 792 L 1342 814 L 1020 814 Z",
    divider: { x1: 1138, y1: 770, x2: 1138, y2: 814 },
    tag: { x: 1079, y: 800, text: "ML1->MAC" },
    message: { x: 1162, y: 789, small: true, lines: ["7. Handover", "Execution"] }
  },
  {
    stepNumber: "8",
    body: "M 1390 842 L 1832 842 L 1880 864 L 1832 886 L 1390 886 Z",
    divider: { x1: 1474, y1: 842, x2: 1474, y2: 886 },
    tag: { x: 1432, y: 872 },
    message: { x: 1498, y: 873 }
  },
  {
    stepNumber: "9",
    body: "M 1438 914 L 1880 914 L 1880 958 L 1438 958 L 1390 936 Z",
    divider: { x1: 1522, y1: 914, x2: 1522, y2: 958 },
    tag: { x: 1480, y: 944 },
    message: { x: 1542, y: 945, small: true }
  },
  {
    stepNumber: "10",
    body: "M 720 988 L 1832 988 L 1880 1010 L 1832 1032 L 720 1032 Z",
    divider: { x1: 804, y1: 988, x2: 804, y2: 1032 },
    tag: { x: 762, y: 1018 },
    message: { x: 828, y: 1019 }
  },
  {
    stepNumber: "11",
    body: "M 1438 1060 L 1880 1060 L 1880 1104 L 1438 1104 L 1390 1082 Z",
    divider: { x1: 1522, y1: 1060, x2: 1522, y2: 1104 },
    tag: { x: 1480, y: 1090, text: "POST" },
    message: { x: 1546, y: 1091 }
  }
];

function LegacyMessageShape({ shape, step, onSelect }: { shape: LegacyStepShape; step: StepInfo; onSelect: (step: StepInfo) => void }) {
  const messageLines = shape.message.lines || [step.title];
  return (
    <g
      className="step-label"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(step)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect(step);
      }}
    >
      {shape.tail ? <path d={shape.tail} className={`message-tail ${shape.dashedTail ? "dashed-message" : ""}`} /> : null}
      <path d={shape.body} className="message-body" />
      <path d={`M ${shape.divider.x1} ${shape.divider.y1} L ${shape.divider.x2} ${shape.divider.y2}`} className="message-divider" />
      <text x={shape.tag.x} y={shape.tag.y} className="tag" textAnchor="middle">{shape.tag.text || step.layer}</text>
      <text x={shape.message.x} y={shape.message.y} className={`msg ${shape.message.small ? "small" : ""}`}>
        {messageLines.map((line, index) => (
          <tspan key={line} x={shape.message.x} dy={index === 0 ? 0 : 22}>{line}</tspan>
        ))}
      </text>
    </g>
  );
}

function HandoverIntro({ onOpenDiagram }: { onOpenDiagram: () => void }) {
  return (
    <section className="handover-intro-panel">
      <div className="handover-intro-kicker">Event overview</div>
      <h2>5G NR Handover</h2>
      <p className="handover-intro-lead">
        Handover moves a UE from the current serving cell to a better target cell while the UE stays in RRC_CONNECTED state.
      </p>

      <div className="handover-intro-grid">
        <div className="handover-intro-block">
          <h3>What it does</h3>
          <p>
            It keeps the connection alive while radio service changes cell. The network sends target-cell configuration, the UE applies it, performs target random access, then confirms completion.
          </p>
        </div>
        <div className="handover-intro-block">
          <h3>Why it happens</h3>
          <p>
            Measurement results show that another cell is more suitable, often because the source signal becomes weak or a neighbor cell becomes better.
          </p>
        </div>
        <div className="handover-intro-block">
          <h3>How logs prove it</h3>
          <p>
            Look for RRC measurement config and report, network handover command, ML1 target config, MAC random access, RRCReconfigurationComplete, then user-plane data resume.
          </p>
        </div>
      </div>

      <div className="handover-intro-action">
        <button className="handover-diagram-button" type="button" onClick={onOpenDiagram}>
          Open sequence diagram
        </button>
        <span>The sequence diagram shows the RRC, ML1, MAC, network, and target-cell timing.</span>
      </div>
    </section>
  );
}

function HomeVisual() {
  return (
    <svg className="home-visual" viewBox="0 0 720 520" role="img" aria-label="CellNinjia extracts diagnostic logs from UE connected to a base station">
      <defs>
        <marker
          id="home-map-arrow"
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="12"
          markerHeight="12"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 1 1 L 11 6 L 1 11 z" />
        </marker>
        <marker
          id="home-red-arrow"
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="12"
          markerHeight="12"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 1 1 L 11 6 L 1 11 z" />
        </marker>
      </defs>

      <g className="home-three-radio-link">
        <path d="M 164 226 L 292 226" />
        <path d="M 292 258 L 164 258" />
      </g>

      <g className="home-three-base" transform="translate(34 112)">
        <text className="home-map-title" x="92" y="-34" textAnchor="middle">Base station</text>
        <path d="M 82 30 V 62" />
        <circle cx="82" cy="78" r="12" />
        <path d="M 82 91 L 34 282" />
        <path d="M 82 91 L 130 282" />
        <path d="M 68 128 H 96" />
        <path d="M 58 166 H 106" />
        <path d="M 48 206 H 116" />
        <path d="M 38 246 H 126" />
        <path d="M 34 282 H 130" />
        <path d="M 70 128 L 106 166 L 48 206 L 126 246 L 34 282" />
        <path d="M 94 128 L 58 166 L 116 206 L 38 246 L 130 282" />
        <path d="M 52 66 C 58 48 69 39 82 39 C 96 39 106 48 112 66" />
        <path d="M 32 66 C 42 32 61 16 82 16 C 104 16 123 32 134 66" />
        <path d="M 12 66 C 27 14 53 -8 82 -8 C 113 -8 139 14 154 66" />
      </g>

      <g className="home-three-ue" transform="translate(294 72)">
        <text className="home-map-title" x="72" y="-34" textAnchor="middle">UE</text>
        <rect x="0" y="0" width="156" height="334" rx="32" />
        <g className="home-three-ue-waves">
          <path d="M 164 70 C 188 48 188 26 164 4" />
          <path d="M 180 90 C 218 56 218 16 180 -18" />
        </g>
        <path d="M 58 26 H 98" />
        <path d="M 58 304 H 98" />
        <path d="M 42 88 H 114" />
        <path d="M 42 124 H 98" />
        <path d="M 42 160 H 114" />
        <g className="home-three-modem" transform="translate(30 196)">
          <rect x="0" y="0" width="96" height="74" rx="10" />
          <path d="M -10 16 H 0" />
          <path d="M -10 36 H 0" />
          <path d="M -10 56 H 0" />
          <path d="M 96 16 H 106" />
          <path d="M 96 36 H 106" />
          <path d="M 96 56 H 106" />
          <text className="home-three-modem-label" x="48" y="44" textAnchor="middle">modem</text>
        </g>
      </g>

      <g className="home-three-extract-link">
        <path d="M 430 305 C 462 300 492 300 520 314" />
      </g>

      <g className="home-three-cellninjia" transform="translate(520 274)">
        <text className="home-map-title" x="86" y="-44" textAnchor="middle">CellNinjia</text>
        <rect x="0" y="0" width="174" height="132" rx="20" />
        <g className="home-three-lens" transform="translate(20 32)">
          <circle cx="37" cy="37" r="34" />
          <path d="M 62 62 L 92 92" />
          <path d="M 74 74 L 104 104" />
          <path d="M 30 20 C 44 20 54 28 58 40" />
        </g>
        <g className="home-three-parser" transform="translate(114 38)">
          <path d="M 0 0 H 42" />
          <path d="M 0 24 H 50" />
          <path d="M 0 48 H 44" />
        </g>
      </g>
    </svg>
  );
}

function HomeLanding({ onOpenNrLog }: { onOpenNrLog: () => void }) {
  return (
    <section className="home-landing">
      <div className="home-hero">
        <div className="home-hero-copy">
          <h1>NR Log Explorer</h1>
          <p>
            A structured workspace for reading 5G NR events, logcodes, message schemas, and field paths from extracted diagnostic logs.
          </p>
          <div className="home-hero-actions">
            <button className="home-primary-action" type="button" onClick={onOpenNrLog}>Open NR Log</button>
            <span>Start from Event, Message, or Field after entering the log index.</span>
          </div>
        </div>
        <HomeVisual />
      </div>
    </section>
  );
}

function NrLogIndex({ onOpenEvent, onOpenMessage, onOpenField }: { onOpenEvent: () => void; onOpenMessage: () => void; onOpenField: () => void }) {
  return (
    <section className="nr-log-index-panel">
      <div className="nr-log-index-header">
        <div className="home-kicker">Choose an index</div>
        <h2>NR Log</h2>
        <p>Use these three entry points depending on whether you know the procedure, the logcode, or the field name.</p>
      </div>
      <div className="home-action-grid">
        <button type="button" onClick={onOpenEvent}>
          <span>Event</span>
          <small>procedure flow and evidence</small>
        </button>
        <button type="button" onClick={onOpenMessage}>
          <span>Message</span>
          <small>logcode schemas and variants</small>
        </button>
        <button type="button" onClick={onOpenField}>
          <span>Field</span>
          <small>field paths across logcodes</small>
        </button>
      </div>
    </section>
  );
}

function HandoverDiagram({ onOpenLogcode }: { onOpenLogcode: (record: LogcodeRef, terms?: string[]) => void }) {
  const steps = handoverEvent.steps || {};
  const [selectedStep, setSelectedStep] = useState<StepInfo | null>(null);

  function openLogcode(logcode: string, terms: string[]) {
    const record = findLogcodeRecord(logcode, terms);
    if (record) {
      setSelectedStep(null);
      onOpenLogcode(record, terms);
    }
  }

  return (
    <div className="diagram-panel">
      <svg className="handover-svg" viewBox="0 0 2048 1310" role="img" aria-label="Generic 5G NR Handover Procedure">
        <defs>
          <g id="phone">
            <rect x="-34" y="-52" width="68" height="104" rx="13" fill="#4d4d4d" />
            <rect x="-27" y="-39" width="54" height="78" rx="4" fill="#ffffff" />
            <rect x="-8" y="-47" width="16" height="3" rx="1.5" fill="#ffffff" />
            <rect x="-11" y="42" width="22" height="5" rx="2.5" fill="#ffffff" />
          </g>
          <g id="tower" stroke="#555555" strokeWidth="4.2" fill="none" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M 0 28 L -31 130" />
            <path d="M 0 28 L 31 130" />
            <path d="M -22 128 L 22 128" />
            <path d="M -22 96 L 20 111" />
            <path d="M 22 96 L -20 111" />
            <path d="M -15 67 L 16 79" />
            <path d="M 15 67 L -15 79" />
            <circle cx="0" cy="25" r="7" strokeWidth="4.2" />
            <path d="M -13 7 A 22 22 0 0 0 -13 43" />
            <path d="M 13 7 A 22 22 0 0 1 13 43" />
            <path d="M -23 -4 A 37 37 0 0 0 -23 54" />
            <path d="M 23 -4 A 37 37 0 0 1 23 54" />
            <path d="M -33 -15 A 52 52 0 0 0 -33 65" />
            <path d="M 33 -15 A 52 52 0 0 1 33 65" />
          </g>
        </defs>

        <rect width="2048" height="1310" fill="#ffffff" />
        <text className="svg-title" x="1024" y="95" textAnchor="middle">Generic 5G NR Handover Procedure</text>

        <g transform="translate(0 80)">
          <g transform="translate(210 40)">
            <use href="#tower" />
          </g>
          <text x="210" y="218" className="participant" textAnchor="middle">Source Cell</text>

          <use href="#phone" x="1120" y="112" />
          <text x="1120" y="218" className="participant" textAnchor="middle">UE</text>
          <rect x="610" y="250" width="930" height="72" rx="8" className="box" />
          <text x="720" y="298" className="layer" textAnchor="middle">RRC</text>
          <text x="1120" y="298" className="layer" textAnchor="middle">ML1</text>
          <text x="1390" y="298" className="layer" textAnchor="middle">MAC</text>

          <g transform="translate(1850 40)">
            <use href="#tower" />
          </g>
          <text x="1850" y="218" className="participant" textAnchor="middle">Target Cell</text>

          <path d="M 190 285 L 190 1112" className="lifeline" />
          <path d="M 720 322 L 720 1112" className="lifeline" />
          <path d="M 1120 322 L 1120 1112" className="lifeline" />
          <path d="M 1390 322 L 1390 1112" className="lifeline" />
          <path d="M 1880 285 L 1880 1112" className="lifeline" />

          {legacyStepShapes.map((shape) => {
            const step = steps[shape.stepNumber];
            if (!step) return null;
            return <LegacyMessageShape key={shape.stepNumber} shape={shape} step={step} onSelect={setSelectedStep} />;
          })}

          <text x="1024" y="1185" textAnchor="middle" className="caption">Figure 1: Generic 5G NR handover procedure.</text>
        </g>
      </svg>
      {selectedStep ? <StepPopup step={selectedStep} onClose={() => setSelectedStep(null)} onOpenLogcode={openLogcode} /> : null}
    </div>
  );
}

function FieldIndexView({
  fieldNotes,
  onAddFieldNote,
  onOpenLogcode
}: {
  fieldNotes: MessageNotesStore;
  onAddFieldNote: (targetId: string, text: string) => void;
  onOpenLogcode: (record: LogcodeRef, terms?: string[]) => void;
}) {
  const [fields, setFields] = useState<FieldIndexEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [selectedField, setSelectedField] = useState<FieldIndexEntry | null>(null);
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeForMatch(query);
  const fieldById = useMemo(() => new Map(fields.map((field) => [field.id, field])), [fields]);
  const visibleFields = useMemo(() => {
    if (!normalizedQuery) return fields;
    return fields.filter((field) => {
      if (normalizeForMatch(field.name).includes(normalizedQuery)) return true;
      return field.records.some((record) => normalizeForMatch(`${record.logcode} ${record.name} ${record.title}`).includes(normalizedQuery));
    });
  }, [fields, normalizedQuery]);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    loadFieldIndex()
      .then((loadedFields) => {
        if (cancelled) return;
        setFields(loadedFields.filter((field) => isDisplayableFieldName(field.name)));
        setStatus("ready");
      })
      .catch((loadError) => {
        if (cancelled) return;
        setStatus("error");
        setError(loadError instanceof Error ? loadError.message : "Unable to load field index.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return <div className="status-panel">Loading field index...</div>;
  }

  if (status === "error") {
    return <div className="status-panel is-error">{error}</div>;
  }

  if (selectedField) {
    return (
      <div className="field-list">
        <button className="field-index-back" type="button" onClick={() => setSelectedField(null)}>All fields</button>
        <div className="field-match-title">
          {selectedField.name}
          <div className="field-match-count">{selectedField.records.length} matching logcode{selectedField.records.length === 1 ? "" : "s"}</div>
        </div>
        <FieldNotesPanel
          field={selectedField}
          entry={fieldNotes[selectedField.id] || emptyMessageNoteEntry()}
          onAddNote={onAddFieldNote}
        />
        {selectedField.records.map((entry) => {
          const record = logcodeById.get(entry.id);
          if (!record) return null;
          return (
            <button key={entry.id} className="field-record-button" type="button" onClick={() => onOpenLogcode(record, [selectedField.name])}>
              {recordLabel(record)} <span className="field-match-count">{entry.pathCount ?? entry.paths?.length ?? 0} path{(entry.pathCount ?? entry.paths?.length ?? 0) === 1 ? "" : "s"}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="field-list">
      <label className="search-box">
        <span>Search field</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="field name, logcode, or message name" />
      </label>
      <div className="result-count">{visibleFields.length} / {fields.length} fields</div>
      {visibleFields.map((field) => (
        <button key={field.id} className={`field-record-button ${isHandoverRelated([field.name]) ? "handover-field" : ""}`} type="button" onClick={() => setSelectedField(fieldById.get(field.id) || field)}>
          {field.name} <span className="field-match-count">{field.records.length} logcode{field.records.length === 1 ? "" : "s"}</span>
          {noteCountLabel(fieldNotes[field.id]) ? <span className="message-note-badge">{noteCountLabel(fieldNotes[field.id])}</span> : null}
        </button>
      ))}
    </div>
  );
}

export function App() {
  const [view, setView] = useState<ViewName>("home");
  const [detailRecord, setDetailRecord] = useState<LogcodeRecord | null>(null);
  const [detailStatus, setDetailStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [detailError, setDetailError] = useState("");
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [selectedMessageLayer, setSelectedMessageLayer] = useState<string | null>(null);
  const [selectedLogcodeGroup, setSelectedLogcodeGroup] = useState<string | null>(null);
  const [messageQuery, setMessageQuery] = useState("");
  const [showHandoverDiagram, setShowHandoverDiagram] = useState(false);
  const repositoryMessageNotesStore = useMemo(() => sanitizeNotesStore(repositoryMessageNotes, "messages"), []);
  const repositoryFieldNotesStore = useMemo(() => sanitizeNotesStore(repositoryFieldNotes, "fields"), []);
  const [localMessageNotes, setLocalMessageNotes] = useState<MessageNotesStore>(() => readLocalNotesStore(localMessageNotesStorageKey));
  const [localFieldNotes, setLocalFieldNotes] = useState<MessageNotesStore>(() => readLocalNotesStore(localFieldNotesStorageKey));
  const messageNotes = useMemo(() => mergeNotesStores(repositoryMessageNotesStore, localMessageNotes), [repositoryMessageNotesStore, localMessageNotes]);
  const fieldNotes = useMemo(() => mergeNotesStores(repositoryFieldNotesStore, localFieldNotes), [repositoryFieldNotesStore, localFieldNotes]);
  const detailLoadSequence = useRef(0);
  const historyRef = useRef<AppHistoryState>({ stack: [initialRoute], index: 0 });
  const [historyState, setHistoryState] = useState<AppHistoryState>(historyRef.current);
  const messageLogcodeGroups = useMemo(() => buildMessageLogcodeGroups(logcodeRecords), []);
  const messageLayers = useMemo(() => {
    const counts = new Map<string, number>();
    messageLogcodeGroups.forEach((group) => {
      counts.set(group.category, (counts.get(group.category) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([layer, count]) => ({ layer, count }))
      .sort((a, b) => {
        const aOrder = messageLayerOrder.indexOf(a.layer);
        const bOrder = messageLayerOrder.indexOf(b.layer);
        if (aOrder !== -1 || bOrder !== -1) return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
        return a.layer.localeCompare(b.layer);
      });
  }, [messageLogcodeGroups]);
  const selectedGroup = useMemo(
    () => messageLogcodeGroups.find((group) => group.logcode === selectedLogcodeGroup) || null,
    [messageLogcodeGroups, selectedLogcodeGroup]
  );
  const visibleMessageGroups = useMemo(() => {
    const normalizedQuery = normalizeForMatch(messageQuery);
    return messageLogcodeGroups.filter((group) => {
      if (selectedMessageLayer && group.category !== selectedMessageLayer) return false;
      return matchesMessageGroup(group, normalizedQuery);
    });
  }, [messageLogcodeGroups, messageQuery, selectedMessageLayer]);
  const visibleGroupVariants = useMemo(() => {
    if (!selectedGroup) return [];
    const normalizedQuery = normalizeForMatch(messageQuery);
    return selectedGroup.records.filter((record) => {
      if (!normalizedQuery) return true;
      return normalizeForMatch(recordLabel(record)).includes(normalizedQuery);
    });
  }, [messageQuery, selectedGroup]);

  useEffect(() => {
    writeLocalNotesStore(localMessageNotesStorageKey, localMessageNotes);
  }, [localMessageNotes]);

  useEffect(() => {
    writeLocalNotesStore(localFieldNotesStorageKey, localFieldNotes);
  }, [localFieldNotes]);

  function addMessageNote(targetId: string, text: string) {
    setLocalMessageNotes((currentNotes) => appendLocalNote(currentNotes, targetId, text));
  }

  function addFieldNote(targetId: string, text: string) {
    setLocalFieldNotes((currentNotes) => appendLocalNote(currentNotes, targetId, text));
  }

  function setAppHistory(nextHistory: AppHistoryState) {
    historyRef.current = nextHistory;
    setHistoryState(nextHistory);
  }

  function clearDetailState() {
    detailLoadSequence.current += 1;
    setDetailRecord(null);
    setDetailStatus("idle");
    setDetailError("");
    setSelectedTerms([]);
  }

  function loadDetailById(detailId: string, terms: string[] = []) {
    const record = logcodeById.get(detailId);
    const loadId = detailLoadSequence.current + 1;
    detailLoadSequence.current = loadId;
    setSelectedTerms(terms);
    setDetailRecord(null);
    setDetailError("");

    if (!record) {
      setDetailStatus("error");
      setDetailError(`Unknown logcode id: ${detailId}`);
      return;
    }

    setDetailStatus("loading");

    void loadLogcodeRecord(record)
      .then((fullRecord) => {
        if (detailLoadSequence.current !== loadId) return;
        setDetailRecord(fullRecord);
        setDetailStatus("ready");
      })
      .catch((error) => {
        if (detailLoadSequence.current !== loadId) return;
        setDetailStatus("error");
        setDetailError(error instanceof Error ? error.message : "Unable to load logcode detail.");
      });
  }

  function applyRoute(route: AppRoute) {
    const nextRoute = normalizeRoute(route);
    setView(nextRoute.view);
    if (nextRoute.view === "handover") {
      setShowHandoverDiagram(false);
    }

    if (nextRoute.view !== "message") {
      setSelectedMessageLayer(null);
      setSelectedLogcodeGroup(null);
      setMessageQuery("");
      clearDetailState();
      return;
    }

    setSelectedMessageLayer(nextRoute.selectedMessageLayer || null);
    setSelectedLogcodeGroup(nextRoute.selectedLogcodeGroup || null);
    setMessageQuery(nextRoute.messageQuery || "");

    if (nextRoute.detailId) {
      loadDetailById(nextRoute.detailId, nextRoute.selectedTerms || []);
    } else {
      clearDetailState();
    }
  }

  function navigate(route: AppRoute) {
    const nextRoute = normalizeRoute(route);
    const currentHistory = historyRef.current;
    const nextStack = currentHistory.stack.slice(0, currentHistory.index + 1);
    if (routesEqual(nextStack[nextStack.length - 1], nextRoute)) {
      applyRoute(nextRoute);
      return;
    }
    nextStack.push(nextRoute);
    setAppHistory({ stack: nextStack, index: nextStack.length - 1 });
    applyRoute(nextRoute);
  }

  function goHistory(delta: -1 | 1) {
    const currentHistory = historyRef.current;
    const nextIndex = currentHistory.index + delta;
    if (nextIndex < 0 || nextIndex >= currentHistory.stack.length) return;
    setAppHistory({ ...currentHistory, index: nextIndex });
    applyRoute(currentHistory.stack[nextIndex]);
  }

  function openDetail(record: LogcodeRef, terms: string[] = [], context?: { keepGroup?: boolean }) {
    const summary = logcodeById.get(record.id) || record;
    const nextLayer = context?.keepGroup ? selectedMessageLayer : "category" in summary ? summary.category : selectedMessageLayer;
    const nextGroup = context?.keepGroup ? selectedLogcodeGroup : null;
    navigate({
      view: "message",
      selectedMessageLayer: nextLayer || null,
      selectedLogcodeGroup: nextGroup || null,
      detailId: record.id,
      selectedTerms: terms
    });
  }

  function openLogcodeGroup(group: MessageLogcodeGroup) {
    if (group.records.length === 1) {
      void openDetail(group.records[0]);
      return;
    }
    navigate({ view: "message", selectedMessageLayer: group.category, selectedLogcodeGroup: group.logcode });
  }

  const historyControls = {
    canGoBack: historyState.index > 0,
    canGoForward: historyState.index < historyState.stack.length - 1,
    onBack: () => goHistory(-1),
    onForward: () => goHistory(1)
  };

  function routeBeforeDetail(): AppRoute {
    if (selectedLogcodeGroup) return { view: "message", selectedMessageLayer, selectedLogcodeGroup };
    if (selectedMessageLayer) return { view: "message", selectedMessageLayer };
    return { view: "message" };
  }

  return (
    <main className="app-shell">
      {view === "home" ? (
        <section className="home-screen">
          <HistoryButtons {...historyControls} />
          <HomeLanding onOpenNrLog={() => navigate({ view: "nrLog" })} />
        </section>
      ) : null}

      {view === "nrLog" ? (
        <section className="explorer-screen nr-log-screen">
          <TopBar title="NR Log" onHome={() => navigate({ view: "home" })} {...historyControls} />
          <NrLogIndex
            onOpenEvent={() => navigate({ view: "event" })}
            onOpenMessage={() => navigate({ view: "message" })}
            onOpenField={() => navigate({ view: "field" })}
          />
        </section>
      ) : null}

      {view === "event" ? (
        <section className="explorer-screen">
          <TopBar title="Event" onHome={() => navigate({ view: "home" })} {...historyControls} />
          <div className="explorer-grid">
            <section className="explorer-column">
              <h2 className="column-title">Event</h2>
              <div className="column-list">
                {eventIndex.map((eventItem) => (
                  <button key={eventItem.id} className="column-button" type="button" onClick={() => navigate({ view: eventItem.view as ViewName })}>
                    {eventItem.title}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </section>
      ) : null}

      {view === "message" ? (
        <section className={`explorer-screen ${detailRecord || detailStatus === "loading" || detailStatus === "error" ? "is-detail-view" : ""}`}>
          <TopBar title="Message" onHome={() => navigate({ view: "home" })} {...historyControls} />
          <div className="explorer-grid">
            <section className="explorer-column">
              <h2 className="column-title">
                {detailRecord || detailStatus === "loading" || detailStatus === "error"
                  ? "Message detail"
                  : selectedGroup
                    ? `${selectedGroup.logcode} variants`
                    : selectedMessageLayer
                      ? selectedMessageLayer
                      : "Message"}
              </h2>
              {detailRecord || detailStatus === "loading" || detailStatus === "error" ? (
                <div className="field-list">
                  <button className="field-index-back" type="button" onClick={() => navigate(routeBeforeDetail())}>{selectedGroup ? "Back to variants" : selectedMessageLayer ? "Back to logcodes" : "All layers"}</button>
                  {detailStatus === "loading" ? <div className="status-panel">Loading message detail...</div> : null}
                  {detailStatus === "error" ? <div className="status-panel is-error">{detailError}</div> : null}
                  {detailRecord ? (
                    <MessageNotesPanel
                      record={detailRecord}
                      entry={messageNotes[detailRecord.id] || emptyMessageNoteEntry()}
                      onAddNote={addMessageNote}
                    />
                  ) : null}
                  {detailRecord ? <LogcodeDetail record={detailRecord} selectedTerms={selectedTerms} /> : null}
                </div>
              ) : selectedGroup ? (
                <div className="column-list">
                  <div className="message-layer-bar">
                    <button className="field-index-back" type="button" onClick={() => navigate({ view: "message", selectedMessageLayer })}>Back to logcodes</button>
                    <div className="selected-layer-title">{selectedGroup.title}</div>
                  </div>
                  <label className="search-box">
                    <span>Search variant</span>
                    <input value={messageQuery} onChange={(event) => setMessageQuery(event.target.value)} placeholder="variant or message name" />
                  </label>
                  <div className="result-count">{visibleGroupVariants.length} / {selectedGroup.records.length} variants</div>
                  {visibleGroupVariants.map((record) => (
                    <button key={record.id} className="column-button" type="button" onClick={() => openDetail(record, [], { keepGroup: true })}>
                      <span>{recordLabel(record)}</span>
                      {noteCountLabel(messageNotes[record.id]) ? <span className="message-note-badge">{noteCountLabel(messageNotes[record.id])}</span> : null}
                    </button>
                  ))}
                </div>
              ) : selectedMessageLayer ? (
                <div className="column-list">
                  <div className="message-layer-bar">
                    <button className="field-index-back" type="button" onClick={() => navigate({ view: "message" })}>All layers</button>
                    <div className="selected-layer-title">{messageLayerLabel(selectedMessageLayer)}</div>
                  </div>
                  <label className="search-box">
                    <span>Search logcode</span>
                    <input value={messageQuery} onChange={(event) => setMessageQuery(event.target.value)} placeholder="logcode or message name" />
                  </label>
                  <div className="result-count">{visibleMessageGroups.length} / {messageLogcodeGroups.filter((group) => group.category === selectedMessageLayer).length} 5G logcodes</div>
                  {visibleMessageGroups.map((group) => {
                    const noteCount = noteCountForGroup(messageNotes, group);
                    return (
                    <button key={group.logcode} className="column-button" type="button" onClick={() => openLogcodeGroup(group)}>
                      <span>{group.title}</span>
                      <span className="message-row-meta">
                        <span>{messageLayerLabel(group.category)}</span>
                        <span>{group.records.length === 1 ? "1 structure" : `${group.records.length} variants`}</span>
                        {noteCount ? <span className="message-note-badge">{noteCount} note{noteCount === 1 ? "" : "s"}</span> : null}
                      </span>
                    </button>
                    );
                  })}
                </div>
              ) : (
                <div className="layer-list">
                  {messageLayers.map(({ layer, count }) => (
                    <button key={layer} className="layer-button" type="button" onClick={() => navigate({ view: "message", selectedMessageLayer: layer })}>
                      <span>{messageLayerLabel(layer)}</span>
                      <span className="layer-count">{count} 5G logcode{count === 1 ? "" : "s"}</span>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      ) : null}

      {view === "field" ? (
        <section className="explorer-screen is-field-view">
          <TopBar title="Field" onHome={() => navigate({ view: "home" })} {...historyControls} />
          <div className="explorer-grid">
            <section className="explorer-column">
              <h2 className="column-title">Field</h2>
              <FieldIndexView fieldNotes={fieldNotes} onAddFieldNote={addFieldNote} onOpenLogcode={openDetail} />
            </section>
          </div>
        </section>
      ) : null}

      {view === "handover" ? (
        <section className="viewer-screen">
          <TopBar title="Handover" onHome={() => navigate({ view: "event" })} backLabel="Event / Message" {...historyControls} />
          {showHandoverDiagram ? (
            <>
              <div className="handover-diagram-toolbar">
                <button className="field-index-back" type="button" onClick={() => setShowHandoverDiagram(false)}>
                  Back to introduction
                </button>
              </div>
              <HandoverDiagram onOpenLogcode={openDetail} />
            </>
          ) : (
            <HandoverIntro onOpenDiagram={() => setShowHandoverDiagram(true)} />
          )}
        </section>
      ) : null}

      {view === "nrMeasurementEvents" ? (
        <section className="event-config-screen">
          <TopBar title="NR Measurement Events" onHome={() => navigate({ view: "event" })} backLabel="Event / Message" {...historyControls} />
          <NRMeasurementEventsView onOpenLogcode={openDetail} />
        </section>
      ) : null}

      {view === "registration" ? (
        <section className="viewer-screen">
          <TopBar title="UE Registration" onHome={() => navigate({ view: "event" })} backLabel="Event / Message" {...historyControls} />
          <div className="placeholder-panel">UE Registration</div>
        </section>
      ) : null}
    </main>
  );
}

function HistoryButtons({
  canGoBack,
  canGoForward,
  onBack,
  onForward
}: {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
}) {
  return (
    <div className="history-controls" aria-label="Navigation history">
      <button className="history-button" type="button" onClick={onBack} disabled={!canGoBack}>Back</button>
      <button className="history-button" type="button" onClick={onForward} disabled={!canGoForward}>Forward</button>
    </div>
  );
}

function TopBar({
  title,
  onHome,
  backLabel = "Home",
  canGoBack,
  canGoForward,
  onBack,
  onForward
}: {
  title: string;
  onHome: () => void;
  backLabel?: string;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
}) {
  return (
    <div className="viewer-bar">
      <button className="back-button" type="button" onClick={onHome}>{backLabel}</button>
      <HistoryButtons canGoBack={canGoBack} canGoForward={canGoForward} onBack={onBack} onForward={onForward} />
      <div className="view-title">{title}</div>
    </div>
  );
}
