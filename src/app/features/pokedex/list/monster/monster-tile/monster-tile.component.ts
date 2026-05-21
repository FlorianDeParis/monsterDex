import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokedexService } from '../../../../../core/services/monster/pokedex.service';
import { PokemonEntry } from '../../../../../core/models/PokeAPI/games.type';
import { environment } from '../../../../../core/env/environment';
import { preventTrailingSlashes } from '../../../../../core/utils/url';
import { PokemonFlattenedEntry } from '../../../../../core/models/monsterDex.type';

@Component({
  selector: 'app-monster-tile',
  imports: [CommonModule],
  templateUrl: './monster-tile.component.html',
  styleUrl: './monster-tile.component.scss',
})
export class MonsterTileComponent implements OnInit {
  @Input() pokemon!: PokemonEntry;
  @Input() idDex!: number;
  @Input() generation!: number;
  pokemonNationalId!: number;
  imageUrl!: string;

  constructor(
    private router: Router,
    private pokedexService: PokedexService,
  ) {}

  ngOnInit(): void {
    this.pokemonNationalId = this.getIdMonster(
      this.pokemon.pokemon_species.url,
    );

    this.imageUrl = `${environment.SPRITE_URL}/pokemon/${this.pokemonNationalId}.png`;
  }

  getIdMonster(url: string): number {
    let monsterUrl = preventTrailingSlashes(url).split('/');
    return parseInt(monsterUrl[monsterUrl.length - 1]);
  }

  goToMonsterPage(): void {
    this.router.navigateByUrl(
      `/pokemon/${this.pokemonNationalId}/${this.generation}/${this.idDex}`,
    );
  }
}
