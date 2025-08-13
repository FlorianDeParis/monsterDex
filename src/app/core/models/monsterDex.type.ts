export interface PokedexListEntry {
  label: string;
  pokedexVariants: PokedexListEntryVariant[];
}

export interface PokedexListEntryVariant {
  pokedexId: number;
  pokedexVariantName: string;
}
