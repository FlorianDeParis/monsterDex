import { Injectable, signal } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { map, Observable, tap } from 'rxjs';
import { EncountersService } from './encounters.service';
import { MapMarker, RegionMarkerList } from '../../models/monsterDex.type';
import { ActivatedRoute } from '@angular/router';

import * as generation1 from '../../../../../public/assets/data/maps/gen-i/data.json';
import * as generation2 from '../../../../../public/assets/data/maps/gen-ii/data.json';

interface GenerationDataSet {
  region: Region[];
}

interface Region {
  name: string;
  id: number;
  size: number[];
  locations: Location[];
}

interface Location {
  name: string;
  coordinates: number[][];
  locationareas: LocationArea[];
}

interface LocationArea {
  name: string;
  id: number;
}

const DATASET: {
  [key: number]: GenerationDataSet;
} = {
  1: generation1,
  2: generation2, // TODO: Add JSON data.
};

@Injectable()
export class MapService {
  readonly dataset = signal<GenerationDataSet>(generation1);

  constructor(
    private pokeApiService: PokeApiService,
    private encountersService: EncountersService,
    private route: ActivatedRoute,
  ) {
    this.route.params
      .pipe(map((params) => +params['idPokeGen']))
      .subscribe((generation) => {
        this.dataset.set(DATASET[generation]);
      });
  }

  getMapMarkers(
    pokemonId: string,
    pokemonGeneration: string,
  ): Observable<RegionMarkerList[]> {
    return this.encountersService
      .getPokemonEncounters(pokemonId, pokemonGeneration)
      .pipe(map((PKMNencounters) => this.generateMapMarkers(PKMNencounters)));
  }

  generateMapMarkers(PKMNencounters: LocationAreaEncounter[]): RegionMarkerList[] {
    const PKMNencountersList = PKMNencounters.map(
      (PKMNencounter) => PKMNencounter.location_area.name,
    );

    let mapMarkerList: RegionMarkerList[] = [];

    this.dataset().region.map(
      (regionObj) => {
        let RegionMarkerList:RegionMarkerList = {'name': regionObj.name, 'size': regionObj.size, 'markers': []}
        regionObj.locations.forEach((locationsGroup) => {
          locationsGroup.locationareas.forEach((locationArea: any) => {
            if (PKMNencountersList.includes(locationArea.name)) {

              locationsGroup.coordinates.forEach((c) => {
                RegionMarkerList.markers.push({
                  name: locationArea.name,
                  coordinates: c,
                });
              });
            }
          });
        });
        mapMarkerList.push(RegionMarkerList);
      }
    )
    console.log("MAP MARKER LIST", mapMarkerList);
    return mapMarkerList;
  }
}
