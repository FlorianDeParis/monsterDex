// Pokedex List

export interface PokedexListEntry {
  label: string;
  imgPath?: string;
  pokedexVariants: PokedexListEntryVariant[];
}

export interface PokedexListEntryVariant {
  pokedexId: number;
  pokedexVariantName: string;
  isAvailable?: boolean;
  generationVariant?: number;
}

export interface PokemonFlattenedEntry {
  label: string;
  imgPath?: string;
  pokedexId: number;
  pokedexVariantName: string;
  isAvailable?: boolean;
  generationVariant?: number;
}

//Encounters
export interface SimplifiedEncounter {
  name: string;
  encounters: number[] | number[][];
}


// Map, markers & regions
export interface RegionMarkerList {
  name: string;
  subregions: SubRegionMarkerList[];
}

export interface SubRegionMarkerList {
  name: string;
  id: string;
  size: number[];
  markers: MapMarker[];
}

export interface MapMarker {
  area: string;
  name: string;
  coordinates: number[];
}

export interface Region {
  name: string;
  id: number;
  subregions: Subregion[];
}

export interface Subregion {
  name: string;
  id: string;
  size: number[];
  locations: Location[];
}

export interface Location {
  name: string;
  coordinates: number[][];
  area: string;
}


export interface GenerationGames {
  generation: number;
  games: string[];
}
