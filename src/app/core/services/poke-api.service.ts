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
    return this.http.get<Pokemon>(`${environment.API_URL}/pokemon/${monsterName}`);
  }
}
