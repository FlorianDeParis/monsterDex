import { Pokedex } from '../models/monsterDex.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  
  constructor(private http: HttpClient) {}
  
  getKantoDex(): Observable<Pokedex> {
    return this.http.get<Pokedex>('https://pokeapi.co/api/v2/pokedex/2/');
  }
}
