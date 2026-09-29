# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project structure

- `portafolio-roan/` — the Vue app; this is the only real code in the repo.
- `specs/` — spec-driven workflow files (see below).
- The README also mentions a `portafolio_argonza/` directory (original static HTML, kept as a design reference). It no longer exists in the working tree — don't look for it.

## Commands

Run from `portafolio-roan/`:

- `npm run dev` — Vite dev server
- `npm run build` — runs `type-check` and `build-only` (vue-tsc then vite build) together
- `npm run test:unit` — Vitest
- `npm run type-check` — `vue-tsc --build`
- `npm run lint` — `eslint . --fix` (flat config in `eslint.config.js`: `eslint-plugin-vue` essential rules + `@vue/eslint-config-typescript` recommended, Prettier conflicts disabled via `@vue/eslint-config-prettier`)
- `npm run format` — `prettier --write --experimental-cli src/`

Style tools: ESLint for code-quality rules, Prettier for formatting (`.prettierrc.json`: no semicolons, single quotes, printWidth 100). They don't conflict — ESLint's stylistic rules are turned off via `skip-formatting`.

## Stack

Vue 3 (`<script setup>`, TypeScript), Vue Router, Pinia (dependency present), Vite, Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first config — no `tailwind.config.js`; tokens live in `src/assets/main.css` under `@theme`), Vitest + @vue/test-utils + jsdom.

## Code style

- Tailwind utility classes only; no inline styles.
- Colors and font are `@theme` tokens in `src/assets/main.css` (`bg`, `fg`, `accent`, `muted`, `card`, etc.), font "Archivo".
- Custom breakpoint prefix `max-desk:` (`max-width: 860px`) is the current desktop-first convention: base styles target desktop, `max-desk:` overrides for mobile. **SPEC 04 (`specs/04-responsive-mobile-first.md`, status Borrador) plans to invert this** to mobile-first with new `tablet:` (640px) / `desk:` (861px) prefixes and remove `max-desk:` across ~15 files, plus add a hamburger nav. Don't assume the mobile-first scheme is live until that spec is implemented — check its `Estado` field.

## Spec-driven workflow

This repo drives feature work through specs in `specs/`, written in Spanish following a fixed structure (`# SPEC NN — Title`, `**Estado:**` Borrador/Implementado, `**Depende de:**`, `**Fecha:**`, `**Objetivo:**`, then `## Alcance`, `## Modelo de datos`, `## Plan de implementación`). Use the `/spec` skill to draft a new one and `/spec-impl NN-slug` to implement an approved one. `specs/.spec-config.yml` sets `AutoCreateBranch: true`, so `/spec-impl` creates and switches to a `spec-NN-slug` branch automatically — no extra branch-naming convention beyond that.

## Gotchas

- All data is static/mock, in `src/data/*.ts` (typed: `Project`, `Service`, `Article`, `ArticleBlock`). No backend, no persistence.
- The editor's "Guardar borrador" and "Publicar" buttons are non-functional stubs.
- The contact and subscription forms are markup-only — no validation or submission logic.
- Some project/article content is placeholder data; check with the user before treating it as real.
- No E2E or visual-regression tooling — only Vitest unit/smoke tests. Responsive/visual changes are verified by manual resize (SPEC 04 uses ~375/768/1280px as reference widths).
