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
7. **Add tests and a story.** Render tests go in `src/__tests__`. Stories sit next to the component as `Name.stories.tsx`.
8. **Add a changelog entry** (see [Changelog](#changelog)).
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

1. `typecheck`: `tsc --noEmit` over `src`, including tests and stories
2. `test`: Vitest (`--maxWorkers=2`). Covers token parity between the v3 preset and the v4 theme, a raw-hex scan of component source, and render tests for core components
3. `check-manifest.mjs`: `tokens.css` matches `design-manifest.json`
4. `build`: `tsup` writes `dist/` (ESM, types, source map)
5. `verify-dist.mjs`: the built output contains the expected exports and the `"use client"` directive

When you add or change a story, also run `pnpm run build-storybook`. Storybook is not part of `check` because it is slower.

Do not run `build` while an app that consumes the library is running its dev server; it clears the output and breaks hot reload.

For a visual change, check the screen in both themes and at 375px, 768px and desktop widths. Attach the evidence to the pull request. Do not rely on code reading alone for visual changes.

---

## Releasing and pinning

Apps pin an exact tag. A branch is never pinned. Local `file:` and `link:` paths are never used in a committed `package.json` or lockfile.

Release steps:

1. Finish the change on a branch. Update `CHANGELOG.md` and the `version` in `package.json` to match the tag.
2. Run `pnpm run check` and make sure it passes. Then build dist from the committed sources only, so the tag matches `src/` (see the note below).
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

**dist is committed and must match the tag.** Build it from committed sources only. If you have uncommitted work in `src/` or `dist/`, stash it first. Otherwise the release ships work that is not in git history.

---

## Known gaps

These are known and tracked. Fixing one is welcome; none blocks a normal change.

- **Storybook covers the core only.** Stories exist for Button, Badge and StatusBadge, Field, Input and Select, Tabs and SegmentedControl, DataTable, EmptyState, ErrorState, PageHeader, StatCard, ConfirmDialog and AppShell. Every other primitive and pattern still needs a story covering its states in both themes.
- **Tests cover the core only.** The suite checks tokens, source hygiene, and render behavior for Button, IconButton, Field, badges, Breadcrumb, Tabs, SegmentedControl, DataTable, ConfirmDialog and AppShell. It does not test interaction for most patterns, and there is no visual regression test.
- **Layout values are still arbitrary Tailwind.** These are not design tokens yet, and a token needs a design decision: the Dialog gutter `w-[calc(100%-32px)]` (`primitives/Dialog.tsx`), the Sheet width `max-w-[85vw]` (`primitives/Sheet.tsx`), the settings grid `md:grid-cols-[220px_minmax(0,1fr)]` (`layouts/Shell.tsx`), and the sidebar sizes in `layouts/Sidebar.tsx`. State selectors such as `data-[state=checked]` are expected and are not in this list.
- **Dark-mode values and some status colors are unverified** against the live UI. They are marked in `tokens.css`, and `--ui-shadow-card` is marked the same way.
- **ESM only.** The build writes `dist/index.js` and types. No CommonJS build exists, so consumers must support ESM. Modern bundlers and Next.js do.
- **Package is private and git-only.** An npm release is planned, not scheduled.
