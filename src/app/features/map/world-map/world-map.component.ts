import { Component, Input, OnInit, signal } from '@angular/core';
import { TileMapComponent } from './tile-map/tile-map.component';
import { MapMarker, RegionMarkerList, Region } from '../../../core/models/monsterDex.type';
import { EncountersService } from '../../../core/services/monster/encounters.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MapService } from '../../../core/services/monster/map.service';

interface Position {
  x: number;
  y: number;
}

interface Places {
  [key: string]: Position;
}

@Component({
  selector: 'app-world-map',
  imports: [AsyncPipe, JsonPipe, TileMapComponent],
  providers: [MapService],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.scss',
})
export class WorldMapComponent implements OnInit {
  @Input() debug: boolean = false;
  @Input() pokemonGeneration!: string;
  @Input() pokemonId!: string;
  @Input() region!: string;
  isDisplayable: boolean = false;
  oldPlaces$!: Observable<RegionMarkerList[]>;
  places$!: Observable<RegionMarkerList[]>;
  allPlaces: Region[] = [];

  constructor(
    private encountersService: EncountersService,
    private mapService: MapService,
  ) {}
  ngOnInit() {
    if(this.isMapAllowed(this.pokemonGeneration)){
      this.isDisplayable = true;
      this.places$ = this.mapService.getMapMarkers(
        this.pokemonId,
        this.pokemonGeneration,
      );

      if(this.debug){
        this.oldPlaces$ = this.mapService.getMatrixMapMarkers(
          this.pokemonId,
          this.pokemonGeneration,
        );
        this.allPlaces = this.mapService.getAllMapMarkers();
      }
    }
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

  isMapAllowed(generation: string): boolean {
    // Authorize some regions to be displayable
    return [1,2,3].includes(+generation);
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

  getMarkerStyle(marker: MapMarker, region: RegionMarkerList): {} {
    return {
      'aspect-ratio': '1/1',
      'left': marker.coordinates[0]+'%',
      'top': marker.coordinates[1]+'%',
      'width': 'calc(100% / '+region.size[0]+' )',
      'height': 'auto'
    }
  }

  transformMatrixToRelativeCoordinates(region: Region): Region {

    const regionSizes: number[] = region.size;
    const percentScale: number[] = [(100/regionSizes[0]), (100/regionSizes[1])]

    const newLocationsList = region.locations.map(
      (location) => ({
        ...location,
        coordinates: location.coordinates.map(
          ([x,y]) => this.scale(x,y, percentScale[0], percentScale[1])
        )
      })
    );

    console.log('newLocationsList', newLocationsList)

    // console.log('old -> new', markerList, {...markerList,'markers':newMarkerList});
    return {...region, "locations":newLocationsList}
  }

  scale(x: number,y: number , w:number, h:number): number[]{
    let percentX = ((x * w) + (w / 2));
    let percentY = ((y * h) + (h / 2));
    return [percentX, percentY]
  }
}
