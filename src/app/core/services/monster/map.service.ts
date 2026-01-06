import { Injectable, signal } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { map, Observable, tap } from 'rxjs';
import { EncountersService } from './encounters.service';
import { MapMarker, RegionMarkerList, Region } from '../../models/monsterDex.type';
import { ActivatedRoute } from '@angular/router';

import * as generation1 from '../../../../../public/assets/data/maps/gen-i/data-new.json';
import * as generation2 from '../../../../../public/assets/data/maps/gen-ii/data-new.json';

import * as generation1MTX from '../../../../../public/assets/data/maps/gen-i/data.json';
import * as generation2MTX from '../../../../../public/assets/data/maps/gen-ii/data.json';

interface GenerationDataSet {
  region: Region[];
}

const DATASET: {
  [key: number]: GenerationDataSet;
} = {
  1: generation1,
  2: generation2,
};

const DATASETMATRIX: {
  [key: number]: GenerationDataSet;
} = {
  1: generation1MTX,
  2: generation2MTX,
};

@Injectable()
export class MapService {
  readonly dataset = signal<GenerationDataSet>(generation1);
  readonly datasetmatrix = signal<GenerationDataSet>(generation1MTX);

  constructor(
    private pokeApiService: PokeApiService,
    private encountersService: EncountersService,
    private route: ActivatedRoute,
  ) {
    this.route.params
      .pipe(map((params) => +params['idPokeGen']))
      .subscribe((generation) => {
        this.dataset.set(DATASET[generation]);
        this.datasetmatrix.set(DATASETMATRIX[generation]);
      }
    );
  }

  getMapMarkers(
    pokemonId: string,
    pokemonGeneration: string,
  ): Observable<RegionMarkerList[]> {
    return this.encountersService
      .getEncountersList(pokemonId, pokemonGeneration)
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
    // console.log("MAP MARKER LIST", mapMarkerList);
    return mapMarkerList;
  }

  // To be rebased later
  getAllMapMarkers(pokemonGeneration: string): Region[]{
    let mapMarkerList: Region[] = [];
    this.dataset().region.map(
      (regionObj) => {
        console.log(regionObj);
        mapMarkerList.push(regionObj);
      }
    );
    return mapMarkerList;
  }

  // WILL BE DEPECATED SOON
  getMatrixMapMarkers(
    pokemonId: string,
    pokemonGeneration: string,
  ): Observable<RegionMarkerList[]> {
    return this.encountersService
      .getEncountersList(pokemonId, pokemonGeneration)
      .pipe(map((PKMNencounters) => this.generateMatrixMapMarkers(PKMNencounters)));
  }

  generateMatrixMapMarkers(PKMNencounters: LocationAreaEncounter[]): RegionMarkerList[] {
    const PKMNencountersList = PKMNencounters.map(
      (PKMNencounter) => PKMNencounter.location_area.name,
    );

    let mapMarkerList: RegionMarkerList[] = [];

    this.datasetmatrix().region.map(
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
    return mapMarkerList;
  }
}
