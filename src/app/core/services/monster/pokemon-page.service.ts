import { PokeApiService } from './../poke-api.service';
import { Injectable } from '@angular/core';
import { toRoman } from "typescript-roman-numbers-converter";

@Injectable({
  providedIn: 'root'
})
export class PokemonPageService {

  constructor(private pokeApiService: PokeApiService ) { }

  // TO DO
  // getPokemonDetailsByIdDex(monsterName: string, idDex: number){

  // }

  // getPokemonArtworkByIdGeneration$(monsterId: number, IdGen: number){
  //   console.log('get PKMN art');
  //   let test = this.pokeApiService.getPokemonDetails(monsterId).pipe(
  //     map((pokemonEntry) => pokemonEntry.sprites),
  //     // tap((data) => console.log(data)),
  //     //map(spriteObj => spriteObj)
  //   ).subscribe();
  // }

  // filterSpriteObjectByDexGen$(spriteObj:PokemonSprites, IdGen:number){
  //   //
  // }
}
