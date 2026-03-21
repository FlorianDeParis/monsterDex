# TypeScript Standards — MonsterDex (Angular PWA)

This skill defines the TypeScript rules, ES6+ patterns, and code quality standards
for MonsterDex. All code must follow these standards. No exceptions.

---

## 1. Compiler Configuration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "module": "ES2022"
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

`strictTemplates` enables full type-checking inside `.html` template files.
`strictInjectionParameters` ensures all injectable constructor parameters are resolvable at compile time.

---

## 2. Non-Negotiable Rules

These rules apply to every `.ts` file in the project.

### Never use `any`

```typescript
// ❌ Wrong
const parseData = (input: any): any => { ... };

// ✅ Correct — use unknown and narrow
const parseData = (input: unknown): string => {
  if (typeof input !== 'string') throw new Error('Expected string');
  return input;
};
```

### Never use `var`

```typescript
// ❌ Wrong
var count = 0;

// ✅ Correct
const count = 0;   // immutable binding — default choice
let index = 0;     // mutable binding — only when reassignment is needed
```

### Always use `import/export` — never `require()`

```typescript
// ❌ Wrong
const express = require('express');

// ✅ Correct
import { HttpClient } from '@angular/common/http';
```

### No implicit `any` from missing parameter types

Always annotate function parameters. `strict: true` will error on implicit `any`.

```typescript
// ❌ Wrong — parameter 'id' implicitly has type 'any'
const findPokemon = (id) => this.http.get(`/pokemon/${id}`);

// ✅ Correct
const findPokemon = (id: number): Observable<Pokemon> =>
  this.http.get<Pokemon>(`${environment.API_URL}/pokemon/${id}`);
```

### No unused variables or imports

Remove unused imports immediately. Prefix with `_` only for intentionally unused
parameters required by an interface or callback signature.

### Always narrow `unknown` errors before accessing properties

In TypeScript strict mode, `catch (error)` types `error` as `unknown`. Never access properties directly.

```typescript
// ❌ Wrong — 'error' is of type 'unknown'
try {
  await riskyOperation();
} catch (error) {
  console.error(error.message);
}

// ✅ Correct — narrow before access
try {
  await riskyOperation();
} catch (error) {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  console.error(message);
}
```

This also applies to RxJS `.subscribe({ error: (err: unknown) => ... })` callbacks.

---

## 3. ES6+ Patterns Enforced

### Destructuring

```typescript
// ❌ Verbose
const name = pokemon.name;
const id = pokemon.id;

// ✅ Destructure
const { name, id } = pokemon;
```

### Optional Chaining and Nullish Coalescing

```typescript
// ❌ Verbose null checks
const city = user && user.address && user.address.city;

// ✅ Concise
const city = user?.address?.city;
const port = process.env.PORT ?? '4200';
```

### Template Literals

```typescript
// ❌ String concatenation
const url = environment.API_URL + '/pokemon/' + id;

// ✅ Template literal
const url = `${environment.API_URL}/pokemon/${id}`;
```

### Spread and Rest

```typescript
// Spread for immutable updates
const updatedEntry = { ...existingEntry, label: newLabel };

// Rest for collecting remaining properties
const { coordinates, ...locationData } = location;
```

### Arrow Functions

Use arrow functions for callbacks and inline functions.

```typescript
// ✅ Arrow for callbacks
const filteredEncounters = encounters.filter((e) => e.version_details.length > 0);

// ✅ Class methods in components use standard method syntax
start() {
  this.router.navigateByUrl('/pokedexes');
}
```

---

## 4. Angular-Specific Patterns

### Constructor Injection (not `inject()`)

The codebase consistently uses constructor injection:

```typescript
// ✅ Matches existing codebase pattern
@Injectable({ providedIn: 'root' })
export class PokeApiService {
  constructor(private http: HttpClient) {}
}

@Component({ ... })
export class MonsterListComponent {
  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokeApiService,
    private pokedexService: PokedexService,
  ) {}
}
```

### Standalone Components

All components are standalone. No NgModules:

```typescript
@Component({
  selector: 'app-home',
  imports: [CommonModule],  // import what the template needs
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent { ... }
```

### RxJS Observables for State

State is managed with RxJS Observables in services and local component properties:

