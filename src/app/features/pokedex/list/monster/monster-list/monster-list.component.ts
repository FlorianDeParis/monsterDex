import { ActivatedRoute } from '@angular/router';
import { Component, effect, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Pokedex } from '../../../../../core/models/PokeAPI/games.type';
import { PokeApiService } from '../../../../../core/services/poke-api.service';
import { PokedexService } from './../../../../../core/services/monster/pokedex.service';
import { MonsterTileComponent } from '../monster-tile/monster-tile.component';
import { HeaderComponent } from '../../../../../core/components/header/header.component';
import { HeaderService } from '../../../../../core/services/components/header.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-monster-list',
  imports: [CommonModule, MonsterTileComponent, HeaderComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.scss',
})
export class MonsterListComponent implements OnInit {
  pokedex$!: Observable<Pokedex>;
  pokedexId!: number;
  pokemonGeneration?: number;

  filter!: Signal<string>;
  filter$!: Observable<string>;
  filteredPokedex$!: Observable<Pokedex>;

  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private pokeApi: PokeApiService,
    private pokedexService: PokedexService,
  ) {
    this.headerService.setSearch(true);
    this.filter = this.headerService.query;
    this.filter$ = toObservable(this.filter);

    this.pokedexId = this.route.snapshot.params['region'];
    this.pokemonGeneration = this.pokedexService.selectPokedexById(
      this.pokedexId,
    )?.generationVariant;

    effect(() => this.filterPokemonList())
  }

  ngOnInit(): void {
    this.pokedex$ = this.pokeApi.getDex(this.pokedexId);
    this.filterPokemonList();
  }

  filterPokemonList(){
    this.filteredPokedex$ = combineLatest([this.pokedex$, this.filter$]).pipe(
      map(([pokedex, filterValue]) => {
        let filteredPokemonList = pokedex.pokemon_entries;
        filteredPokemonList = filteredPokemonList.filter(
          (entry) => entry.pokemon_species.name.toLowerCase().includes(filterValue)
        )
        return { ...pokedex, 'pokemon_entries':filteredPokemonList}
      })
    );
  }
}
