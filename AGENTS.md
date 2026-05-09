# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro-based personal site. Route files live in `src/pages` and map directly to URLs, including dynamic detail pages such as `src/pages/blogs/[slug].astro` and `src/pages/projects/[slug].astro`. Reusable UI lives in `src/components`, shared layouts in `src/layouts`, content helpers in `src/lib`, and profile metadata in `src/data/profile.json`.

Markdown and MDX content is stored under `content/blogs`, `content/projects`, and `content/works`, with schemas defined in `src/content.config.ts`. Static assets such as images and fonts belong in `public/`.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies.
- `pnpm dev`: start the Astro development server.
- `pnpm build`: create the production build.
- `pnpm preview`: serve the built site locally.
- `pnpm fmt`: run Rome fixes and formatting across the repo.

Use `pnpm build` before opening a PR to catch content or route regressions early.

## Coding Style & Naming Conventions
Follow the existing style: TypeScript and Astro files use 2-space indentation, double quotes, and trailing commas where the formatter inserts them. Keep components and layouts in PascalCase such as `Navigation.astro` and `BaseLayout.astro`. Prefer descriptive content slugs and keep collection filenames URL-safe, for example `content/projects/repo-summarizer.mdx`.

Run `pnpm fmt` instead of hand-formatting. Tailwind utility ordering can follow existing local patterns; avoid broad refactors in unrelated files.

## Testing Guidelines
There is no dedicated automated test suite in this repo today. Validation is mainly done through `pnpm build` and, when needed, `pnpm astro check` for Astro and TypeScript diagnostics. For content-heavy changes, verify the affected route locally in `pnpm dev` and confirm generated pages, metadata, and API endpoints still work.

## Commit & Pull Request Guidelines
Recent history mixes concise publish-style commits (`Publish: 5 new projects ...`) with conventional prefixes (`feat: ...`). Keep commit subjects short, imperative, and scoped to one change. For pull requests, include:

- a brief summary of user-visible changes
- linked issues or context when relevant
- screenshots for layout or styling updates
- notes about new environment variables, content collections, or API behavior

## Configuration Notes
Create `.env` from the project example or documented values before running locally. Do not commit personal credentials, production tokens, or copied personal content unless intentionally updating the site.