```typescript
// In components
pokedex$: Observable<Pokedex>;
monsterDetails$: Observable<Pokemon>;

// Using tap for side effects in subscription chains
this.monsterDetails$ = this.pokeApiService.getPokemonDetails(id).pipe(
  tap((pokemon) => {
    this.setPokemonSprite(pokemon);
  }),
);
```

### Services as Singletons

Most services are `providedIn: 'root'`. Exception: `MapService` is provided per-component.

```typescript
@Injectable({ providedIn: 'root' })  // singleton — most services
export class PokedexService { ... }

// MapService is provided at component level for fresh state per map instance
```

---

## 5. TypeScript Utility Types

Use built-in utility types instead of manual type construction:

```typescript
// Partial — all fields optional (useful for updates)
type UpdateEntry = Partial<PokedexListEntry>;

// Pick — select specific fields
type PokemonBasicInfo = Pick<Pokemon, 'id' | 'name' | 'types'>;

// Omit — exclude specific fields
type PokemonWithoutMoves = Omit<Pokemon, 'moves'>;

// Record — typed key-value map
type EncounterIconMap = Record<string, string>;
```

---

## 6. Type Guards

Narrow `unknown` types safely. The codebase uses type guards in components like `MonsterDexEntryComponent`:

```typescript
// Type predicate guard
isMainEntry(entry: PokedexListEntry | PokedexListEntryVariant): entry is PokedexListEntry {
  return 'pokedexVariants' in entry;
}

isSubEntry(entry: PokedexListEntry | PokedexListEntryVariant): entry is PokedexListEntryVariant {
  return 'pokedexId' in entry && !('pokedexVariants' in entry);
}
```

---

## 7. Naming Conventions

| Element                 | Convention        | Example                                |
|-------------------------|-------------------|----------------------------------------|
| Variables, functions    | camelCase         | `getPokemonDetails`, `isActive`        |
| Classes                 | PascalCase        | `PokeApiService`, `HomeComponent`      |
| Interfaces              | PascalCase, no `I`| `Pokemon`, `PokedexListEntry`, `Region`|
| Type aliases            | PascalCase        | `FlattenPokedexList`, `GenerationDataSet` |
| Constants               | SCREAMING_SNAKE   | `API_URL`, `SPRITE_URL`               |
| Files                   | kebab-case        | `poke-api.service.ts`, `monster-page.component.ts` |
| Selectors               | `app-` prefix     | `app-home`, `app-monster-tile`         |
| Generics                | Single uppercase  | `T`                                    |

---

## 8. Import Order

Enforce consistent import ordering:

```typescript
// 1. Angular core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// 2. Angular modules
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// 3. Third-party packages
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgbNav, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

// 4. App-level imports (environment, config)
import { environment } from '../env/environment';

// 5. Models/types
import { Pokemon, PokemonSpecies } from '../models/PokeAPI/pokemon.type';
import { PokedexListEntry } from '../models/monsterDex.type';

// 6. Services
import { PokeApiService } from '../services/poke-api.service';

// 7. Components (if importing in standalone component imports array)
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
```

---

## 9. Prettier Configuration

One `.prettierignore` at the project root. Formatting enforced via:

```bash
prettier --check .   # lint
prettier --write .   # format
```

No ESLint is configured — formatting is handled by Prettier only.

---

## Quick Reference: What is Prohibited

| Pattern                       | Reason                                                  |
|-------------------------------|---------------------------------------------------------|
| `any`                         | Silently breaks type safety at call sites               |
| `var`                         | Function-scoped, hoisted, error-prone                   |
| `require()`                   | CommonJS — not used in Angular ES modules               |
| Blind casting with `as`       | Bypasses type narrowing — use type guards               |
| `@ts-ignore`                  | Suppresses errors silently — fix the type               |
| `@ts-nocheck`                 | Disables entire file — never acceptable                 |
| Unused imports or variables   | Compiler error with `strict: true`                      |
| Implicit `any` parameter      | Compiler error with `strict: true`                      |
| `error.message` without guard | `catch` errors are `unknown` — always narrow first      |
| Hardcoded API URLs            | Always use `environment.API_URL` or `environment.SPRITE_URL` |
| NgModules                     | Project uses standalone components exclusively          |
| `inject()` function           | Codebase uses constructor injection consistently        |
| Tailwind CSS                  | Not installed — use Bootstrap 5 + SCSS                  |
