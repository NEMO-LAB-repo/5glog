import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { eventIndex, findLogcodeRecord, handoverEvent, loadFieldIndex, loadLogcodeRecord, logcodeById, logcodeRecords, normalizeForMatch, nrMeasurementEvents, recordLabel } from "./data";
import type { FieldIndexEntry, LogcodeRecord, LogcodeRef, LogcodeSummary, MeasurementEventInfo, MessageNoteEntry, MessageNotesStore, StepInfo, ViewName } from "./types";

const messageNotesStorageKey = "handover-logcode-message-notes-v1";
const fieldNotesStorageKey = "handover-logcode-field-notes-v1";
const noteDeletePasscode = "985807";

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

const logcodeGroupNameOverrides: Record<string, string> = {
  "0x1FFB": "Encapsulated Event Report",
  "0xB80A": "MM5G NAS Downlink Message",
  "0xB80B": "MM5G NAS Uplink Message"
};

const builtInLogcodeNotes: Record<string, string[]> = {
  "0xB96D": [
    "Search/acquisition evidence. It shows which configured raster/frequency was searched, which candidate PCI/SSB was detected, and whether basic synchronization/MIB evidence exists. Key fields: Raster List, ARFCN, Band, SCS, Num Cell Detect, Cell Detect List, Phy Cell Id, SSB Index, MIB, SFN, RSRP Raw. Timing: early stage before stable 0xB97F database quality and before the RRC MeasurementReport."
  ],
  "0xB96A": [
    "Instantaneous ML1 measurement evidence. It records raw/near-raw serving or neighbor cell/beam quality such as PCI, frequency/ARFCN, SSB/beam index, RSRP, RSRQ, and SINR. Timing: usually follows or interleaves with 0xB96D search/acquisition and can feed later filtered database updates."
  ],
  "0xB97F": [
    "Filtered measurement database evidence. It stores stable serving/neighbor quality after ML1 processing. Key fields: Serving Cell PCI, Raster Freq, Cells, PCI, CellQualityRsrp, CellQualityRsrq, Detected Beams, SSB Index. Timing: this is the ML1 evidence most directly preceding an Event A3-style RRC MeasurementReport."
  ],
  "0xB970": [
    "Suitability / S-criteria evidence, not a new raw measurement sample. It checks whether the candidate cell is usable based on measured quality and broadcast thresholds such as q-RxLevMin and q-QualMin. Timing: interpret after acquisition/measurement evidence; it can repeat and interleave with 0xB97F."
  ]
};

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

const measurementRelationNodes = [
  {
    code: "0xB96D",
    label: "Search / ACQ",
    text: "Find freq, PCI, SSB",
    fields: ["Raster List", "ARFCN", "Phy Cell Id", "SSB Index", "MIB", "RSRP Raw"]
  },
  {
    code: "0xB96A",
    label: "Raw Measure",
    text: "Instant RSRP / RSRQ / SINR",
    fields: ["PCI", "ARFCN", "SSB Index", "RSRP", "RSRQ", "SINR"]
  },
  {
    code: "0xB97F",
    label: "Filtered DB",
    text: "Stable CellQuality",
    fields: ["Serving Cell PCI", "CellQualityRsrp", "CellQualityRsrq", "Detected Beams"]
  },
  {
    code: "0xB970",
    label: "Suitability",
    text: "S-criteria check",
    fields: ["q-RxLevMin", "q-QualMin", "PCI"]
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
    "MIB",
    "SIB",
    "Search Space",
    "SUCCESS",
    "TDD UL DL CFG",
    "measConfig",
    "measId",
    "measIdToAddModList",
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
    "q-QualMin",
    "q-RxLevMin",
    "Rach Reason",
    "RACH Result",
    "rach-ConfigDedicated",
    "RACH Contention",
    "reportConfigToAddModList",
    "reconfigurationWithSync",
    "Result",
    "rrcReconfiguration",
    "rrcReconfigurationComplete",
    "rsrp",
    "rsrq",
    "sinr",
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

function loadStoredNotes(storageKey: string): MessageNotesStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    return sanitizeMessageNotes(JSON.parse(raw));
  } catch {
    return {};
  }
}

function loadMessageNotes(): MessageNotesStore {
  return loadStoredNotes(messageNotesStorageKey);
}

function loadFieldNotes(): MessageNotesStore {
  return loadStoredNotes(fieldNotesStorageKey);
}

