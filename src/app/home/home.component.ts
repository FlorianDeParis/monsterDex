import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Pokedex, PokedexListEntry } from '../core/models/monsterDex.type';
import { pokedexList } from '../core/env/config';
import { PokeApiService } from '../core/services/poke-api.service';
import { MonsterTileComponent } from '../monster-tile/monster-tile.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MonsterTileComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  pokedex$!: Observable<Pokedex>;
  pokedexList!: PokedexListEntry[];

  constructor(private pokeApi: PokeApiService){
    this.pokedexList = pokedexList;
  }

  ngOnInit(): void {

    this.pokeApi.getKantoDex().pipe(
      tap(data => console.log(data))
    ).subscribe();

    this.pokedex$ = this.pokeApi.getKantoDex().pipe(
      tap(data => console.log(data))
    );
  }
}
