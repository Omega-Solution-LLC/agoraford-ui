# Contributing

How to change `@agoraford/ui` safely. The library is shared by every app in the suite, so a change to a token or a primitive lands everywhere on the next upgrade.

- [Ground rules](#ground-rules)
- [Adding a component](#adding-a-component)
- [Changing a component](#changing-a-component)
- [Changing tokens](#changing-tokens)
- [Changelog](#changelog)
- [Verification](#verification)
- [Releasing and pinning](#releasing-and-pinning)
- [Known gaps](#known-gaps)

---

## Ground rules

These come from `AGENTS.md` and the suite's `CLAUDE.md`. They apply to every change.

1. **UI only.** No business logic, no API calls, no state that belongs to an app, no router imports.
2. **Strings are props.** Every visible or accessible string comes in as a prop. Components never hard-code English.
3. **Tokens only.** No raw hex, no arbitrary Tailwind values, no radii outside the four-value scale, no font sizes outside the seven type roles.
4. **Light and dark.** Every new part must work with the `.dark` class.
5. **Radix for behavior.** Overlays, menus, tabs and selects are built on Radix primitives. Styling follows shadcn/ui patterns with `class-variance-authority`, `clsx` and `tailwind-merge`.
6. **No Ant Design.** Never add `antd` or `@ant-design/*`.
7. **Named exports only.** New public parts are exported from `src/index.ts`. No default exports.
8. **Peer dependencies stay peer.** Never bundle `react` or `react-dom`.
9. **Do not guess.** Ambiguity goes to the consuming app's `MIGRATION.md`, not into a guessed default.

---

## Adding a component

A component is worth adding when two or more apps need the same markup. A local copy in one app is fine until a second app needs it.

1. **Decide the layer.**
   - *Primitive*: one DOM element or one Radix wrapper (`src/primitives`).
   - *Pattern*: composes primitives into an app-level building block (`src/patterns`).
   - *Layout*: frames a whole page (`src/layouts`).
2. **Write typed props.** Use an exported `interface XProps`. Keep prop names consistent with the rest of the library (`label` for accessible names, `onValueChange` for controlled selects, `onOpenChange` for overlays, `className` for overrides).
3. **Accept links through a prop**, for example `renderLink`, never through a router import.
4. **Use semantic tokens** (`bg-surface`, `text-body`, `rounded-control`).
5. **Export it** from `src/index.ts` in the right group, with its prop types.
6. **Document it** in `docs/COMPONENTS.md` (props table and when to use it) and, if it is a recipe, in `docs/PATTERNS.md`.
7. **Add a changelog entry** (see [Changelog](#changelog)).
8. **Check it in both themes and at 375px width** before you call it done.

When a component reaches a new app, record any difference in that app's `MIGRATION.md`.

---

## Changing a component

- Fixing a bug or matching live MojaBoard more closely is a **patch** or **minor**, with a changelog line that says what changed visually.
- Renaming or removing a prop, changing a default that alters the look of existing screens, or removing an export is a **major** change. It needs a migration note in the changelog that says exactly what each app must change.
- Adding an optional prop is a **minor**.

Prefer adding a variant or an optional prop over changing an existing default. Apps upgrade one at a time, and defaults change every screen at once.

---

## Changing tokens

Tokens live in `src/tokens/tokens.css`. A value changed there reaches every app on upgrade.

1. Change the value in `tokens.css`.
2. Change the same value in `src/tokens/design-manifest.json` if it is a type role, a radius or a control height. `scripts/check-manifest.mjs` fails when they disagree.
3. Check light and dark.
4. Check the screens that use it. A token change is visible everywhere, so the changelog must name the affected surfaces.
5. Never copy token values into an app.

Adding a new token: name it `--ui-<group>-<name>`, add the Tailwind mapping in `tailwind-preset.js`, and document it in [TOKENS.md](TOKENS.md).

---

## Changelog

`CHANGELOG.md` is the record of every release. Every change gets an entry, even documentation-only ones.

Format:

```markdown
## 0.8.0

- New: `Component` with one line on what it does.
- Changed: what changed visually or in behavior, and where.
- Breaking: what the app must change. Link the migration step.
```

Put new entries under a heading for the version they will ship in. Use `Unreleased` while the version is not decided.

---

## Verification

Run the full gate before you commit or tag:

```bash
NODE_OPTIONS="--max-old-space-size=2048" pnpm run check
```

`check` runs, in order:

1. `typecheck`: `tsc --noEmit`
2. `check-manifest.mjs`: `tokens.css` matches `design-manifest.json`
3. `build`: `tsup` writes `dist/` (ESM, types, source map)
4. `verify-dist.mjs`: the built output contains the expected exports

Do not run `build` while an app that consumes the library is running its dev server; it clears the output and breaks hot reload.

For a visual change, check the screen in both themes and at 375px, 768px and desktop widths. Attach the evidence to the pull request. Do not rely on code reading alone for visual changes.

---

## Releasing and pinning

Apps pin an exact tag. A branch is never pinned. Local `file:` and `link:` paths are never used in a committed `package.json` or lockfile.

Release steps:

1. Finish the change on a branch. Update `CHANGELOG.md` and the `version` in `package.json` to match the tag.
2. Run `pnpm run check` and make sure it passes.
3. Commit with a clear message. Do not add AI tool attribution lines.
4. Merge to `main`.
5. Create the annotated tag `vX.Y.Z` on the merge commit and push it. Creating or pushing a tag needs the owner's approval.
6. Confirm the tag contains every export the app imports:

   ```bash
   git ls-remote --tags https://github.com/Omega-Solution-LLC/agoraford-ui.git
   git ls-tree vX.Y.Z dist/
   ```

7. Only then update the app's `package.json` to the new tag and reinstall.

Never pin a tag that is missing components, and never pin a tag while library work is still uncommitted.

---

## Known gaps

These are known and tracked. Fixing one is welcome; it is not a blocker for a normal change.

- **No Storybook yet.** `AGENTS.md` asks for a story per component covering all states in both themes. Until Storybook exists, check the states in a consuming app and say so in the pull request.
- **No unit or visual tests in the library.** `pnpm run check` is the gate.
- **Tailwind v4 apps cannot consume the preset.** The preset is for Tailwind v3. A v4 entry point is needed.
- **Dark-mode values and some status colors are unverified** against the live UI (marked in `tokens.css`).
- **Package is private and git-only.** An npm release is planned, not scheduled.
- **`shadow-card` is undefined.** `AppShell` and `PageContainer` use `shadow-card` (`src/layouts/Shell.tsx`), but the preset defines no such shadow, so the class has no effect. Define it in `tailwind-preset.js` or remove it, in its own change.
