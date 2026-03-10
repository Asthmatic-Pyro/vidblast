import { heartbeatAudit } from "./audit";

export const runHeartbeat = async () => {
  const report = await heartbeatAudit();
  const ok = report.ok;
  const summary = ok ? "Heartbeat OK" : `Issues: ${report.issues?.join(", ") ?? "none"}`;
  const fs = require("fs");
  const path = require("path");
  const p = path.resolve(__dirname, "../../HEARTBEAT.md");
  const content = `# Heartbeat Report\n\n${summary}\n` + (report.issues?.length ? `\nProblems:\n- ${report.issues.join("\n- ")}` : "");
  fs.writeFileSync(p, content);
  return { ok, report, path: p };
};
