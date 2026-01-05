// Pokedex List

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

//Encounters
export interface SimplifiedEncounter {
  name: string;
  encounters: number[] | number[][];
}


// Map, markers & regions
export interface RegionMarkerList {
  name: string;
  size: number[];
  markers: MapMarker[];
}

export interface MapMarker {
  name: string;
  coordinates: number[];
}

export interface Region {
  name: string;
  id: number;
  size: number[];
  locations: Location[];
}

export interface Location {
  name: string;
  coordinates: number[][];
  locationareas: LocationArea[];
}

export interface LocationArea {
  name: string;
  id: number;
}


export interface GenerationGames {
  generation: number;
  games: string[];
}
