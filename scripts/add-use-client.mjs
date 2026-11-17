// Prepends "use client" to built bundles so Next.js App Router treats the library as client code.
import { readFileSync, writeFileSync } from "node:fs";

for (const file of ["dist/index.js", "dist/index.cjs"]) {
  try {
    const src = readFileSync(file, "utf8");
    if (!src.startsWith('"use client"')) writeFileSync(file, `"use client";\n${src}`);
  } catch {
    // Bundle format not emitted (e.g. ESM-only build). Nothing to patch.
  }
}
