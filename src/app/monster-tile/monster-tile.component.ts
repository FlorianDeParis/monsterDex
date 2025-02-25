import { Component, Input } from '@angular/core';
import { PokemonEntry } from '../core/models/monsterDex.type';

@Component({
  selector: 'app-monster-tile',
  imports: [],
  templateUrl: './monster-tile.component.html',
  styleUrl: './monster-tile.component.scss'
})
export class MonsterTileComponent {

  @Input() pokemon!: PokemonEntry

  constructor(){

  }
}
