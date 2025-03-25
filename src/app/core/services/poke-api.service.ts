import { environment } from '../env/environment';
import { Pokedex } from '../models/monsterDex.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/monsterDetails.type';

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
