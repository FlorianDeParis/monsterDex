import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Pokedex } from '../core/models/monsterDex.type';
import { PokeApiService } from '../core/services/poke-api.service';
import { MonsterTileComponent } from '../monster-tile/monster-tile.component';

@Component({
  selector: 'app-monster-list',
  imports: [
    CommonModule,
    MonsterTileComponent
  ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.scss'
})
export class MonsterListComponent implements OnInit {
  pokedex$!: Observable<Pokedex>;

  constructor(private pokeApi: PokeApiService){}

  ngOnInit(): void {

    this.pokeApi.getKantoDex().pipe(
      tap(data => console.log(data))
    ).subscribe();

    this.pokedex$ = this.pokeApi.getKantoDex().pipe(
      tap(data => console.log(data))
    );
  }
}
