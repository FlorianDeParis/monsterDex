import { Component } from '@angular/core';
import { Pokedex } from '../../core/models/PokeAPI/games.type';
import { PokedexListEntry } from '../../core/models/monsterDex.type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MonsterDexEntryComponent } from '../monster-dex-entry/monster-dex-entry.component';
import { MonsterService } from '../../core/services/monster.service';

interface FlattenPokedexEntry {
  label: string;
  pokedexId: number;
  pokedexVariantName: string;
};

interface FlattenPokedexList extends Array<FlattenPokedexEntry> {};


@Component({
  selector: 'app-monster-dex-list-page',
  imports: [
    CommonModule,
    MonsterDexEntryComponent
  ],
  templateUrl: './monster-dex-list-page.component.html',
  styleUrl: './monster-dex-list-page.component.scss'
})
export class MonsterDexListPageComponent {
  pokedexList!: PokedexListEntry[];
  pokedexListFlatten!: FlattenPokedexList;

  constructor(private route: Router, private monsterService: MonsterService) {
    this.pokedexList = this.monsterService.getPokedexList();
  }

  goToDex(dexId: number):void {
    this.route.navigateByUrl(`/pokedex/${dexId}`);
  }

  onKeyDown(event: KeyboardEvent) {

    // switch (event.key) {
    //   case 'Enter':
    //       // this.menuOpened = true;
    //       // // make sure that the menu is open before setting focus
    //       // setTimeout(() => this.multiLevelDropDown.setFocusOnFirstMenuItem(), 1);
    //       break;

    //   case 'Tab':
    //   case 'ArrowDown':
    //     // if (this.menuOpened) {

    //     //   this.menuOpened = false;

    //     // }
    //     // event.preventDefault();
    //     console.log(event);

    //     break;

    // }
  }

}
