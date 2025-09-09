import { PokeApiService } from './../poke-api.service';
import { Injectable } from '@angular/core';
import { toRoman } from 'typescript-roman-numbers-converter';
import {
  LocationAreaEncounter,
  PokemonSprites,
  PokemonSpritesVersions,
} from '../../models/PokeAPI/pokemon.type';
import { ToasterService } from '../toaster.service';

import { tap, map } from 'rxjs';
import { EncountersService } from './encounters.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonPageService {
  constructor(
    private toaster: ToasterService,
    private encountersService: EncountersService
  ) {}

  getPokemonArtworkByIdGeneration(
    spriteObject: PokemonSprites,
    IdGen: string,
  ): string {
    const romanGeneration = toRoman(parseInt(IdGen)).toLowerCase();
    let returnedSprite = spriteObject.front_default;
    let spriteFront = null;
    if (typeof spriteObject.versions !== 'undefined') {
      const generationKey = 'generation-' + romanGeneration;
      let spriteWithGen = this.getMyObjectValueCastedKey(
        spriteObject.versions,
        generationKey,
      );
      if (spriteWithGen) {
        const indexesWithoutIcons = Object.keys(spriteWithGen).filter(
          (index) => index != 'icons',
        ); // Ignore icon object when fetching sprites
        if (indexesWithoutIcons.length > 0) {
          spriteFront = this.getMyObjectValueCastedKey(
            spriteWithGen[indexesWithoutIcons[0]],
            'front_default',
          );
        }
      }
      if (spriteWithGen && spriteFront) {
        returnedSprite = spriteFront;
      } else {
        this.toaster.error(
          'Sprite non trouvé, chargement du sprite par défaut',
        );
      }
    }
    return returnedSprite as string;
  }

  getMyObjectValueCastedKey(myObject: any, key: string): any {
    return myObject[key as keyof typeof myObject];
  }
}
