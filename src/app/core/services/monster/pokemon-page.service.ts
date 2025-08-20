import { PokeApiService } from './../poke-api.service';
import { Injectable } from '@angular/core';
import { toRoman } from "typescript-roman-numbers-converter";
import { PokemonSprites, PokemonSpritesVersions } from '../../models/PokeAPI/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class PokemonPageService {

  constructor(private pokeApiService: PokeApiService) { }

  // TO DO
  // getPokemonDetailsByIdDex(monsterName: string, idDex: number){

  // }

  getPokemonArtworkByIdGeneration(spriteObject: PokemonSprites, IdGen: string): string{
    const romanGeneration = toRoman(parseInt(IdGen)).toLowerCase();
    let returnedSprite = spriteObject.front_default;
    let spriteFront = null;
    if(typeof spriteObject.versions !== "undefined"){
      const generationKey = ('generation-'+romanGeneration);
      let spriteWithGen = this.getMyObjectValueCastedKey(spriteObject.versions, generationKey);
      if(spriteWithGen){
        spriteFront = this.getMyObjectValueCastedKey(spriteWithGen[Object.keys(spriteWithGen)[0]], 'front_default');
      }
      if(spriteWithGen && spriteFront){
        returnedSprite = spriteFront;
      }
    }
    return returnedSprite as string;
  }

  getMyObjectValueCastedKey(myObject: any, key: string): any {
    return myObject[key as keyof typeof myObject];
  }

  // filterSpriteObjectByDexGen$(spriteObj:PokemonSprites, IdGen:number){
  //   //
  // }
}
