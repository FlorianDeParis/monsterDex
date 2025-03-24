import { Description, Name, NamedAPIResource } from "./monsterUtilities.type"
export interface PokedexListEntry {
  label: string;
  pokedexVariants: PokedexListEntryVariant[];
}

export interface PokedexListEntryVariant {
  pokedexId: number;
  pokedexVariantName: string;
}


// Poke API Types

export interface PokemonEntry {
  entry_number: number;
  pokemon_species: NamedAPIResource;
}

export interface Pokedex {
  descriptions: Description[];
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon_entries: PokemonEntry[];
  region: NamedAPIResource;
  version_groups: NamedAPIResource[];
}
