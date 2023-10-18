export type LogEvent = {
  type: "LogLine";
  line: string[];
  rawLine: string;
};
