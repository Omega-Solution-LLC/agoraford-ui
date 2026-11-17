// Fails the check when dist is missing, lacks "use client", or misses a public export.
import { readFileSync } from "node:fs";

const required = ["IconButton", "TopbarSearch", "UserMenu", "SectionCard", "ProgressCard", "NoticeBanner", "Sidebar", "StatCard", "DataTable", "AppShell"];
const js = readFileSync("dist/index.js", "utf8");
const problems = [];
if (!js.startsWith('"use client"')) problems.push('dist/index.js does not start with "use client"');
for (const name of required) {
  if (!new RegExp(`\\b${name}\\b`).test(js)) problems.push(`missing export: ${name}`);
}
try {
  readFileSync("dist/index.d.ts", "utf8");
} catch {
  problems.push("dist/index.d.ts missing");
}
if (problems.length) {
  console.error(problems.map((p) => `FAIL ${p}`).join("\n"));
  process.exit(1);
}
console.log(`dist ok: ${required.length} key exports, client directive present`);
