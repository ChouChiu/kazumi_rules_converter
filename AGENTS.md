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
    layout.tsx          # Root layout — Roboto + Roboto Mono fonts, ThemeRegistry wrapper
    page.tsx            # Single "use client" page — the entire UI
  components/
    ThemeRegistry.tsx   # MUI SSR provider for Next.js App Router
  lib/
    kazumi.ts           # Core logic: decodeKazumi() and encodeKazumi()
  theme.ts              # MD3 dark theme — tonal palette from seed color #4CAF50
```

## Key Facts

- **MUI v9** + **Emotion** — all styling via `sx` prop. No Tailwind, no shadcn, no CSS modules.
- **MUI v9 breaking change**: `Box`, `Stack`, `Typography` do NOT accept layout props directly (`textAlign`, `alignItems`, `color`, `letterSpacing`, etc.). All must go in `sx`. Example: `<Box sx={{ textAlign: "center" }}>` not `<Box textAlign="center">`.
- **MD3 tonal palette** — generated at build time from seed color `#4CAF50` (Kazumi green) using `@material/material-color-utilities`. Colors exported as `md3Colors` from `src/theme.ts`.
- **SSR**: `AppRouterCacheProvider` from `@mui/material-nextjs/v16-appRouter` (not v15) wraps the app in `ThemeRegistry.tsx`.
- **Dark mode only** — no light mode toggle. `CssBaseline` sets dark background.
- **No API routes** — all logic runs client-side in the browser using `atob`/`btoa` and `TextEncoder`/`TextDecoder`.
- **Next.js 16** — has breaking changes from training data. Check `node_modules/next/dist/docs/` before writing Next-specific code.
- **Path alias**: `@/*` maps to `./src/*`.
- **UI language**: Chinese (zh-CN). All user-facing strings are in Chinese.
- **No env files** needed — app is fully client-side with no secrets.
- **Dependency install note**: `package.json` has `ignoreScripts` for `sharp` and `unrs-resolver`. If `bun install` fails on these, this is expected — they are excluded from post-install scripts.
