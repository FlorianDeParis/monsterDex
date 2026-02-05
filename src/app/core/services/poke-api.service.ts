import { environment } from '../env/environment';
import { Pokedex } from '../models/PokeAPI/games.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationAreaEncounter, Pokemon, PokemonSpecies } from '../models/PokeAPI/pokemon.type';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  getDex(idDex: number): Observable<Pokedex> {
    return this.http.get<Pokedex>(
      `${environment.API_URL}/pokedex/${idDex}/`,
    );
  }

  getPokemonDetails(monsterName: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `${environment.API_URL}/pokemon/${monsterName}`,
    );
  }

  getPokemonEncounters(
    monsterName: string | number,
  ): Observable<LocationAreaEncounter[]> {
    return this.http.get<LocationAreaEncounter[]>(
      `${environment.API_URL}/pokemon/${monsterName}/encounters`,
    );
  }

  getPokemonSpeciesDetails(monsterName: string | number): Observable<PokemonSpecies>{
    return this.http.get<PokemonSpecies>(
      `${environment.API_URL}/pokemon-species/${monsterName}`
    );
  }
}
