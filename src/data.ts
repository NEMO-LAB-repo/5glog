import eventIndexRaw from "../data/events/index.json";
import handoverRaw from "../data/events/handover.json";
import nrMeasurementEventsRaw from "../data/events/nr_measurement_events.json";
import logcodeBundleRaw from "../data/generated/logcode_bundle.json";
import logcodeIndexRaw from "../data/generated/logcode_index.json";
import repositoryFieldNotesRaw from "../data/notes/field_notes.json";
import repositoryMessageNotesRaw from "../data/notes/message_notes.json";
import type { EventDefinition, EventIndexItem, FieldIndexEntry, LogcodeRecord, LogcodeRef, LogcodeSummary, MeasurementEventDefinition } from "./types";

export const eventIndex = eventIndexRaw as EventIndexItem[];
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

type JsonModule = { default: LogcodeRecord };
type FieldIndexModule = { default: FieldIndexEntry[] };

const logcodeModules = import.meta.glob<JsonModule>("../data/logcodes/*.json");
const logcodeCache = new Map<string, Promise<LogcodeRecord>>();
let fieldIndexCache: Promise<FieldIndexEntry[]> | null = null;

export async function loadLogcodeRecord(recordRef: LogcodeRef): Promise<LogcodeRecord> {
  const summary = logcodeById.get(recordRef.id);
  if (!summary) throw new Error(`Unknown logcode id: ${recordRef.id}`);

  if (!logcodeCache.has(summary.id)) {
    const bundledRecord = bundledLogcodeById.get(summary.id);
    if (bundledRecord) {
      logcodeCache.set(summary.id, Promise.resolve(bundledRecord));
      return logcodeCache.get(summary.id)!;
    }

    const modulePath = `../data/logcodes/${summary.dataFile || `${summary.logcode}.json`}`;
    const loader = logcodeModules[modulePath];
    if (!loader) throw new Error(`Missing logcode data file: ${modulePath}`);
    logcodeCache.set(summary.id, loader().then((module) => module.default));
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
