import { Injectable } from '@angular/core';
import { PokedexList } from '../../env/config';
import {
  PokedexListEntry,
  PokedexListEntryFlattened,
} from '../../models/monsterDex.type';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  pokedexList!: PokedexListEntry[];

  constructor() {
    this.pokedexList = PokedexList;
  }

  getPokedexList(): PokedexListEntry[] {
    return this.pokedexList;
  }

  getCurrentPokedexData(pokedexId: number): PokedexListEntryFlattened {
    const pokedexes = this.getPokedexList();
    return pokedexes
      .reduce((acc, pokedex) => {
        const { label, generation } = pokedex;
        return [
          ...acc,
          pokedex.pokedexVariants.map((variante) => ({
            label,
            generation,
            pokedexVariantName: variante.pokedexVariantName,
            pokedexId: variante.pokedexId,
          })),
        ];
      }, [] as any)
      .flatMap((x: PokedexListEntryFlattened) => x)
      .find(
        (flattenedEntry: PokedexListEntryFlattened) =>
          flattenedEntry.pokedexId === pokedexId,
      );
  }

  getPokedexPokemonGeneration(pokedexId: number): number | null {
    const poke = this.getPokedexList().find((entry) =>
      entry?.pokedexVariants.find((variant) => variant.pokedexId == pokedexId),
    );
    console.log(
      `Pokedex Id: ${pokedexId}, Pokemon generation: ${poke?.generation}`,
    );
    return poke?.generation || null;
  }
}
