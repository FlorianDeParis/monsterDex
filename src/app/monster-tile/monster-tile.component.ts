import { Component, Input, OnInit } from '@angular/core';
import { PokemonEntry } from '../core/models/monsterDex.type';

@Component({
  selector: 'app-monster-tile',
  imports: [],
  templateUrl: './monster-tile.component.html',
  styleUrl: './monster-tile.component.scss'
})
export class MonsterTileComponent implements OnInit {
  
  @Input() pokemon!: PokemonEntry
  imageUrl = '';
  
  constructor() {
  }
  
  ngOnInit(): void {
    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.entry_number}.png`
  }
}
