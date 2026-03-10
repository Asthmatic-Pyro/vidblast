export const heartbeatAudit = async () => {
  const issues: string[] = [];
  try { require.resolve("../api/blast.ts"); } catch { issues.push("Missing api/blast.ts"); }
  try { require.resolve("./../ffmpeg/wrapper.ts"); } catch { issues.push("Missing ffmpeg wrapper.ts"); }
  return { ok: issues.length === 0, issues };
};
