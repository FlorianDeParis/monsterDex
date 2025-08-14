import { toRoman } from "typescript-roman-numbers-converter";
import { PokemonSprites } from './../models/PokeAPI/pokemon.type';
import { PokeApiService } from './poke-api.service';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { PokedexList } from "../env/config";
import { PokedexListEntry } from "../models/monsterDex.type";

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  pokedexList!: PokedexListEntry[];

  constructor(private PokeApiService: PokeApiService) {
    this.pokedexList = PokedexList;
  }

  getPokedexList():PokedexListEntry[] {
    return this.pokedexList;
  }

  getPokedexPokemonGeneration(pokedexId: number): number | null {
    console.log('POKEDEX ID' + pokedexId);
    const poke = this.getPokedexList().find(
      (entry) => entry?.pokedexVariants.find(variant => variant.pokedexId == pokedexId)
    );
    console.log("GEN "+poke?.generation );
    return (poke?.generation || null);
  }

  // TO DO
  // getPokemonDetailsByIdDex(monsterName: string, idDex: number){

  // }

  getPokemonArtworkByIdGeneration(monsterId: number, IdGen: number){
    // console.log('get PKMN art');
    let test = this.PokeApiService.getPokemonDetails(monsterId).pipe(
      map((pokemonEntry) => pokemonEntry.sprites),
      // tap((data) => console.log(data)),
      //map(spriteObj => spriteObj)
    ).subscribe();
  }

  filterSpriteObjectByDexGen$(spriteObj:PokemonSprites, IdGen:number){
    //
  }
}
