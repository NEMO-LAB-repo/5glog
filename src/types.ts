export type StepInfo = {
  title: string;
  layer: string;
  decide?: string;
  logcode?: string;
  logcodes?: string[];
  fields?: string[];
  confirm?: string;
  confirmLogcodes?: string[];
  confirmFields?: string[];
  identity?: string;
  identityLogcodes?: string[];
  identityFields?: string[];
};

export type EventDefinition = {
  id: string;
  title: string;
  description?: string;
  steps?: Record<string, StepInfo>;
};

export type EventIndexItem = {
  id: string;
  title: string;
  view: string;
  dataFile?: string;
  status?: string;
};

export type FieldTreeRow = {
  pdu_type: number;
  message_type: string;
  records: number;
  unique_field_paths: number;
  summary: string;
  tree: string;
};

export type LogcodeRecord = {
  id: string;
  logcode: string;
  name: string;
  title: string;
  category: string;
  dataFile?: string;
  detail: unknown;
  fieldTreeTable?: FieldTreeRow[];
};

export type LogcodeSummary = {
  id: string;
  logcode: string;
  name: string;
  title: string;
  category: string;
  dataFile?: string;
  hasFieldTreeTable: boolean;
};

export type LogcodeRef = LogcodeSummary | FieldIndexRecord | LogcodeRecord;

export type MessageNote = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export type MessageNoteEntry = {
  description: string;
  notes: MessageNote[];
  updatedAt?: string;
};

export type MessageNotesStore = Record<string, MessageNoteEntry>;

export type FieldIndexRecord = {
  id: string;
  logcode: string;
  title: string;
  name: string;
  category: string;
  dataFile?: string;
  paths?: string[];
  pathCount?: number;
};

export type FieldIndexEntry = {
  id: string;
  name: string;
  records: FieldIndexRecord[];
};

export type ViewName = "home" | "event" | "message" | "field" | "handover" | "registration";
