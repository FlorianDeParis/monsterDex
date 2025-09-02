import { Component, OnInit } from '@angular/core';
import { TileMapComponent } from "./tile-map/tile-map.component";

@Component({
  selector: 'app-kanto-map',
  imports: [TileMapComponent],
  templateUrl: './kanto-map.component.html',
  styleUrl: './kanto-map.component.scss'
})
export class KantoMapComponent implements OnInit{
  qtyWidthDiv: number = 20
  qtyHeightDiv: number = 17
  maxHeight!: any[]
  maxWidth!: any[]

  places = {
    'bourg-palette': [4,11],
    'jadielle': [4,8],
    'safrania': [12,5],
    'route-victoire': [2,4],
  }

  constructor(){}
  ngOnInit() {
    this.maxHeight = Array.from(Array(this.qtyHeightDiv).keys());
    this.maxWidth = Array.from(Array(this.qtyWidthDiv).keys());
  }

  checkTile(x: number, y: number): boolean{
    const hasAPlace = Object.entries(this.places).filter(
      (place) => (place[1][0] == x && place[1][1] == y)
    )
    console.log(hasAPlace.length > 0);
    return (hasAPlace.length > 0) ;
  }
}
