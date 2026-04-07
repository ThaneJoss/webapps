# Repository Guidelines

## Project Structure & Module Organization
This repo contains a Vite + Vue frontend and a small Hono API.

- `src/`: frontend application code
- `src/components/`, `src/sections/`, `src/views/`: UI building blocks and page composition
- `src/lib/`: client-side API helpers
- `src/data/`: fallback seed data for the frontend
- `api/src/`: Hono API entrypoints and route logic
- `shared/`: types and shared content contracts used by both frontend and API
- `dist/`, `dist-api/`: generated build output; do not edit manually

Keep new code grouped by feature or concern rather than by file type only.

## Build, Test, and Development Commands
- `npm install`: install dependencies
- `npm run dev`: start frontend and API together
- `npm run dev:web`: run the Vite frontend only
- `npm run dev:api`: run the Hono API only
- `npm run typecheck`: run Vue and API TypeScript checks
- `npm run build`: run typecheck, frontend build, and API build
- `npm run preview`: preview the built frontend

Use `npm run build` as the default pre-PR verification step.

## Coding Style & Naming Conventions
Use TypeScript throughout. Follow the existing style:

- 2-space indentation in TypeScript, JSON, Markdown, and Vue templates
- Vue SFCs with `<script setup lang="ts">`
- `PascalCase.vue` for components
- `camelCase.ts` for helpers and libraries
- keep API responses in the shared `{ success, data | error }` envelope

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
Do not commit secrets. Keep production values in environment variables when sensitive; `.env.production` may contain non-secret public config such as API base URLs.
