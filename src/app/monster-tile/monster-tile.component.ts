import { MonsterService } from './../core/services/monster.service';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PokemonEntry } from '../core/models/PokeAPI/games.type';
import { CommonModule } from '@angular/common';
import { environment } from '../core/env/environment';
import { Router } from '@angular/router';
import { preventTrailingSlashes } from '../core/utils/url';

@Component({
  selector: 'app-monster-tile',
  imports: [ CommonModule ],
  templateUrl: './monster-tile.component.html',
  styleUrl: './monster-tile.component.scss'
})
export class MonsterTileComponent implements OnInit {
  @Input() pokemon!: PokemonEntry;
  @Input() idDex!: number;
  pokemonGeneration!: number | null;
  imageUrl!: string;

  constructor(private router: Router, private monsterService: MonsterService) {
  }

  ngOnInit(): void {
    console.log('pokemon' + this.pokemon)
    this.pokemonGeneration = this.monsterService.getPokedexPokemonGeneration(this.idDex);
    this.imageUrl = `${environment.SPRITE_URL}/pokemon/${this.getIdMonster(this.pokemon.pokemon_species.url)}.png`;
    // this.imageUrl = this.MonsterService.getPokemonArtworkByIdGeneration(this.getIdMonster(this.pokemon.pokemon_species.url), this.idDex)
    // console.log(this.getIdMonster(this.pokemon.pokemon_species.url), this.idDex);
    //this.MonsterService.getPokemonArtworkByIdGeneration(this.getIdMonster(this.pokemon.pokemon_species.url), this.idDex);
  }

  getIdMonster(url: string): number{
    let monsterUrl = preventTrailingSlashes(url).split('/');
    return parseInt(monsterUrl[monsterUrl.length - 1]);
  }

  goToMonsterPage(idMonster: string): void {
    console.log(idMonster, this.pokemonGeneration, this.idDex);
    this.router.navigateByUrl(`/pokemon/${idMonster}/${this.pokemonGeneration}/${this.idDex}`)
  }
}
