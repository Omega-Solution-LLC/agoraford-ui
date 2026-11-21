import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Paths are relative to src/. Vitest runs from the package root. */
const read = (path: string) => readFileSync(join(process.cwd(), "src", path), "utf8");

const tokensCss = read("tokens/tokens.css");
const v4Css = read("tokens/tailwind-v4.css");
const preset = read("tokens/tailwind-preset.js");

/** Every --ui-* variable declared in tokens.css. */
const declared = new Set([...tokensCss.matchAll(/(--ui-[a-z0-9-]+):/g)].map((m) => m[1]));

/** Every var(--ui-*) referenced from a file. */
const referenced = (source: string) => new Set([...source.matchAll(/var\((--ui-[a-z0-9-]+)\)/g)].map((m) => m[1]));

describe("design tokens", () => {
  it("every var(--ui-*) used by the Tailwind v3 preset is declared in tokens.css", () => {
    const missing = [...referenced(preset)].filter((name) => !declared.has(name));
    expect(missing).toEqual([]);
  });

  it("every var(--ui-*) used by the Tailwind v4 theme is declared in tokens.css", () => {
    const missing = [...referenced(v4Css)].filter((name) => !declared.has(name));
    expect(missing).toEqual([]);
  });

  it("v3 preset and v4 theme map the same color tokens", () => {
    const pairs = [...v4Css.matchAll(/--color-([a-z-]+): rgb\(var\((--ui-[a-z-]+)\)\)/g)];
    expect(pairs.length).toBeGreaterThan(15);
    for (const [, , token] of pairs) {
      const name = token.replace("--ui-", "");
      expect(preset.includes(`rgb("${name}")`), `v3 preset is missing ${name}`).toBe(true);
    }
  });

  it("the card shadow token is defined in both themes", () => {
    expect(tokensCss).toMatch(/:root \{[\s\S]*--ui-shadow-card:/);
    expect(tokensCss).toMatch(/:root\.dark[\s\S]*--ui-shadow-card:/);
    expect(preset).toContain('card: "var(--ui-shadow-card)"');
    expect(v4Css).toContain("--shadow-card: var(--ui-shadow-card)");
  });

  it("the Tailwind v4 theme maps the same radius scale as the v3 preset", () => {
    for (const key of ["xs", "control", "card", "panel", "pill"]) {
      expect(v4Css).toContain(`--radius-${key}: var(--ui-radius-${key})`);
    }
  });
});

describe("source hygiene", () => {
  it("no raw hex colors in component source", () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(join(process.cwd(), "src", dir))) {
        const rel = dir === "." ? name : `${dir}/${name}`;
        if (statSync(join(process.cwd(), "src", rel)).isDirectory()) walk(rel);
        else if (/\.(tsx?|jsx?)$/.test(name) && !rel.startsWith("__tests__") && !rel.startsWith("tokens")) files.push(rel);
      }
    };
    walk(".");
    expect(files.length).toBeGreaterThan(20);
    const offenders = files.filter((file) => /#[0-9a-fA-F]{3,8}(?![0-9a-zA-Z])/.test(read(file)));
    expect(offenders).toEqual([]);
  });
});
