import { PokeApiService } from './../poke-api.service';
import { Injectable } from '@angular/core';
import { toRoman } from 'typescript-roman-numbers-converter';
import {
  PokemonSprites,
  PokemonSpritesVersions,
} from '../../models/PokeAPI/pokemon.type';
import { ToasterService } from '../toaster.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonPageService {
  constructor(
    private pokeApiService: PokeApiService,
    private toaster: ToasterService,
  ) {}

  // TO DO
  // getPokemonDetailsByIdDex(monsterName: string, idDex: number){

  // }

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
    console.log('returnedSprite', returnedSprite);
    return returnedSprite as string;
  }

  getMyObjectValueCastedKey(myObject: any, key: string): any {
    return myObject[key as keyof typeof myObject];
  }
}
