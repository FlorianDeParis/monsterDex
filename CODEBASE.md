# MonsterDex — Exhaustive Codebase Documentation

## 1. Project Overview

**MonsterDex** is a modern, front-end-only Pokédex web application built with **Angular 21.2.4** and **TypeScript 5.9.3**. It consumes the public [PokeAPI](https://pokeapi.co/api/v2) to let users browse Pokémon across all generations, view detailed stats, encounter locations, and interactive world maps for Generations I–III (Kanto, Johto, Hoenn).

The app is also a **Progressive Web App (PWA)** with offline caching powered by Angular Service Worker. PokeAPI responses are cached locally for up to 7 days.

### Key Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| `@angular/core` | 21.2.4 | Core framework |
| `rxjs` | 7.8.0 | Reactive programming / async data flow |
| `bootstrap` | 5.3.3 | CSS framework |
| `@ng-bootstrap/ng-bootstrap` | 20.0.0 | Angular Bootstrap components (tabs, progress bars) |
| `notyf` | 3.10.0 | Toast notifications |
| `typescript-roman-numbers-converter` | — | Converts generation numbers to Roman numerals for sprite paths |
| `@angular/service-worker` | 21.2.4 | PWA offline support |

---

## 2. Directory Structure

```
monsterDex/
├── src/
│   ├── main.ts                          # Application bootstrap entry point
│   ├── index.html                       # HTML shell
│   ├── styles.scss                      # Global SCSS imports (Bootstrap, Notyf, custom fonts)
│   │
│   └── app/
│       ├── app.component.ts|html|scss   # Root component: renders HeaderComponent + <router-outlet>
│       ├── app.config.ts                # Application providers (router, HttpClient, service-worker)
│       ├── app.routes.ts                # Route definitions (6 routes)
│       │
│       ├── core/                        # Shared foundation layer
│       │   ├── components/
│       │   │   ├── header/              # App-wide header with logo
│       │   │   ├── loading-spinner/     # Reusable loading indicator
│       │   │   └── not-found/           # 404 page
│       │   │
│       │   ├── css/                     # SCSS architecture
│       │   │   ├── _index.scss          # Main styles aggregator
│       │   │   ├── bootstrap.scss       # Bootstrap variable overrides
│       │   │   ├── config/              # Design tokens
│       │   │   │   ├── _colors.scss     # Color palette
│       │   │   │   ├── _fonts.scss      # Font definitions
│       │   │   │   ├── _spacings.scss   # Spacing variables
│       │   │   │   ├── _breakpoints.scss# Responsive breakpoints
│       │   │   │   └── _customization.scss # Bootstrap theme overrides
│       │   │   ├── lib/                 # Base styles, functions, utility classes
│       │   │   ├── helpers/             # include-media responsive mixin library
│       │   │   └── components/          # Bootstrap component overrides (badges, sprites)
│       │   │
│       │   ├── env/
│       │   │   ├── config.ts            # PokedexList (31 entries), GenerationGamesList
│       │   │   └── environment.ts       # API_URL, SPRITE_URL constants
│       │   │
│       │   ├── models/
│       │   │   ├── monsterDex.type.ts   # App-specific interfaces (Pokedex config, Map, Encounters)
│       │   │   └── PokeAPI/
│       │   │       ├── pokemon.type.ts  # Pokemon, PokemonSpecies, Sprites, Encounters, Stats
│       │   │       ├── games.type.ts    # Pokedex, PokemonEntry
│       │   │       └── utilities.type.ts# FlavorText, NamedAPIResource, Name
│       │   │
│       │   ├── services/
│       │   │   ├── poke-api.service.ts       # Central HTTP client for PokeAPI
│       │   │   ├── language.service.ts        # Current UI language code
│       │   │   ├── toaster.service.ts         # Toast notifications (extends Notyf)
│       │   │   ├── user-data.service.ts       # User preferences in localStorage
│       │   │   ├── pwa-update.service.ts      # Service-worker update notifications
│       │   │   └── monster/
│       │   │       ├── pokedex.service.ts     # Pokedex list & generation mapping
│       │   │       ├── pokemon-page.service.ts# Sprite selection, flavor text, table building
│       │   │       ├── encounters.service.ts  # Encounter filtering by generation
│       │   │       └── map.service.ts         # Static map data loading & marker generation
│       │   │
│       │   └── utils/
│       │       └── url.ts               # preventTrailingSlashes() helper
│       │
│       └── features/                    # Feature modules (standalone components)
│           ├── home/
│           │   └── home.component.*     # Landing page with "Start" button
│           │
│           ├── pokedex/list/
│           │   ├── dex/
│           │   │   ├── monster-dex-list-page/  # Page: expandable tree of all Pokédex variants
│           │   │   └── monster-dex-entry/       # Recursive tree node for a single Pokédex entry
│           │   └── monster/
│           │       ├── monster-list/            # Page: grid of Pokémon in a chosen Pokédex
│           │       └── monster-tile/            # Card component for a single Pokémon
│           │
│           ├── monster/page/
│           │   ├── monster-page.component.*     # Page: full Pokémon details
│           │   └── components/
│           │       ├── monster-header/          # Pokémon name & basic info
│           │       ├── monster-description/     # Types, abilities, flavor text
│           │       ├── monster-encounters/      # Encounters table
│           │       └── monster-stats/           # Base stats visualization
│           │
│           ├── map/world-map/
│           │   ├── world-map.component.*        # Interactive map with positioned markers
│           │   └── tile-map/                    # Tile rendering sub-component
│           │
│           └── debug/map/
│               └── map-test.component.*         # Debug wrapper for WorldMapComponent
│
├── public/
│   ├── assets/
│   │   ├── data/
│   │   │   ├── encounters/types.json           # Encounter method → icon path mapping
│   │   │   ├── generations/game-list.json      # All game version names by generation (1–9)
│   │   │   └── maps/
│   │   │       ├── gen-i/data.json             # Kanto: subregions, locations, coordinates
│   │   │       ├── gen-ii/data.json            # Johto
│   │   │       └── gen-iii/data.json           # Hoenn
│   │   ├── img/
│   │   │   ├── bg.png, bg2.png                 # Background images
│   │   │   ├── maps/                           # Map background images per generation
│   │   │   ├── types/                          # Pokémon type badge images
│   │   │   ├── encounters/                     # Encounter method icons (grass.png, fishing.gif…)
│   │   │   └── monster-page/                   # Pokémon detail page assets
│   │   ├── fonts/                              # Orbitron, Pokemon RS, Russo One
│   │   └── icons/                              # PWA icons (192x192, 512x512)
│   ├── manifest.webmanifest                    # PWA manifest
│   └── favicon.ico
│
├── scripts/
│   └── map-coordinate-converter.js     # Pre-build script: converts absolute → relative coords
│
├── angular.json                        # Angular CLI config (builder, budgets, SCSS paths)
├── tsconfig.json                       # TypeScript base config (strict mode)
├── tsconfig.app.json                   # App-specific TS config
├── tsconfig.spec.json                  # Test TS config
├── ngsw-config.json                    # Service-worker caching strategy
├── package.json                        # Dependencies & npm scripts
├── .editorconfig                       # Editor settings
└── .prettierignore                     # Prettier exclusions
```

---

## 3. Routing

**File:** `src/app/app.routes.ts`

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomeComponent` | Landing page with a "Start" button |
| `/pokedexes` | `MonsterDexListPageComponent` | Expandable tree listing all 31 Pokédex variants |
| `/pokedex/:region` | `MonsterListComponent` | Grid of Pokémon tiles for a given Pokédex (`:region` = Pokédex ID) |
| `/pokemon/:idMonster/:idPokeGen/:idDex` | `MonsterPageComponent` | Full detail page: stats, sprites, encounters, map |
| `/debug-map/:idMonster/:idPokeGen/:idDex` | `MapTestComponent` | Debug view for the world map system |
| `**` | `NotFoundComponent` | 404 fallback |

**User navigation flow:**
```
Home (/)
  → "Start" button
Pokédex List (/pokedexes)
  → Click a Pokédex variant
Pokémon Grid (/pokedex/:region)
  → Click a Pokémon tile
Pokémon Detail (/pokemon/:idMonster/:idPokeGen/:idDex)
  ├── Stats, types, abilities
  ├── Flavor text (tabbed by generation)
  ├── Encounters table
  └── World map (Gens I–III only)
```

---

## 4. Components — Detailed Breakdown

### 4.1 Root & Core Components

#### AppComponent (`src/app/app.component.ts`)
- **Selector:** `app-root`
- **Template:** Renders `<app-header>` and `<router-outlet>`
- **Behavior:** Injects `PwaUpdateService` on construction to start listening for updates
- **Children:** `HeaderComponent`, routed feature components

#### HeaderComponent (`src/app/core/components/header/`)
- **Selector:** `app-header`
- **Purpose:** Displays the application logo in the global header bar
- **State:** `logoPath: string` — asset path to logo image

#### LoadingSpinnerComponent (`src/app/core/components/loading-spinner/`)
- **Selector:** `app-loading-spinner`
- **Purpose:** Reusable loading indicator shown while data is being fetched

#### NotFoundComponent (`src/app/core/components/not-found/`)
- **Selector:** `app-not-found`
- **Purpose:** 404 error page for unmatched routes

---

### 4.2 Home Feature

#### HomeComponent (`src/app/features/home/`)
- **Selector:** `app-home`
- **Purpose:** Welcome/landing page
- **Behavior:** Single button navigates to `/pokedexes` via Angular Router
- **Dependencies:** `Router`

---

### 4.3 Pokédex List Feature

#### MonsterDexListPageComponent (`src/app/features/pokedex/list/dex/monster-dex-list-page/`)
- **Selector:** `app-monster-dex-list-page`
- **Purpose:** Displays all available Pokédex variants in a hierarchical, expandable tree
- **State:**
  - `pokedexList: PokedexListEntry[]` — the full Pokédex list from `PokedexService`
  - `pokedexListFlatten: FlattenPokedexList` — flattened version for quick lookup
- **Data flow:** Calls `PokedexService.getPokedexList()` on init
- **Children:** Renders one `MonsterDexEntryComponent` per Pokédex entry

#### MonsterDexEntryComponent (`src/app/features/pokedex/list/dex/monster-dex-entry/`)
- **Selector:** `app-monster-dex-entry`
- **Inputs:** `@Input() dexEntry` — either a `PokedexListEntry` (parent) or `PokedexListEntryVariant` (leaf)
- **State:**
  - `toggle: boolean` — expand/collapse state for entries with variants
  - `label: string` — display text
  - `dexId: number | null` — Pokédex ID (null for parent-only entries)
- **Type guards:**
  - `isMainEntry()` — checks if the entry is a `PokedexListEntry`
  - `isSubEntry()` — checks if it's a `PokedexListEntryVariant`
  - `isJustMainWithOneElement()` — single-variant shortcut (no expansion needed)
- **Behavior:** Recursive component — a parent entry renders child `MonsterDexEntryComponent` instances for each variant. Clicking a leaf navigates to `/pokedex/:dexId` and shows a success toast.
- **Dependencies:** `Router`, `ToasterService`

---

### 4.4 Pokémon Grid Feature

#### MonsterListComponent (`src/app/features/pokedex/list/monster/monster-list/`)
- **Selector:** `app-monster-list`
- **Purpose:** Displays a grid of all Pokémon in the selected Pokédex
- **State:**
  - `pokedex$: Observable<Pokedex>` — fetched from PokeAPI
  - `pokedexId: number` — from `:region` route param
  - `pokemonGeneration: number | null` — determined by `PokedexService.getPokedexPokemonGeneration()`
- **Data flow:** On init, reads route param, calls `PokeApiService.getDex(pokedexId)`
- **Children:** One `MonsterTileComponent` per Pokémon entry

#### MonsterTileComponent (`src/app/features/pokedex/list/monster/monster-tile/`)
- **Selector:** `app-monster-tile`
- **Inputs:**
  - `@Input() pokemon: PokemonEntry` — API model with name and URL
  - `@Input() idDex: number` — current Pokédex ID
- **State:**
  - `pokemonNationalId: number` — extracted from the PokeAPI resource URL
  - `pokemonGeneration: number | null` — generation for this Pokédex
  - `imageUrl: string` — constructed sprite URL using `environment.SPRITE_URL`
- **Methods:**
  - `getIdMonster()` — parses the Pokémon national ID from the PokeAPI URL by splitting on `/` and removing trailing slashes
  - `goToMonsterPage()` — navigates to `/pokemon/:idMonster/:idPokeGen/:idDex`
- **Dependencies:** `Router`, `PokedexService`

---

### 4.5 Pokémon Detail Page Feature

#### MonsterPageComponent (`src/app/features/monster/page/`)
- **Selector:** `app-monster-page`
- **Purpose:** The richest page in the app — displays comprehensive Pokémon information
- **Route params:** `idMonster` (national ID), `idPokeGen` (generation), `idDex` (Pokédex ID)
- **State (Observables):**
  - `monsterDetails$: Observable<Pokemon>` — full Pokémon data
  - `monsterDetailsSpecies$: Observable<PokemonSpecies>` — species-specific data
  - `pokemonEncountersList$: Observable<LocationAreaEncounter[]>` — raw encounter data
  - `pokemonFlattenedEncountersList$: Observable<TableRow[]>` — formatted table rows
- **State (plain values):**
  - `pokemonFlavorTextList: FlavorText[]` — descriptions filtered by generation/language
  - `pokemonSelectedSprite: string` — current artwork URL
  - `activeFlavorTab: number` — selected description tab
  - `volume: number` — audio playback volume
  - `@ViewChild() audio: ElementRef` — reference to native `<audio>` element (Pokémon cry)
- **Lifecycle:**
  - `ngOnInit()` — chains multiple Observable subscriptions with `tap()` side effects to set sprites, flavor text, encounters, and table data
  - `ngAfterViewInit()` — sets audio element volume
- **Key methods:**
  - `setPokemonSprite$()` — calls `PokemonPageService.getPokemonArtworkByIdGeneration()` to select the correct artwork
  - `setEncountersList$()` — calls `EncountersService.getEncountersByGeneration()` to filter encounters
  - `setFlavorTextList$()` — calls `PokemonPageService.filterPokemonFlavorTextEntriesByIdGeneration()`
  - `setFlattenedEncountersList$()` — calls `PokemonPageService.getFlattenedEncountersList()` to build the table
  - `getEncounterIcon()` — maps encounter method types to icon paths
  - `setTypeClasses()` — generates CSS class names based on Pokémon types
- **Children:** `WorldMapComponent`, ng-bootstrap tabs (`NgbNav`, `NgbProgressbar`), sub-components for header/description/encounters/stats

---

### 4.6 World Map Feature

#### WorldMapComponent (`src/app/features/map/world-map/`)
- **Selector:** `app-world-map`
- **Inputs:**
  - `@Input() debug: boolean = false` — enables debug overlay with matrix data
  - `@Input() pokemonGeneration: string` — which generation's map to display
  - `@Input() pokemonId: string` — which Pokémon's encounters to highlight
  - `@Input() region: string` — region filter
- **State:**
  - `places$: Observable<RegionMarkerList[]>` — positioned map markers
  - `oldPlaces$: Observable<RegionMarkerList[]>` — debug/matrix markers
  - `allPlaces: Region[]` — all map data for the generation
  - `isDisplayable: boolean` — `true` only for generations 1–3
- **Behavior:**
  - `isMapAllowed()` — validates that the generation has map data (only gens 1–3)
  - `getMapMarkers()` via `MapService` — correlates API encounter location-area names with static JSON coordinates
  - Renders markers positioned with CSS percentages over a background map image
- **Coordinate system:** Markers use relative percentage positioning; raw JSON coordinates are absolute pixel values converted at build time by `map-coordinate-converter.js`
- **Key methods:**
  - `transformMatrixToRelativeCoordinates()` — absolute → percentage conversion
  - `scale()` — percentage-based scaling helper
  - `getMapStyle()` — calculates aspect ratio for the map container
  - `getMarkerStyle()` — positions individual markers
  - `getSize()` — creates arrays for grid iteration
- **Children:** `TileMapComponent`

#### TileMapComponent (`src/app/features/map/world-map/tile-map/`)
- **Selector:** `app-tile-map`
- **Status:** Minimal/placeholder — has template only, no significant logic

---

### 4.7 Debug Feature

#### MapTestComponent (`src/app/features/debug/map/`)
- **Selector:** `app-map-test`
- **Purpose:** Test harness for the world map system
- **Route params:** Same as `MonsterPageComponent` (`idMonster`, `idPokeGen`, `idDex`)
- **Behavior:** Renders `WorldMapComponent` with `debug=true` to show additional overlay data

---

## 5. Services — Detailed Breakdown

### 5.1 PokeApiService (`src/app/core/services/poke-api.service.ts`)
- **Scope:** `providedIn: 'root'` (singleton)
- **Purpose:** Central HTTP client wrapping all PokeAPI endpoints
- **Base URL:** `https://pokeapi.co/api/v2` (from `environment.ts`)
- **Methods:**

| Method | Return Type | API Endpoint |
|--------|-------------|-------------|
| `getDex(idDex: number)` | `Observable<Pokedex>` | `/pokedex/{id}` |
| `getPokemonDetails(name: string \| number)` | `Observable<Pokemon>` | `/pokemon/{name}` |
| `getPokemonEncounters(name: string \| number)` | `Observable<LocationAreaEncounter[]>` | `/pokemon/{name}/encounters` |
| `getPokemonSpeciesDetails(name: string \| number)` | `Observable<PokemonSpecies>` | `/pokemon-species/{name}` |

- **Dependencies:** Angular `HttpClient`

---

### 5.2 PokedexService (`src/app/core/services/monster/pokedex.service.ts`)
- **Scope:** `providedIn: 'root'` (singleton)
- **Purpose:** Manages the hard-coded Pokédex configuration — does NOT call the API
- **Data source:** `PokedexList` from `config.ts`
- **Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getPokedexList()` | `PokedexListEntry[]` | Returns the full 31-entry Pokédex list |
| `getCurrentPokedexData(id: number)` | `PokedexListEntryFlattened` | Flattens variants and finds the entry matching a Pokédex ID |
| `getPokedexPokemonGeneration(id: number)` | `number \| null` | Maps a Pokédex ID to its generation number |

---

### 5.3 EncountersService (`src/app/core/services/monster/encounters.service.ts`)
- **Scope:** `providedIn: 'root'` (singleton)
- **Purpose:** Fetches encounter data from PokeAPI and filters it to the current generation's game versions
- **Data source:** `GenerationGamesList` from `config.ts` + `PokeApiService`
- **Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getEncounters(pokemonId)` | `Observable<LocationAreaEncounter[]>` | Raw encounters from API |
| `getEncountersByGeneration(id, gen)` | `Observable<LocationAreaEncounter[]>` | Filtered to only current generation's games |
| `filterCurrentGameGeneration()` | — | Internal: filters `version_details` arrays to match current gen's game slugs |
| `getEncounterIconPath(type: string)` | `string` | Returns icon asset path for an encounter method |

---

### 5.4 PokemonPageService (`src/app/core/services/monster/pokemon-page.service.ts`)
- **Scope:** `providedIn: 'root'` (singleton)
- **Purpose:** Data formatting and transformation for the Pokémon detail page
- **Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getPokemonArtworkByIdGeneration(sprites, gen)` | `string` | Selects the correct artwork from the sprites object using Roman numeral generation keys (e.g., `generation-iii`) |
| `filterPokemonFlavorTextEntriesByIdGeneration(entries, gen)` | `FlavorText[]` | Filters flavor text by generation AND language (French first, English fallback) |
| `getFlattenedEncountersList(encounters)` | `Observable<TableRow[]>` | Transforms raw encounter data into table rows with rowspan merging |
| `buildTable(data)` | `TableRow[]` | Builds a complex table structure with zone/version grouping and rowspan calculations |
| `getMyObjectValueCastedKey()` | — | Utility: safe typed key accessor for dynamic object property access |

- **Dependencies:** `typescript-roman-numbers-converter` (`toRoman()`)

---

### 5.5 MapService (`src/app/core/services/monster/map.service.ts`)
- **Scope:** Provided **per-component** (not root singleton — fresh instance per `WorldMapComponent`)
- **Purpose:** Loads static map JSON data and correlates it with API encounter locations
- **Data sources:** Static JSON imports for generations I–III:
  - `generation1`, `generation2`, `generation3` — main coordinate data
  - `generation1MTX`, `generation2MTX`, `generation3MTX` — matrix/debug data
- **State:** Uses Angular `signal()` for reactive dataset switching based on route params
- **Methods:**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getMapMarkers()` | `Observable<RegionMarkerList[]>` | Returns markers for the current Pokémon's encounters on the map |
| `generateMapMarkers()` | — | Matches API encounter location-area names to static map coordinates |
| `getAllMapPlaces()` | `Region[]` | Returns all map data (used in debug mode) |
| `getMatrixMapMarkers()` | `Observable<RegionMarkerList[]>` | Deprecated: matrix-based markers |

---

### 5.6 LanguageService (`src/app/core/services/language.service.ts`)
- **Scope:** `providedIn: 'root'` (singleton)
- **Purpose:** Provides the current UI language code
- **Default language:** French (`fr`), with English (`en`) as fallback in flavor text filtering

---

### 5.7 UserDataService (`src/app/core/services/user-data.service.ts`)
- **Scope:** `providedIn: 'root'` (singleton)
- **Purpose:** Reads and writes user preferences to `localStorage`

---

### 5.8 ToasterService (`src/app/core/services/toaster.service.ts`)
- **Scope:** `providedIn: 'root'` (singleton)
- **Purpose:** Toast notification system
- **Implementation:** Extends the `Notyf` class directly
- **Config:** 3-second duration, bottom-right position, dismissible
- **Usage:** Called by `MonsterDexEntryComponent` for navigation success feedback

---

### 5.9 PwaUpdateService (`src/app/core/services/pwa-update.service.ts`)
- **Scope:** `providedIn: 'root'` (singleton)
- **Purpose:** Listens for Angular Service Worker update events and notifies the user when a new version is available
- **Injected by:** `AppComponent` constructor

---

## 6. Data Models

### 6.1 PokeAPI Types (`src/app/core/models/PokeAPI/`)

#### `pokemon.type.ts`
- `Pokemon` — Full Pokémon data: id, name, abilities, sprites, stats, types, moves, weight, height
- `PokemonSpecies` — Species info: generation, legendary, mythical, flavor_text_entries, egg_groups
- `PokemonSprites` — Sprite URLs with generation-specific sub-objects (`PokemonSprites_Gen_I` through `PokemonSprites_Gen_VIII`)
- `LocationAreaEncounter` — Encounter location data with version-specific details
- `EncounterVersionDetail` — Game version, max chance, encounter methods/conditions
- `PokemonType` — Type slot and type reference
- `PokemonAbility` — Ability data with hidden flag
- `PokemonStat` — Base stat value and effort
- `PokemonMove` — Move reference and learn details

#### `games.type.ts`
- `Pokedex` — Pokédex data: id, name, region, descriptions, pokemon_entries
- `PokemonEntry` — Entry number + Pokémon species reference

#### `utilities.type.ts`
- `FlavorText` — Localized description text with language and version references
- `NamedAPIResource` — Standard PokeAPI resource reference (name + url)
- `APIResource` — URL-only resource reference
- `Name` — Localized name with language reference

---

### 6.2 App-Specific Types (`src/app/core/models/monsterDex.type.ts`)

#### Pokédex Configuration
```typescript
PokedexListEntry {
  label: string                           // Display name (e.g., "Kanto")
  generation?: number | null              // Generation number
  pokedexVariants: PokedexListEntryVariant[]
}

PokedexListEntryVariant {
  pokedexId: number                       // PokeAPI Pokédex ID
  pokedexVariantName: string              // Variant display name
}

PokedexListEntryFlattened extends PokedexListEntryVariant {
  label: string
  generation?: number | null
}

FlattenPokedexList = PokedexListEntryFlattened[]
```

#### Encounter Data
```typescript
SimplifiedEncounter {
  name: string                            // Location area name
  encounters: number[] | number[][]       // Encounter data
}

TableRow {
  // Flattened encounter table row with rowspan support
  // Used by monster-encounters component
}
```

#### Map/Region Data
```typescript
Region {
  name: string
  id: number
  subregions: Subregion[]
}

Subregion {
  name: string
  id: string
  size: number[]                          // [width, height] of the subregion
  locations: Location[]
}

Location {
  name: string
  coordinates: number[][]                 // Array of [x, y] coordinate pairs
  locationareas: LocationArea[]
}

LocationArea {
  name: string
  id: number                              // PokeAPI location-area ID
}

RegionMarkerList {
  name: string
  subregions: SubRegionMarkerList[]
}

SubRegionMarkerList {
  name: string
  id: string
  size: number[]
  markers: MapMarker[]
}

MapMarker {
  name: string
  coordinates: number[]                   // [x, y] percentage-based position
}

GenerationDataSet = Region[]
```

#### Game Configuration
```typescript
GenerationGames {
  generation: number
  games: string[]                         // e.g., ["red", "blue", "yellow"]
}
```

---

## 7. Configuration & Environment

### `src/app/core/env/environment.ts`
```typescript
API_URL   = "https://pokeapi.co/api/v2"
SPRITE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites"
```

### `src/app/core/env/config.ts`

**PokedexList** — Hard-coded array of 31 Pokédex entries covering generations 1–9:
- National Pokédex
- Kanto, Johto, Hoenn (Original + Updated)
- Sinnoh (Original + Extended + Platinum)
- Unova (Original + Updated)
- Kalos (Central, Coastal, Mountain)
- Alola (Original + Updated + Melemele/Akala/Ulaula/Poni)
- Galar, Isle of Armor, Crown Tundra
- Hisui
- Paldea, Kitakami, Blueberry

**GenerationGamesList** — Maps each generation (1–9) to its game version slugs:
- Gen 1: `["red", "blue", "yellow"]`
- Gen 2: `["gold", "silver", "crystal"]`
- Gen 3: `["ruby", "sapphire", "emerald", "firered", "leafgreen"]`
- …through Gen 9

---

## 8. Static Data Files

### `public/assets/data/encounters/types.json`
Maps encounter method names to their icon asset paths:
```json
{
  "walk": "assets/img/encounters/grass.png",
  "old-rod": "assets/img/encounters/fishing.gif",
  "good-rod": "assets/img/encounters/fishing.gif",
  "super-rod": "assets/img/encounters/fishing.gif",
  "surf": "assets/img/encounters/surf.png",
  "rock-smash": "assets/img/encounters/rock-smash.gif",
  ...
}
```

### `public/assets/data/generations/game-list.json`
All game version names organized by generation (1–9). Used for display purposes.

### `public/assets/data/maps/gen-{i,ii,iii}/`
Each generation folder contains:
- `data-new.json` — Raw map data with absolute pixel coordinates
- `data.json` — Processed map data with relative percentage coordinates (generated by `map-coordinate-converter.js`)

**Structure:**
```json
{
  "region": [{
    "name": "kanto",
    "id": 1,
    "subregions": [{
      "name": "Kanto",
      "id": "kanto-main",
      "size": [width, height],
      "locations": [{
        "name": "pallet-town",
        "coordinates": [[x, y], ...],
        "locationareas": [{
          "name": "pallet-town-area",
          "id": 285
        }]
      }]
    }]
  }]
}
```

---

## 9. Pre-Build Script

### `scripts/map-coordinate-converter.js`
- **Runs:** Automatically before `npm start` and `npm run build` (configured as `prestart` / `prebuild` in `package.json`)
- **Purpose:** Reads each `data-new.json` map file, converts absolute pixel coordinates to relative percentages based on the subregion's `size`, and writes the result to `data.json`
- **Why:** Allows map markers to be positioned correctly regardless of the rendered map image size

---

## 10. Styling Architecture

### Technology
- **SCSS** preprocessor with **Bootstrap 5** as the CSS framework
- **ng-bootstrap** for Angular-native Bootstrap components (tabs, progress bars, navs)
- **Component-scoped styles** — each component has its own `.component.scss`

### SCSS Organization (`src/app/core/css/`)

| Path | Purpose |
|------|---------|
| `_index.scss` | Main aggregator — imports all sub-modules |
| `bootstrap.scss` | Bootstrap variable overrides before Bootstrap import |
| `config/_colors.scss` | Color palette variables |
| `config/_fonts.scss` | Font-face declarations and font-family variables |
| `config/_spacings.scss` | Spacing scale variables |
| `config/_breakpoints.scss` | Responsive breakpoint definitions |
| `config/_customization.scss` | Bootstrap theme customization |
| `lib/` | Base styles, SCSS functions, utility classes |
| `helpers/` | `include-media` mixin library for responsive queries |
| `components/` | Override styles for Bootstrap badges, sprites, etc. |

### Custom Fonts
| Font | Style | Usage |
|------|-------|-------|
| Orbitron (Variable) | Modern/tech | UI elements |
| Pokemon RS | Brand | Pokémon-themed headings |
| Russo One | Bold display | Section headings |

### Global Styles (`src/styles.scss`)
Imports: Bootstrap 5 CSS, Notyf notification styles, and the custom SCSS architecture from `core/css/`.

---

## 11. PWA Configuration

### Service Worker (`ngsw-config.json`)

**Asset Groups:**
1. **App shell** (prefetch): `index.html`, `*.css`, `*.js`, `favicon.ico` — loaded immediately
2. **Assets** (lazy): `assets/**` — loaded on demand

**Data Groups:**
- **PokeAPI cache**: Caches responses matching `https://pokeapi.co/api/v2/**`
  - Strategy: `performance` (serve from cache first)
  - Max entries: 100
  - Max age: 7 days

### PWA Manifest (`public/manifest.webmanifest`)
- Display: standalone
- Theme color: custom branded color
- Icons: 192x192 and 512x512

---

## 12. Build Configuration

### Angular CLI (`angular.json`)
- **Builder:** `@angular/build:application`
- **Output:** `dist/monster-dex/`
- **SCSS include paths:** `node_modules`, `src`, `public`
- **Service Worker:** Enabled in production builds
- **Budgets:**
  - Initial bundle: 500 KB warning / 1 MB error
  - Component styles: 4 KB warning / 8 KB error
- **SCSS deprecation silencing:** mixed-decls, color-functions, global-builtin, import

### npm Scripts (`package.json`)
| Script | Command | Description |
|--------|---------|-------------|
| `prestart` | `node scripts/map-coordinate-converter.js` | Convert map coordinates |
| `start` | `ng serve` | Dev server with hot reload |
| `prebuild` | `node scripts/map-coordinate-converter.js` | Convert map coordinates |
| `build` | `ng build` | Production build |
| `watch` | `ng build --watch --configuration development` | Dev build with watch |
| `test` | `ng test` | Run Jasmine/Karma tests |
| `lint` / `format` | `prettier --check` / `prettier --write` | Code formatting |

---

## 13. End-to-End Data Flow

### Pokémon Detail Page (most complex flow)

```
User clicks Pokémon tile on the grid
  │
  ├─ Router navigates to /pokemon/:idMonster/:idPokeGen/:idDex
  │
  └─ MonsterPageComponent.ngOnInit()
       │
       ├─── PokeApiService.getPokemonDetails(idMonster)
       │      → Observable<Pokemon>
       │      → tap: setPokemonSprite$()
       │            └─ PokemonPageService.getPokemonArtworkByIdGeneration()
       │                  └─ toRoman(idPokeGen) → selects sprite from nested object
       │
       ├─── PokeApiService.getPokemonSpeciesDetails(idMonster)
       │      → Observable<PokemonSpecies>
       │      → tap: setFlavorTextList$()
       │            └─ PokemonPageService.filterPokemonFlavorTextEntriesByIdGeneration()
       │                  └─ Filters by generation + language (fr → en fallback)
       │
       ├─── EncountersService.getEncountersByGeneration(idMonster, idPokeGen)
       │      │  └─ PokeApiService.getPokemonEncounters(idMonster)
       │      │       → filters version_details to current gen's games
       │      │
       │      → tap: setFlattenedEncountersList$()
       │            └─ PokemonPageService.getFlattenedEncountersList()
       │                  └─ buildTable() → TableRow[] (with rowspan merging)
       │
       └─── MapService.getMapMarkers()
              ├─ Loads static JSON for current generation
              ├─ Matches encounter location-area names to map coordinates
              └─ → Observable<RegionMarkerList[]> → positioned markers on map
```

### Pokédex Browsing Flow

```
User arrives at /pokedexes
  │
  └─ MonsterDexListPageComponent.ngOnInit()
       └─ PokedexService.getPokedexList()
            → Static PokedexList from config.ts (no API call)
            → Renders expandable tree of MonsterDexEntryComponent items
                  │
                  └─ User clicks a leaf entry
                       └─ Router navigates to /pokedex/:dexId
                            │
                            └─ MonsterListComponent.ngOnInit()
                                 └─ PokeApiService.getDex(dexId)
                                      → Observable<Pokedex>
                                      → Renders grid of MonsterTileComponent
                                            │
                                            └─ Each tile:
                                                 ├─ Parses Pokemon ID from API URL
                                                 ├─ Constructs sprite URL
                                                 └─ On click → /pokemon/:id/:gen/:dex
```

---

## 14. Testing

- **Framework:** Jasmine + Karma (Chrome browser runner)
- **Config:** `tsconfig.spec.json`, Karma config in `angular.json`
- **Coverage:** 17 `.spec.ts` files exist across all services and components
- **Current state:** Minimal scaffolding only — all tests are basic `should be created` assertions that verify components and services can be instantiated

---

## 15. Key Architectural Observations

1. **No backend** — This is a purely client-side application consuming the public PokeAPI. All business logic runs in the browser.

2. **No state management library** — State is managed through RxJS Observables in services and local component properties. No NgRx, Akita, or other store patterns.

3. **Standalone components** — The app uses Angular 19+ standalone component architecture throughout. There are no `NgModule` declarations.

4. **Hard-coded Pokédex metadata** — The list of 31 Pokédex variants and their generation mappings are defined statically in `config.ts`, not fetched from the API. This acts as the app's "source of truth" for navigation structure.

5. **Maps limited to Generations I–III** — World map support only covers Kanto, Johto, and Hoenn. Later generations display no map. Map coordinate data is maintained as static JSON files.

6. **French-first localization** — Flavor text filtering defaults to French (`fr`) with English (`en`) as fallback. This is hard-coded in `PokemonPageService`.

7. **PWA with aggressive caching** — PokeAPI responses are cached for 7 days with a performance-first strategy, allowing significant offline functionality.

8. **Pre-build coordinate transformation** — The `map-coordinate-converter.js` script runs before every start/build to convert absolute pixel coordinates to relative percentages, enabling responsive map rendering.

9. **Sprite CDN** — Pokémon artwork is loaded directly from the PokeAPI GitHub sprites repository rather than being bundled locally.

10. **Roman numeral generation keys** — PokeAPI sprite objects use Roman numeral keys (e.g., `generation-iii`), so the app uses `typescript-roman-numbers-converter` to dynamically access the correct sprite set.
