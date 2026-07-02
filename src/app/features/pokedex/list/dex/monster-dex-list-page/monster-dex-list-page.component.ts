import { Component } from '@angular/core';
import { Pokedex } from '../../../../../core/models/PokeAPI/games.type';
import { PokedexListEntry } from '../../../../../core/models/monsterDex.type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MonsterDexEntryComponent } from '../monster-dex-entry/monster-dex-entry.component';
import { PokedexService } from '../../../../../core/services/monster/pokedex.service';

interface FlattenPokedexEntry {
  label: string;
  pokedexId: number;
  pokedexVariantName: string;
}

interface FlattenPokedexList extends Array<FlattenPokedexEntry> {}

@Component({
  selector: 'app-monster-dex-list-page',
  imports: [CommonModule, MonsterDexEntryComponent],
  templateUrl: './monster-dex-list-page.component.html',
  styleUrl: './monster-dex-list-page.component.scss',
})
export class MonsterDexListPageComponent {
  pokedexList!: PokedexListEntry[];
  pokedexListFlatten!: FlattenPokedexList;

  constructor(
    private route: Router,
    private pokedexService: PokedexService,
  ) {
    this.pokedexList = this.pokedexService.getPokedexList();
  }

  goToDex(dexId: number): void {
    this.route.navigateByUrl(`/pokedex/${dexId}`);
  }
}
