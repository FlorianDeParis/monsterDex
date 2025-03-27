import { Pokedex } from './../core/models/monsterDex.type';
import { Component } from '@angular/core';
import { PokedexListEntry } from '../core/models/monsterDex.type';
import { pokedexList as pokedexListConfig } from '../core/env/config';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface FlattenPokedexEntry {
  label: string;
  pokedexId: number;
  pokedexVariantName: string;
};

interface FlattenPokedexList extends Array<FlattenPokedexEntry> {};


@Component({
  selector: 'app-monster-dex-list',
  imports: [CommonModule],
  templateUrl: './monster-dex-list.component.html',
  styleUrl: './monster-dex-list.component.scss'
})
export class MonsterDexListComponent {
  pokedexList!: PokedexListEntry[];
  pokedexListFlatten!: FlattenPokedexList;

  constructor(private route: Router) {
    this.pokedexList = pokedexListConfig;
    // this.pokedexListFlatten = pokedexListConfig.flatMap((m) => {
    //   return m.pokedexVariants.map((n) =>
    //     ({
    //       label: m.label,
    //       pokedexId: n.pokedexId,
    //       pokedexVariantName: n.pokedexVariantName
    //     })
    //   );
    // });
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
