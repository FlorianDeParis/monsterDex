import { PokeApiService } from './../poke-api.service';
import { Injectable } from '@angular/core';
import { toRoman } from "typescript-roman-numbers-converter";
import { PokemonSprites } from '../../models/PokeAPI/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class PokemonPageService {

  constructor(private pokeApiService: PokeApiService) { }

  // TO DO
  // getPokemonDetailsByIdDex(monsterName: string, idDex: number){

  // }

  getPokemonArtworkByIdGeneration(spriteObject: PokemonSprites, IdGen: string){
    const romanGeneration = toRoman(parseInt(IdGen)).toLowerCase();
    const genKey = `generation-${romanGeneration}`;
    console.log(spriteObject, IdGen, romanGeneration);
    const gentObj = (spriteObject.versions?[genKey][0].front_default) || spriteObject.front_default;
    console.log(spriteObject.versions?.[genKey]);
  }

  // filterSpriteObjectByDexGen$(spriteObj:PokemonSprites, IdGen:number){
  //   //
  // }
}
