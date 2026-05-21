import { Injectable } from '@angular/core';
import { PokedexList } from '../../env/config';
import { PokedexListEntry, PokemonFlattenedEntry} from '../../models/monsterDex.type';

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

  selectPokedexById(pokedexId: number):PokemonFlattenedEntry {
    const poke = this.getPokedexList().map((entry) => {
      let selectedVariant = entry?.pokedexVariants.find(
        (variant) => variant.pokedexId == pokedexId
      )

      let flatten = {
        "label":entry.label,
        "imgPath":entry.imgPath,
        ...selectedVariant
      };

      return selectedVariant ? flatten : false;
    }).filter((e) => e);

    return poke[0] as PokemonFlattenedEntry;
  }
}
