import { FlavorText } from './../../models/PokeAPI/utilities.type';
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

import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import * as gameGenList from '../../../../../public/assets/data/generations/game-list.json';

@Injectable({
  providedIn: 'root',
})
export class PokemonPageService {
  constructor(
    private toaster: ToasterService,
    private encountersService: EncountersService,
    private sanitizer: DomSanitizer
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

  filterPokemonFlavorTextEntriesByIdGeneration(
    flavorTextList: FlavorText[],
    IdGen: string,
    locale='en'
  ): FlavorText[] {
    const currentGenGameList = this.getMyObjectValueCastedKey(gameGenList.generationList[0],IdGen);

    let filtered = flavorTextList.filter(
      (flavorText) => currentGenGameList.includes(flavorText.version.name) && flavorText.language.name === locale
    )

    if(filtered.length === 0){
      let fallbackfiltered = flavorTextList.filter(
        (flavorText) => currentGenGameList.includes(flavorText.version.name) && flavorText.language.name === 'en'
      )
      filtered = fallbackfiltered;
    }

    filtered = filtered.map(
      (FlavorText) => ({
        ...FlavorText,
        flavor_text: FlavorText.flavor_text.replace(/[\r\n\f]/g, " ")
      })
    )

    return filtered;
  }
}
