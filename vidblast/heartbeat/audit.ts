export const heartbeatAudit = async () => {
  // Very lightweight audit: check presence of key files and env
  const issues: string[] = [];
  // Basic checks (pseudo)
  try { require.resolve(./../../vidblast/api/blast.ts); } catch {
    issues.push(Missing
