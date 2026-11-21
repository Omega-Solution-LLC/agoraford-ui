// Fails when tokens.css drifts from design-manifest.json (type sizes, radii, control heights).
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync("src/tokens/design-manifest.json", "utf8"));
const css = readFileSync("src/tokens/tokens.css", "utf8");
const problems = [];

const valueOf = (name) => {
  const m = css.match(new RegExp(`${name}:\\s*([^;]+);`));
  return m ? m[1].trim() : null;
};

for (const [role, spec] of Object.entries(manifest.typeRoles)) {
  const got = valueOf(spec.token);
  if (got !== spec.size) problems.push(`type ${role}: ${spec.token} is ${got}, manifest says ${spec.size}`);
}
for (const [key, px] of Object.entries(manifest.radius)) {
  const got = valueOf(`--ui-radius-${key}`);
  if (got !== px) problems.push(`radius ${key}: is ${got}, manifest says ${px}`);
}
for (const [key, px] of Object.entries(manifest.controlHeight)) {
  const got = valueOf(`--ui-control-${key}`);
  if (got !== px) problems.push(`control height ${key}: is ${got}, manifest says ${px}`);
}
for (const step of manifest.spacingSteps) {
  if (valueOf(`--ui-space-${step / 4}`) === null) problems.push(`spacing token --ui-space-${step / 4} missing`);
}

if (problems.length) {
  console.error(problems.map((p) => `FAIL ${p}`).join("\n"));
  process.exit(1);
}
console.log(`manifest ok: ${Object.keys(manifest.typeRoles).length} type roles, radii, control heights, spacing`);
