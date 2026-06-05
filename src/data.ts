import eventIndexRaw from "../data/events/index.json";
import handoverRaw from "../data/events/handover.json";
import nrMeasurementEventsRaw from "../data/events/nr_measurement_events.json";
import eventToLogcodesRaw from "../data/generated/event_to_logcodes.json";
import logcodeBundleRaw from "../data/generated/logcode_bundle.json";
import logcodeIndexRaw from "../data/generated/logcode_index.json";
import fieldOverviewsRaw from "../data/field_overviews.json";
import messageOverviewsRaw from "../data/message_overviews.json";
import repositoryFieldNotesRaw from "../data/notes/field_notes.json";
import repositoryMessageNotesRaw from "../data/notes/message_notes.json";
import type { EventDefinition, EventIndexItem, EventLogcodeLink, FieldIndexEntry, LogcodeRecord, LogcodeRef, LogcodeSummary, MeasurementEventDefinition, OverviewContent } from "./types";

export const eventIndex = eventIndexRaw as EventIndexItem[];

// Repository-committed default overview content for field pages, keyed by field
// id. Authored by hand in data/field_overviews.json. Keys starting with "_"
// (e.g. the _comment / _example documentation) are not real fields.
const fieldOverviews = fieldOverviewsRaw as Record<string, OverviewContent>;

// Returns the shared default overview for a field id, or an empty object when
// none is authored. A per-box local edit (localStorage) overrides these.
export function fieldOverviewDefaults(fieldId: string): OverviewContent {
  if (fieldId.startsWith("_")) return {};
  return fieldOverviews[fieldId] || {};
}

// Repository-committed default overview content for message pages, keyed by
// message id. Authored by hand in data/message_overviews.json and merged onto
// the loaded record (see loadLogcodeRecord), so it survives index regeneration.
const messageOverviews = messageOverviewsRaw as Record<string, OverviewContent>;
const eventToLogcodes = eventToLogcodesRaw as { event_id: string; title: string; logcodes: string[] }[];

// Data-driven: an event references a logcode only when it appears in that
// event's structured `*logcodes` arrays (see scripts/build-indexes.js). Returns
// the events that reference the given logcode, joined with the event index so
// callers get the display title and the in-app view to navigate to.
export function eventsReferencingLogcode(logcode: string): EventLogcodeLink[] {
  const target = logcode.toLowerCase();
  return eventToLogcodes
    .filter((entry) => entry.logcodes.some((code) => code.toLowerCase() === target))
    .map((entry) => {
      const indexItem = eventIndex.find((item) => item.id === entry.event_id);
      return {
        id: entry.event_id,
        title: indexItem?.title || entry.title || entry.event_id,
        view: indexItem?.view
      };
    });
}
export const handoverEvent = handoverRaw as EventDefinition;
export const nrMeasurementEvents = nrMeasurementEventsRaw as MeasurementEventDefinition;
export const logcodeRecords = logcodeIndexRaw as LogcodeSummary[];
export const repositoryMessageNotes = repositoryMessageNotesRaw as unknown;
export const repositoryFieldNotes = repositoryFieldNotesRaw as unknown;
const logcodeBundle = logcodeBundleRaw as LogcodeRecord[];

export const logcodeById = new Map(logcodeRecords.map((record) => [record.id, record]));
const bundledLogcodeById = new Map(logcodeBundle.map((record) => [record.id, record]));
export const logcodeRecordsByCode = new Map<string, LogcodeSummary[]>();
logcodeRecords.forEach((record) => {
  const key = record.logcode.toLowerCase();
  const records = logcodeRecordsByCode.get(key) || [];
  records.push(record);
  logcodeRecordsByCode.set(key, records);
});
export const logcodeByCode = new Map([...logcodeRecordsByCode.entries()].map(([code, records]) => [code, records[0]]));

