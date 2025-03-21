import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../core/services/poke-api.service';
import { Observable, tap } from 'rxjs';
import { Pokedex } from '../core/models/monsterDex.type';
import { CommonModule } from '@angular/common';
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

  pokedex$!: Observable<Pokedex>

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
