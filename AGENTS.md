# kazumi_to_json

Kazumi rule converter: Base64 ↔ JSON. Single-page Next.js App Router app with Chinese UI.

## Commands

Package manager is **Bun** (bun.lock). Do not use npm/yarn/pnpm.

```
bun dev          # dev server at localhost:3000
bun build        # production build (runs next build)
bun lint         # biome check (no auto-fix)
bun check        # biome check --write (auto-fix)
bun format       # biome format --write
```

No test framework is configured. No `typecheck` script — run `npx tsc --noEmit` directly if needed.

## Linting & Formatting

Uses **Biome** (not ESLint/Prettier). Key settings from `biome.json`:
- **Tabs** for indentation
- **Double quotes** in JS/TS
- CSS linting and formatting disabled
- Import organization enabled

Run `bun check` before committing to auto-fix lint issues.

## Architecture

```
src/
  app/
    layout.tsx     # Root layout — dark mode hardcoded, zh-CN lang, Geist Mono font
    page.tsx       # Single "use client" page — the entire UI
    globals.css    # Tailwind v4 + shadcn + custom utility classes (.panel, .btn-primary, .glow-border, .noise-bg)
  components/ui/   # shadcn components (button, card, textarea, sonner)
  lib/
    kazumi.ts      # Core logic: decodeKazumi() and encodeKazumi()
    utils.ts       # cn() helper (clsx + tailwind-merge)
```

## Key Facts

- **Next.js 16** — has breaking changes from training data. Check `node_modules/next/dist/docs/` before writing Next-specific code.
- **Dark mode only** — `<html>` has `class="dark"` hardcoded. No light mode toggle.
- **Tailwind CSS v4** — uses `@import "tailwindcss"` syntax, not `@tailwind` directives. PostCSS plugin is `@tailwindcss/postcss`.
- **shadcn v4** with `base-nova` style. Config in `components.json`. Components live in `src/components/ui/`.
- **No API routes** — all logic runs client-side in the browser using `atob`/`btoa` and `TextEncoder`/`TextDecoder`.
- **Path alias**: `@/*` maps to `./src/*`.
- **UI language**: Chinese (zh-CN). All user-facing strings are in Chinese.
- **No env files** needed — app is fully client-side with no secrets.
