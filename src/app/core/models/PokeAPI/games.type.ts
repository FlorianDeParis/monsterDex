import { Description, Name, NamedAPIResource } from './utilities.type';

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
