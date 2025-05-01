import { environment } from '../env/environment';
import { Pokedex } from '../models/PokeAPI/games.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemon } from '../models/PokeAPI/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) {}

  getDex(idDex: number): Observable<Pokedex> {
    return this.http.get<Pokedex>(`https://pokeapi.co/api/v2/pokedex/${idDex}/`);
  }

  getPokemonDetails(monsterName: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.API_URL}/pokemon/${monsterName}`).pipe(
      map((pokemon: Pokemon) => this.formatedPokemonDatas(pokemon))
    );
  }

  formatedPokemonDatas(pokemon: Pokemon): Pokemon {
    let formattedPokemon = {
      ...pokemon,
      'height': (pokemon.height / 10) // must divide by 10 because height (in metters) is in two digits
    };
    return formattedPokemon;
  }
}