function sanitizeMessageNotes(value: unknown): MessageNotesStore {
  const source = isRecord(value) && isRecord(value.messages) ? value.messages : value;
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

function JsonValue({ value, depth = 0, path = [], selectedTerms = [] }: { value: unknown; depth?: number; path?: string[]; selectedTerms?: string[] }) {
  if (value === null) return null;

  if (Array.isArray(value)) {
    if (!value.length) return null;
    return (
      <>
        {value.map((item, index) => (
          <JsonValue key={index} value={item} depth={depth} path={path} selectedTerms={selectedTerms} />
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
                "{key}": {selected ? <span className="handover-note">(selected handover field)</span> : handover ? <span className="handover-note">(handover-related)</span> : null}
              </div>
              <JsonValue value={child} depth={depth + 1} path={nextPath} selectedTerms={selectedTerms} />
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
      "{key}": {JSON.stringify(value)} {selected ? <span className="handover-note">(selected handover field)</span> : handover ? <span className="handover-note">(handover-related)</span> : null}
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
                              {parsed.label} {selected ? <span className="handover-note">(selected handover field)</span> : handover ? <span className="handover-note">(handover-related)</span> : null}
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
          <JsonValue value={record.detail} depth={1} selectedTerms={selectedTerms} />
        </div>
      </div>
    </>
  );
}

function EditableNotesPanel({
  targetId,
  targetLabel,
  entry,
  onAddNote,
  onDeleteNote,
  builtInNotes = [],
  ariaLabel = "Notes"
}: {
  targetId: string;
  targetLabel: string;
  entry: MessageNoteEntry;
  onAddNote: (targetId: string, text: string) => void;
  onDeleteNote: (targetId: string, noteId: string) => void;
  builtInNotes?: string[];
  ariaLabel?: string;
}) {
  const [noteDraft, setNoteDraft] = useState("");
  const [pendingDeleteNoteId, setPendingDeleteNoteId] = useState<string | null>(null);
  const [deletePasscodeDraft, setDeletePasscodeDraft] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    setNoteDraft("");
    setPendingDeleteNoteId(null);
    setDeletePasscodeDraft("");
    setDeleteError("");
  }, [targetId]);

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = noteDraft.trim();
    if (!text) return;
    onAddNote(targetId, text);
    setNoteDraft("");
  }

  function requestDelete(noteId: string) {
    setPendingDeleteNoteId(noteId);
    setDeletePasscodeDraft("");
    setDeleteError("");
  }

  function cancelDelete() {
    setPendingDeleteNoteId(null);
    setDeletePasscodeDraft("");
    setDeleteError("");
  }

  function confirmDelete(event: FormEvent<HTMLFormElement>, noteId: string) {
    event.preventDefault();
    if (deletePasscodeDraft !== noteDeletePasscode) {
      setDeleteError("Wrong passcode.");
      return;
    }
    onDeleteNote(targetId, noteId);
    cancelDelete();
  }

  return (
    <section className="message-notes-panel" aria-label={ariaLabel}>
      <div className="message-notes-header">
        <div>
          <div className="message-notes-title">Notes</div>
          <div className="message-notes-target">{targetLabel}</div>
        </div>
      </div>

      {builtInNotes.length ? (
        <div className="built-in-note-list" aria-label="Built-in notes">
          {builtInNotes.map((note, index) => (
            <div key={index} className="built-in-note-card">
              {note}
            </div>
          ))}
        </div>
      ) : null}

      <form className="message-note-form" onSubmit={submitNote}>
        <label>
          <span>New note</span>
          <textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="Add evidence, log pattern, caveat, or explanation" />
        </label>
        <button type="submit">Add note</button>
      </form>

      <div className="message-note-list">
        {entry.notes.length ? entry.notes.map((note) => (
          <article key={note.id} className="message-note-card">
            <div className="message-note-meta">
              <span>{formatNoteTime(note.createdAt)}</span>
              <button type="button" onClick={() => requestDelete(note.id)}>Delete</button>
            </div>
            <div className="message-note-text">{note.text}</div>
            {pendingDeleteNoteId === note.id ? (
              <form className="note-delete-form" onSubmit={(event) => confirmDelete(event, note.id)}>
                <label>
                  <span>Passcode</span>
                  <input
                    value={deletePasscodeDraft}
                    onChange={(event) => {
                      setDeletePasscodeDraft(event.target.value);
                      setDeleteError("");
                    }}
                    type="password"
                    inputMode="numeric"
                    autoFocus
                  />
                </label>
                <button type="submit">Confirm delete</button>
                <button type="button" onClick={cancelDelete}>Cancel</button>
                {deleteError ? <span className="note-delete-error">{deleteError}</span> : null}
              </form>
            ) : null}
          </article>
        )) : <div className="message-note-empty">No notes yet.</div>}
      </div>
    </section>
  );
}

function MessageNotesPanel({
  record,
  entry,
  onAddNote,
  onDeleteNote
}: {
  record: LogcodeRecord;
  entry: MessageNoteEntry;
  onAddNote: (messageId: string, text: string) => void;
  onDeleteNote: (messageId: string, noteId: string) => void;
}) {
  return (
    <EditableNotesPanel
      targetId={record.id}
      targetLabel={recordLabel(record)}
      entry={entry}
      builtInNotes={builtInLogcodeNotes[record.logcode] || []}
      ariaLabel="Message notes"
      onAddNote={onAddNote}
      onDeleteNote={onDeleteNote}
    />
  );
}

function FieldNotesPanel({
  field,
  entry,
  onAddNote,
  onDeleteNote
}: {
  field: FieldIndexEntry;
  entry: MessageNoteEntry;
  onAddNote: (fieldId: string, text: string) => void;
  onDeleteNote: (fieldId: string, noteId: string) => void;
}) {
  return (
    <EditableNotesPanel
      targetId={field.id}
      targetLabel={field.name}
      entry={entry}
      ariaLabel="Field notes"
      onAddNote={onAddNote}
      onDeleteNote={onDeleteNote}
    />
  );
}

function ObservedBadge({ observed }: { observed: boolean }) {
  return <span className={`observed-badge ${observed ? "is-observed" : "is-missing"}`}>{observed ? "Seen in 5g_0523_01" : "Not seen in 5g_0523_01"}</span>;
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
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          {events.map((eventItem) => (
            <tr key={eventItem.id} className={eventItem.observedInSample ? "" : "is-muted"}>
              <td className="event-code">{eventItem.id}</td>
              <td>{eventItem.condition}</td>
              <td>{eventItem.handoverRelation}</td>
              <td><ObservedBadge observed={eventItem.observedInSample} /></td>
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

      <section className="event-config-card">
        <h2>Sample Observation</h2>
        <p>{nrMeasurementEvents.sampleObservation}</p>
        <p className="event-config-source">{nrMeasurementEvents.source}</p>
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
  return (
    <div className="measurement-relation">
      <div className="measurement-relation-title">Measurement log time relationship</div>
      <div className="measurement-relation-flow">
        {measurementRelationNodes.map((node, index) => (
          <div key={node.code} className="measurement-relation-step">
            <button className="measurement-node" type="button" onClick={() => onOpenLogcode(node.code, node.fields)}>
              <span className="measurement-node-code">{node.code}</span>
              <span className="measurement-node-label">{node.label}</span>
              <span className="measurement-node-text">{node.text}</span>
            </button>
            {index < measurementRelationNodes.length - 1 ? <span className="measurement-arrow">-&gt;</span> : null}
          </div>
        ))}
      </div>
      <div className="measurement-relation-note">
        Logical order, not a strict one-time sequence. These logs can repeat and interleave across frequencies, PCIs, and SSB beams before the RRC MeasurementReport.
      </div>
    </div>
  );
}

function StepPopup({ step, onClose, onOpenLogcode }: { step: StepInfo; onClose: () => void; onOpenLogcode: (logcode: string, terms: string[]) => void }) {
  return (
    <div className="popup open react-popup" role="dialog">
      <button className="popup-close" type="button" aria-label="Close popup" onClick={onClose}>x</button>
      <h2 className="popup-title">{step.title}</h2>
      <div className="popup-row"><b>Layer:</b> {step.layer}</div>
      {step.decide ? <div className="popup-row"><b>How to decide from log:</b> {step.decide}</div> : null}
      {step.logcode ? (
        <div className="popup-row">
          <b>Logcode + key fields:</b>{" "}
          <PopupText value={step.logcode} logcodes={step.logcodes} fields={step.fields} onOpenLogcode={onOpenLogcode} />
        </div>
      ) : null}
      {step.title.startsWith("2.") ? <MeasurementRelationDiagram onOpenLogcode={onOpenLogcode} /> : null}
      {step.confirm ? (
        <div className="popup-row">
          <b>HO confirmed by:</b>{" "}
          <PopupText value={step.confirm} logcodes={step.confirmLogcodes} fields={step.confirmFields} onOpenLogcode={onOpenLogcode} />
        </div>
      ) : null}
      {step.identity ? (
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
  message: { x: number; y: number; small?: boolean };
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
    divider: { x1: 784, y1: 410, x2: 784, y2: 454 },
    tag: { x: 742, y: 440 },
    message: { x: 808, y: 441 }
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
    tail: "M 720 792 L 760 792",
    body: "M 760 770 L 1342 770 L 1390 792 L 1342 814 L 760 814 Z",
    divider: { x1: 844, y1: 770, x2: 844, y2: 814 },
    tag: { x: 802, y: 800, text: "ML1/MAC" },
    message: { x: 868, y: 801 }
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
    tail: "M 720 1010 L 840 1010",
    body: "M 840 988 L 1832 988 L 1880 1010 L 1832 1032 L 840 1032 Z",
    divider: { x1: 924, y1: 988, x2: 924, y2: 1032 },
    tag: { x: 882, y: 1018 },
    message: { x: 948, y: 1019 }
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
      <text x={shape.message.x} y={shape.message.y} className={`msg ${shape.message.small ? "small" : ""}`}>{step.title}</text>
    </g>
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

function FieldIndexView({ onOpenLogcode }: { onOpenLogcode: (record: LogcodeRef, terms?: string[]) => void }) {
  const [fields, setFields] = useState<FieldIndexEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [selectedField, setSelectedField] = useState<FieldIndexEntry | null>(null);
  const [query, setQuery] = useState("");
  const [fieldNotes, setFieldNotes] = useState<MessageNotesStore>(loadFieldNotes);
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(fieldNotesStorageKey, JSON.stringify(fieldNotes));
  }, [fieldNotes]);

  function addFieldNote(fieldId: string, text: string) {
    setFieldNotes((current) => {
      const entry = current[fieldId] || emptyMessageNoteEntry();
      return {
        ...current,
        [fieldId]: {
          ...entry,
          notes: [
            ...entry.notes,
            {
              id: createNoteId(),
              author: "",
              text,
              createdAt: new Date().toISOString()
            }
          ],
          updatedAt: new Date().toISOString()
        }
      };
    });
  }

  function deleteFieldNote(fieldId: string, noteId: string) {
    setFieldNotes((current) => {
      const entry = current[fieldId];
      if (!entry) return current;
      return {
        ...current,
        [fieldId]: {
          ...entry,
          notes: entry.notes.filter((note) => note.id !== noteId),
          updatedAt: new Date().toISOString()
        }
      };
    });
  }

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
          onAddNote={addFieldNote}
          onDeleteNote={deleteFieldNote}
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
  const [messageNotes, setMessageNotes] = useState<MessageNotesStore>(loadMessageNotes);
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
    window.localStorage.setItem(messageNotesStorageKey, JSON.stringify(messageNotes));
  }, [messageNotes]);

  async function openDetail(record: LogcodeRef, terms: string[] = []) {
    setSelectedTerms(terms);
    setView("message");
    setDetailRecord(null);
    setDetailError("");
    setDetailStatus("loading");

    try {
      const fullRecord = await loadLogcodeRecord(record);
      setDetailRecord(fullRecord);
      setDetailStatus("ready");
    } catch (error) {
      setDetailStatus("error");
      setDetailError(error instanceof Error ? error.message : "Unable to load logcode detail.");
    }
  }

  function closeDetail() {
    setDetailRecord(null);
    setDetailStatus("idle");
    setDetailError("");
    setSelectedTerms([]);
  }

  function resetMessageList() {
    closeDetail();
    setSelectedMessageLayer(null);
    setSelectedLogcodeGroup(null);
    setMessageQuery("");
  }

  function openLogcodeGroup(group: MessageLogcodeGroup) {
    closeDetail();
    if (group.records.length === 1) {
      void openDetail(group.records[0]);
      return;
    }
    setSelectedLogcodeGroup(group.logcode);
    setMessageQuery("");
  }

  function closeLogcodeGroup() {
    closeDetail();
    setSelectedLogcodeGroup(null);
    setMessageQuery("");
  }

  function addMessageNote(messageId: string, text: string) {
    setMessageNotes((current) => {
      const entry = current[messageId] || emptyMessageNoteEntry();
      return {
        ...current,
        [messageId]: {
          ...entry,
          notes: [
            ...entry.notes,
            {
              id: createNoteId(),
              author: "",
              text,
              createdAt: new Date().toISOString()
            }
          ],
          updatedAt: new Date().toISOString()
        }
      };
    });
  }

  function deleteMessageNote(messageId: string, noteId: string) {
    setMessageNotes((current) => {
      const entry = current[messageId];
      if (!entry) return current;
      return {
        ...current,
        [messageId]: {
          ...entry,
          notes: entry.notes.filter((note) => note.id !== noteId),
          updatedAt: new Date().toISOString()
        }
      };
    });
  }

  return (
    <main className="app-shell">
      {view === "home" ? (
        <section className="home-screen">
          <button type="button" onClick={() => setView("event")}>Event</button>
          <button type="button" onClick={() => { resetMessageList(); setView("message"); }}>Message</button>
          <button type="button" onClick={() => { closeDetail(); setView("field"); }}>Field</button>
        </section>
      ) : null}

      {view === "event" ? (
        <section className="explorer-screen">
          <TopBar title="Event" onHome={() => setView("home")} />
          <div className="explorer-grid">
            <section className="explorer-column">
              <h2 className="column-title">Event</h2>
              <div className="column-list">
                {eventIndex.map((eventItem) => (
                  <button key={eventItem.id} className="column-button" type="button" onClick={() => setView(eventItem.view as ViewName)}>
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
          <TopBar title="Message" onHome={() => { resetMessageList(); setView("home"); }} />
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
                  <button className="field-index-back" type="button" onClick={closeDetail}>{selectedGroup ? "Back to variants" : selectedMessageLayer ? "Back to logcodes" : "All layers"}</button>
                  {detailStatus === "loading" ? <div className="status-panel">Loading message detail...</div> : null}
                  {detailStatus === "error" ? <div className="status-panel is-error">{detailError}</div> : null}
                  {detailRecord ? (
                    <MessageNotesPanel
                      record={detailRecord}
                      entry={messageNotes[detailRecord.id] || emptyMessageNoteEntry()}
                      onAddNote={addMessageNote}
                      onDeleteNote={deleteMessageNote}
                    />
                  ) : null}
                  {detailRecord ? <LogcodeDetail record={detailRecord} selectedTerms={selectedTerms} /> : null}
                </div>
              ) : selectedGroup ? (
                <div className="column-list">
                  <div className="message-layer-bar">
                    <button className="field-index-back" type="button" onClick={closeLogcodeGroup}>Back to logcodes</button>
                    <div className="selected-layer-title">{selectedGroup.title}</div>
                  </div>
                  <label className="search-box">
                    <span>Search variant</span>
                    <input value={messageQuery} onChange={(event) => setMessageQuery(event.target.value)} placeholder="variant or message name" />
                  </label>
                  <div className="result-count">{visibleGroupVariants.length} / {selectedGroup.records.length} variants</div>
                  {visibleGroupVariants.map((record) => (
                    <button key={record.id} className="column-button" type="button" onClick={() => openDetail(record)}>
                      <span>{recordLabel(record)}</span>
                      {noteCountLabel(messageNotes[record.id]) ? <span className="message-note-badge">{noteCountLabel(messageNotes[record.id])}</span> : null}
                    </button>
                  ))}
                </div>
              ) : selectedMessageLayer ? (
                <div className="column-list">
                  <div className="message-layer-bar">
                    <button className="field-index-back" type="button" onClick={resetMessageList}>All layers</button>
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
                    <button key={layer} className="layer-button" type="button" onClick={() => { setSelectedMessageLayer(layer); setMessageQuery(""); }}>
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
          <TopBar title="Field" onHome={() => { closeDetail(); setView("home"); }} />
          <div className="explorer-grid">
            <section className="explorer-column">
              <h2 className="column-title">Field</h2>
              <FieldIndexView onOpenLogcode={openDetail} />
            </section>
          </div>
        </section>
      ) : null}

      {view === "handover" ? (
        <section className="viewer-screen">
          <TopBar title="Handover" onHome={() => setView("event")} backLabel="Event / Message" />
          <HandoverDiagram onOpenLogcode={openDetail} />
        </section>
      ) : null}

      {view === "nrMeasurementEvents" ? (
        <section className="event-config-screen">
          <TopBar title="NR Measurement Events" onHome={() => setView("event")} backLabel="Event / Message" />
          <NRMeasurementEventsView onOpenLogcode={openDetail} />
        </section>
      ) : null}

      {view === "registration" ? (
        <section className="viewer-screen">
          <TopBar title="UE Registration" onHome={() => setView("event")} backLabel="Event / Message" />
          <div className="placeholder-panel">UE Registration</div>
        </section>
      ) : null}
    </main>
  );
}

function TopBar({ title, onHome, backLabel = "Home" }: { title: string; onHome: () => void; backLabel?: string }) {
  return (
    <div className="viewer-bar">
      <button className="back-button" type="button" onClick={onHome}>{backLabel}</button>
      <div className="view-title">{title}</div>
    </div>
  );
}
