import { Component } from '@angular/core';
import { PokedexListEntry } from '../core/models/monsterDex.type';
import { pokedexList as pokedexListConfig } from '../core/env/config';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-dex-list',
  imports: [CommonModule],
  templateUrl: './monster-dex-list.component.html',
  styleUrl: './monster-dex-list.component.scss'
})
export class MonsterDexListComponent {
  pokedexList!: PokedexListEntry[];

  constructor(private route: Router) {
    this.pokedexList = pokedexListConfig;
  }

  goToDex(dexId: number):void {
    this.route.navigateByUrl(`/pokedex/${dexId}`);
  }
}
