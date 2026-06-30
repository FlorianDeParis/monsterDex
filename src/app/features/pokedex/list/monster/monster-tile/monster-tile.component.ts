import { PokemonSpecies } from './../../../../../core/models/PokeAPI/pokemon.type';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokedexService } from '../../../../../core/services/monster/pokedex.service';
import { PokemonEntry } from '../../../../../core/models/PokeAPI/games.type';
import { environment } from '../../../../../core/env/environment';
import { preventTrailingSlashes } from '../../../../../core/utils/url';
import { PokeApiService } from '../../../../../core/services/poke-api.service';
import { map, tap } from 'rxjs';
import { toArabic } from 'typescript-roman-numbers-converter';

@Component({
  selector: 'app-monster-tile',
  imports: [CommonModule],
  templateUrl: './monster-tile.component.html',
  styleUrl: './monster-tile.component.scss',
})
export class MonsterTileComponent implements OnInit {
  @Input() pokemon!: PokemonEntry;
  @Input() idDex!: number;
  @Input() generation?: number;
  pokemonNationalId!: number;
  imageUrl!: string;

  constructor(
    private router: Router,
    private pokedexService: PokedexService,
    private pokeApi: PokeApiService
  ) {}

  ngOnInit(): void {
    this.pokemonNationalId = this.getIdMonster(
      this.pokemon.pokemon_species.url,
    );

    this.imageUrl = `${environment.SPRITE_URL}/pokemon/${this.pokemonNationalId}.png`;
    // console.log(this);
  }

  getIdMonster(url: string): number {
    let monsterUrl = preventTrailingSlashes(url).split('/');
    return parseInt(monsterUrl[monsterUrl.length - 1]);
  }

  goToMonsterPage(): void {
    if(!this.generation){
      // Navigate to pokemon page with generation introduced
      this.pokeApi.getPokemonSpeciesDetails(this.pokemon.entry_number).pipe(
        map(species => {
          const generation = toArabic(species.generation.name.split('-')[1]);
           this.router.navigate(
            [`/pokemon/${this.pokemonNationalId}/${generation}/${this.idDex}`],
            // We send 'species' object to prevent another query once redirected
            { state: { 'species': {...species}}}
          );
        })
      ).subscribe();
    } else {
      this.router.navigateByUrl(
        `/pokemon/${this.pokemonNationalId}/${this.generation}/${this.idDex}`,
      );
    }
  }
}
