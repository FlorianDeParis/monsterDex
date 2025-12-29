import { Component, Input, OnInit, signal } from '@angular/core';
import { TileMapComponent } from './tile-map/tile-map.component';
import { MapMarker, RegionMarkerList } from '../core/models/monsterDex.type';
import { EncountersService } from '../core/services/monster/encounters.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
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
  imports: [AsyncPipe, JsonPipe],
  providers: [MapService],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.scss',
})
export class WorldMapComponent implements OnInit {
  @Input() pokemonGeneration!: string;
  @Input() pokemonId!: string;
  @Input() region!: string;
  places$!: Observable<RegionMarkerList[]>;

  constructor(
    private encountersService: EncountersService,
    private mapService: MapService,
  ) {}

  ngOnInit() {
    this.places$ = this.mapService.getMapMarkers(
      this.pokemonId,
      this.pokemonGeneration,
    );
  }

  checkTile$(x: number, y: number, regionMarkerList: RegionMarkerList): boolean {
    let flag = false;
    regionMarkerList.markers.map((e) => {
      if (e.coordinates[0] === x && e.coordinates[1] === y) {
        flag = true;
      }
    });
    return flag;
  }

  isDisplayableMap(generation: string): boolean {
    // Authorize some regions to be displayable
    return [1,2].includes(+generation);
  }

  getWorldMapClass(region:string, gen:string): string{
    return `${region}-${gen}`;
  }

  getSize(value: number): number[] {
    return [...Array(value).keys()]
  }

  getMapStyle(markerList: RegionMarkerList): {} {
    return {
      'aspect-ratio': markerList.size[0]+'/'+markerList.size[1],
      'width': '300px'
    };
  }

  transformMatrixToRelativeCoordinates(markerList: RegionMarkerList) {
    const regionSizes: number[] = markerList.size;
    const percentScale: number[] = [(100/regionSizes[0]), (100/regionSizes[1])]
    let newMarkerList = markerList.markers.map(
      (marker) => {
        // console.log(marker.coordinates);
        let percentX = (marker.coordinates[0] * percentScale[0]) + (percentScale[0] / 2);
        let percentY = (marker.coordinates[1] * percentScale[1]) + (percentScale[1] / 2);
        return {...marker, 'coordinates':[percentX, percentY]}
      }
    );

    console.log('old -> new', markerList, {...markerList,'markers':newMarkerList});
    return {...markerList,'markers':newMarkerList}
  }

}
