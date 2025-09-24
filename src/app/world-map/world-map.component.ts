import { Component, Input, OnInit } from '@angular/core';
import { TileMapComponent } from './tile-map/tile-map.component';
import { MapMarker } from '../core/models/monsterDex.type';
import { EncountersService } from '../core/services/monster/encounters.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MapService } from '../core/services/monster/map.service';

interface Position {
  x: number;
  y: number;
}

interface Places {
  [key: string]: Position;
}

@Component({
  selector: 'app-world-map',
  imports: [TileMapComponent, AsyncPipe],
  providers: [MapService],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.scss',
})
export class WorldMapComponent implements OnInit {
  @Input() pokemonGeneration!: string;
  @Input() pokemonId!: string;
  qtyWidthDiv = 20;
  qtyHeightDiv = 17;
  maxHeight!: any[];
  maxWidth!: any[];
  places$!: Observable<MapMarker[]>;

  constructor(
    private encountersService: EncountersService,
    private mapService: MapService,
  ) {}

  ngOnInit() {
    this.places$ = this.mapService.getMapMarkers(
      this.pokemonId,
      this.pokemonGeneration,
    );
    this.maxHeight = [...Array(this.qtyHeightDiv).keys()];
    this.maxWidth = [...Array(this.qtyWidthDiv).keys()];
  }

  checkTile$(x: number, y: number, places: MapMarker[]): boolean {
    let flag = false;
    places.map((e) => {
      if (e.coordinates[0] === x && e.coordinates[1] === y) {
        flag = true;
      }
    });
    return flag;
  }

  isDisplayableMap(generation: string): boolean {
    // Map currently avaialble for 1st pokemon generation
    return parseInt(generation) === 1;
  }
}