// Data-driven field→event annotation. For a logcode, find the event steps that
// reference it (via the step's structured logcode arrays) and return the field
// names those same steps list, each tagged with the event title. Callers match
// these field names against the logcode's own structure to mark them.
const eventStepLogcodeFieldPairs: { code: string; field: string; event: string }[] = (() => {
  const pairs: { code: string; field: string; event: string }[] = [];
  const eventTitleById = new Map(eventIndex.map((item) => [item.id, item.title]));

  function pushFromArrays(codes: unknown, fields: unknown, eventTitle: string) {
    if (!Array.isArray(codes) || !Array.isArray(fields)) return;
    const cleanCodes = codes.filter((c): c is string => typeof c === "string" && /^0x[0-9a-fA-F]+$/.test(c.trim()));
    const cleanFields = fields.filter((f): f is string => typeof f === "string" && Boolean(f.trim()));
    cleanCodes.forEach((code) => {
      cleanFields.forEach((field) => pairs.push({ code: code.toLowerCase(), field, event: eventTitle }));
    });
  }

  const handoverTitle = eventTitleById.get("handover") || "Handover";
  Object.values(handoverEvent.steps || {}).forEach((step) => {
    pushFromArrays(step.logcodes, step.fields, handoverTitle);
    pushFromArrays(step.identityLogcodes, step.identityFields, handoverTitle);
    pushFromArrays(step.confirmLogcodes, step.confirmFields, handoverTitle);
    pushFromArrays(step.sequenceLogcodes, step.sequenceFields, handoverTitle);
    pushFromArrays(step.noteLogcodes, step.noteFields, handoverTitle);
    (step.evidence || []).forEach((item) => pushFromArrays(item.logcodes, item.fields, handoverTitle));
  });

  const measurementTitle = eventTitleById.get("nr_measurement_events") || "NR Measurement Events";
  const measEvidence = nrMeasurementEvents.logEvidence;
  if (measEvidence?.logcode) {
    pushFromArrays([measEvidence.logcode], measEvidence.fields, measurementTitle);
  }

  return pairs;
})();

// Returns a map of field-name -> event-title for fields that event data ties to
// the given logcode. Empty when no event step references the logcode.
export function fieldEventsForLogcode(logcode: string): Map<string, string> {
  const target = logcode.toLowerCase();
  const map = new Map<string, string>();
  eventStepLogcodeFieldPairs
    .filter((pair) => pair.code === target)
    .forEach((pair) => {
      if (!map.has(pair.field)) map.set(pair.field, pair.event);
    });
  return map;
}

type JsonModule = { default: LogcodeRecord };
type FieldIndexModule = { default: FieldIndexEntry[] };

const logcodeModules = import.meta.glob<JsonModule>("../data/logcodes/*.json");
const logcodeCache = new Map<string, Promise<LogcodeRecord>>();
let fieldIndexCache: Promise<FieldIndexEntry[]> | null = null;

// Merge the hand-authored message overview (if any) onto a generated record.
// Kept non-destructive: a record that already carries its own `overview` wins,
// otherwise the data/message_overviews.json entry is attached.
function withMessageOverview(record: LogcodeRecord): LogcodeRecord {
  const overview = record.overview ?? messageOverviews[record.id];
  return overview ? { ...record, overview } : record;
}

export async function loadLogcodeRecord(recordRef: LogcodeRef): Promise<LogcodeRecord> {
  const summary = logcodeById.get(recordRef.id);
  if (!summary) throw new Error(`Unknown logcode id: ${recordRef.id}`);

  if (!logcodeCache.has(summary.id)) {
    const bundledRecord = bundledLogcodeById.get(summary.id);
    if (bundledRecord) {
      logcodeCache.set(summary.id, Promise.resolve(withMessageOverview(bundledRecord)));
      return logcodeCache.get(summary.id)!;
    }

    const modulePath = `../data/logcodes/${summary.dataFile || `${summary.logcode}.json`}`;
    const loader = logcodeModules[modulePath];
    if (!loader) throw new Error(`Missing logcode data file: ${modulePath}`);
    logcodeCache.set(summary.id, loader().then((module) => withMessageOverview(module.default)));
  }

  return logcodeCache.get(summary.id)!;
}

export async function loadFieldIndex(): Promise<FieldIndexEntry[]> {
  if (!fieldIndexCache) {
    fieldIndexCache = import("../data/generated/field_index.json").then((module: FieldIndexModule) => module.default);
  }
  return fieldIndexCache;
}

export function normalizeForMatch(value: string): string {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function recordLabel(record: Pick<LogcodeSummary, "logcode" | "name">): string {
  return record.logcode ? `${record.logcode} ${record.name}` : record.name;
}

export function findLogcodeRecord(logcode: string, terms: string[] = []): LogcodeSummary | undefined {
  const candidates = logcodeRecordsByCode.get(logcode.toLowerCase()) || [];
  if (candidates.length <= 1) return candidates[0];

  const normalizedTerms = terms.map(normalizeForMatch).filter(Boolean);
  for (const term of normalizedTerms) {
    const match = candidates.find((record) => {
      const title = normalizeForMatch(record.title);
      const name = normalizeForMatch(record.name);
      return title.includes(term) || name.includes(term) || term.includes(name);
    });
    if (match) return match;
  }

  const handoverPriority = [
    "eventnr5grrcho", 
    "eventnr5grrcnewcell", 
    "eventnr5grrculmsgmeasreport",
    "eventnr5grrculmsg"
  ];
  for (const priority of handoverPriority) {
    const match = candidates.find((record) => normalizeForMatch(record.name).includes(priority));
    if (match) return match;
  }

  return candidates[0];
}

export function unique<T>(values: T[]): T[] {
  return [...new Set(values.filter(Boolean))];
}
