import { PokedexService } from '../core/services/monster/pokedex.service';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PokemonEntry } from '../core/models/PokeAPI/games.type';
import { CommonModule } from '@angular/common';
import { environment } from '../core/env/environment';
import { Router } from '@angular/router';
import { preventTrailingSlashes } from '../core/utils/url';

@Component({
  selector: 'app-monster-tile',
  imports: [CommonModule],
  templateUrl: './monster-tile.component.html',
  styleUrl: './monster-tile.component.scss',
})
export class MonsterTileComponent implements OnInit {
  @Input() pokemon!: PokemonEntry;
  @Input() idDex!: number;
  pokemonNationalId!: number;
  pokemonGeneration!: number | null;
  imageUrl!: string;

  constructor(
    private router: Router,
    private pokedexService: PokedexService,
  ) {}

  ngOnInit(): void {
    this.pokemonNationalId = this.getIdMonster(
      this.pokemon.pokemon_species.url,
    );
    this.pokemonGeneration = this.pokedexService.getPokedexPokemonGeneration(
      this.idDex,
    );
    this.imageUrl = `${environment.SPRITE_URL}/pokemon/${this.pokemonNationalId}.png`;
  }

  getIdMonster(url: string): number {
    let monsterUrl = preventTrailingSlashes(url).split('/');
    return parseInt(monsterUrl[monsterUrl.length - 1]);
  }

  goToMonsterPage(): void {
    this.router.navigateByUrl(
      `/pokemon/${this.pokemonNationalId}/${this.pokemonGeneration}/${this.idDex}`,
    );
  }
}
