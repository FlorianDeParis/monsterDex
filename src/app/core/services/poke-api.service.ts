import { pokedex } from '../models/monsterDex.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) {}

  getKantoDex(): Observable<pokedex> {
    return this.http.get<pokedex>('https://pokeapi.co/api/v2/pokedex/2/');
  }
}
