import { Component, Input, OnInit } from '@angular/core';
import { PokemonEntry } from '../core/models/monsterDex.type';
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

  @Input() pokemon!: PokemonEntry
  imageUrl!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.imageUrl = `${environment.SPRITE_URL}/pokemon/${this.getIdMonster(this.pokemon.pokemon_species.url)}.png`;
  }

  getIdMonster(url: string): string{
    let monsterUrl = preventTrailingSlashes(url).split('/');
    return monsterUrl[monsterUrl.length - 1];
  }

  goToMonsterPage(monsterName: string): void {
    this.router.navigateByUrl(`/pokemon/${monsterName}`)
  }
}
