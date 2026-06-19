import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Pokedex } from '../../../../../core/models/PokeAPI/games.type';
import { PokeApiService } from '../../../../../core/services/poke-api.service';
import { PokedexService } from './../../../../../core/services/monster/pokedex.service';
import { MonsterTileComponent } from '../monster-tile/monster-tile.component';

@Component({
  selector: 'app-monster-list',
  imports: [CommonModule, MonsterTileComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.scss',
})
export class MonsterListComponent implements OnInit {
  pokedex$!: Observable<Pokedex>;
  pokedexId!: number;
  pokemonGeneration!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokeApi: PokeApiService,
    private pokedexService: PokedexService
  ) {
    this.pokedexId = this.route.snapshot.params['region'];
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      console.log(navigation.extras.state);
    }
  }

  ngOnInit(): void {
    this.pokedex$ = this.pokeApi.getDex(this.pokedexId);
  }
}
