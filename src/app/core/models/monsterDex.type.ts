export interface PokedexListEntry {
  label: string;
  generation?: number | null;
  pokedexVariants: PokedexListEntryVariant[];
}

export interface PokedexListEntryVariant {
  pokedexId: number;
  pokedexVariantName: string;
}
