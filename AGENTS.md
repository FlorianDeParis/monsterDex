# AGENTS.md

## Overview

Angular 19 standalone application (PWA) displaying Pokémon Dex and interactive maps using PokéAPI data and local datasets.

## Core Commands

- **Dev Server**: `npm start` (or `npm run start-lan` for LAN exposure)
- **Typecheck**: `npx tsc --noEmit`
- **Linting**: `npm run lint` (runs `prettier . --check`)
- **Formatting**: `npm run format` (runs `prettier --write .`)
- **Dev Build**: `npx ng build --configuration development`
- **Prod Build**: `npm run build` (fails if component SCSS budget limits defined in `angular.json` are exceeded)
- **Unit Tests**: `npx ng test --watch=false` (runs Karma with Chrome runner)

### Recommended Verification Chain

```bash
npm run lint && npx tsc --noEmit && npx ng test --watch=false
```

## Architecture & Conventions

- **Angular 19 Standalone**: Uses standalone components and functional providers (`src/app/app.config.ts`, `src/app/app.routes.ts`).
- **Directory Structure**:
  - `src/app/core/`: Application-wide services (`PokeApiService`, `PokemonPageService`, `EncountersService`), models (`PokeAPI/`), and global styles (`css/`).
  - `src/app/features/`: Feature components organized by domain (`monster/`, `pokedex/`, `map/`, `debug/`).
  - `public/assets/data/`: Local JSON datasets (region maps, encounters, generation lists).
- **Styling**: SCSS with Bootstrap 5 and custom modular sheets in `src/app/core/css/`. `angular.json` includes `stylePreprocessorOptions` mapped to `["../node_modules", "../src", "../public"]`.

## Development & Build Quirks

- **Node Version**: Target Node `24.18.0` (see `.nvmrc`).
- **Prod Build Budgets**: Production build (`ng build`) enforces strict file size budgets in `angular.json` (e.g. `monster-page.component.scss` limits). Use dev build during feature work.
- **CommonJS Dependencies**: `typescript-roman-numbers-converter` triggers Angular CLI CommonJS warning during build.
