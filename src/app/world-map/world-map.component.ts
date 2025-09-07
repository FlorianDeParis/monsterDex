import { Component, Input, OnInit } from '@angular/core';
import { TileMapComponent } from './tile-map/tile-map.component';

interface Position {
  x: number;
  y: number;
}

interface Places {
  [key: string]: Position;
}

@Component({
  selector: 'app-world-map',
  imports: [TileMapComponent],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.scss',
})
export class WorldMapComponent implements OnInit {
  @Input() pokemonGeneration!: string;
  qtyWidthDiv = 20;
  qtyHeightDiv = 17;
  maxHeight!: any[];
  maxWidth!: any[];

  places: Places = {
    'bourg-palette': { x: 4, y: 11 },
    jadielle: { x: 4, y: 8 },
    safrania: { x: 12, y: 5 },
    'route-victoire': { x: 2, y: 4 },
  };

  constructor() {}

  ngOnInit() {
    this.maxHeight = [...Array(this.qtyHeightDiv).keys()];
    this.maxWidth = [...Array(this.qtyWidthDiv).keys()];
  }

  checkTile(x: number, y: number): boolean {
    return Boolean(
      Object.values(this.places).find(
        (position) => position.x === x && position.y === y,
      ),
    );
  }

  isDisplayableMap(generation: string): boolean {
    // Map currently avaialble for 1st pokemon generation
    return (parseInt(generation) === 1)
  }
}
