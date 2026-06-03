# Repository Guidelines

## Project Structure & Module Organization
This repo contains a Vite + Vue frontend.

- `src/`: frontend application code
- `src/components/`, `src/sections/`, `src/views/`: UI building blocks and page composition
- `src/lib/`: client-side helpers
- `src/data/`: fallback seed data for the frontend
- `shared/`: shared frontend content contracts and types
- `dist/`: generated build output; do not edit manually

Keep new code grouped by feature or concern rather than by file type only.

## Build, Test, and Development Commands
- `npm install`: install dependencies
- `npm run dev`: start the Vite frontend
- `npm run dev:web`: run the Vite frontend only
- `npm run typecheck`: run Vue TypeScript checks
- `npm run build`: run typecheck and frontend build
- `npm run preview`: preview the built frontend

Use `npm run build` as the default pre-PR verification step.

## Coding Style & Naming Conventions
Use TypeScript throughout. Follow the existing style:

- 2-space indentation in TypeScript, JSON, Markdown, and Vue templates
- Vue SFCs with `<script setup lang="ts">`
- `PascalCase.vue` for components
- `camelCase.ts` for helpers and libraries

Prefer small, composable components and shared types in `shared/` instead of duplicating interfaces.

## Testing Guidelines
There is no automated test suite yet. For now, validate changes with:

- `npm run typecheck`
- `npm run build`

If you add tests later, place them near the relevant code or in a top-level `tests/` directory, and use names like `*.test.ts`.

## Commit & Pull Request Guidelines
Current history uses short imperative subjects and conventional-style prefixes, e.g. `feat: add production domain defaults`.

- Create a feature branch for each change
- Keep commits focused and descriptive
- Open a PR against `main`
- Include a short summary, validation steps, and screenshots for UI changes

## Security & Configuration Tips
Do not commit secrets. Keep sensitive production values in environment variables.
