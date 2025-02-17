import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) {

  }

  getKantoDex(): Observable<unknown> {
    return this.http.get<unknown>('https://pokeapi.co/api/v2/pokedex/2/');
  }
}
