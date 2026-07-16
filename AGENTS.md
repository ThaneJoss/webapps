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
- `npm run check:dependencies`: fail when npm dependencies are not on their latest versions
- `npm run lint`: run ESLint for Vue, TypeScript, and build scripts
- `npm run typecheck`: run Vue TypeScript checks
- `npm run typecheck:native`: run the TypeScript 7 native compiler check
- `npm run test:unit`: run unit and component tests
- `npm run test:e2e`: run Playwright and axe browser checks
- `npm run build`: run typecheck and the static frontend build
- `npm run verify:dist`: verify metadata, routes, CSP compatibility, and asset budgets
- `npm run preview`: preview the built frontend

Use the GitHub Actions quality workflow as the default pre-PR verification environment.

## Coding Style & Naming Conventions
Use TypeScript throughout. Follow the existing style:

- 2-space indentation in TypeScript, JSON, Markdown, and Vue templates
- Vue SFCs with `<script setup lang="ts">`
- `PascalCase.vue` for components
- `camelCase.ts` for helpers and libraries

Prefer small, composable components and shared types in `shared/` instead of duplicating interfaces.

## Testing Guidelines
Do not run tests on this machine. This includes `npm test`, `npm run test:unit`, `npm run test:e2e`, watch mode, direct Vitest/Playwright commands, typechecking, and local production builds.

- Run automated checks only in CI or another environment with sufficient resources.
- Limit local review to static, read-only inspection; report tests and builds as not run because of this repository rule.
- Place unit tests near the relevant code and browser tests in `tests/e2e/`; use names like `*.test.ts` and `*.spec.ts`.
- Every PR must pass dependency freshness, lint, Vue/TypeScript 6 typechecking, TypeScript 7 native typechecking, unit tests, SSG build assertions, dependency audit, and Playwright/axe checks.

## Commit & Pull Request Guidelines
Current history uses short imperative subjects and conventional-style prefixes, e.g. `feat: add production domain defaults`.

- Create a feature branch for each change
- Keep commits focused and descriptive
- Open a PR against `main`
- Include a short summary, validation steps, and screenshots for UI changes
- Use Chinese for commit messages and PR titles/descriptions.

## Security & Configuration Tips
Do not commit secrets. Keep sensitive production values in environment variables.
