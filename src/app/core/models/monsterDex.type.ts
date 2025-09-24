export interface PokedexListEntry {
  label: string;
  generation?: number | null;
  pokedexVariants: PokedexListEntryVariant[];
}

export interface PokedexListEntryVariant {
  pokedexId: number;
  pokedexVariantName: string;
}

export interface PokedexListEntryFlattened extends PokedexListEntryVariant {
  label: string;
  generation?: number | null;
}

export interface SimplifiedEncounter {
  name: string;
  encounters: number[] | number[][];
}

export interface MapMarker {
  name: string;
  coordinates: number[];
}

export interface GenerationGames {
  generation: number;
  games: string[];
}
