import { Encounter } from './../../models/PokeAPI/utilities.type';
import { Subregion, SubRegionMarkerList } from './../../models/monsterDex.type';
import { Injectable, signal } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { map, Observable, tap } from 'rxjs';
import { EncountersService } from './encounters.service';
import { MapMarker, RegionMarkerList, Region } from '../../models/monsterDex.type';
import { ActivatedRoute } from '@angular/router';

import * as generation1 from '../../../../../public/assets/data/maps/gen-i/data-new.json';
import * as generation2 from '../../../../../public/assets/data/maps/gen-ii/data-new.json';
import * as generation3 from '../../../../../public/assets/data/maps/gen-iii/data-new.json';

import * as generation1MTX from '../../../../../public/assets/data/maps/gen-i/data.json';
import * as generation2MTX from '../../../../../public/assets/data/maps/gen-ii/data.json';
import * as generation3MTX from '../../../../../public/assets/data/maps/gen-iii/data.json';

interface GenerationDataSet {
  region: Region[];
}

interface EncounterSubRegionList {
  region: string,
  Subregion: string,
  encounters: LocationAreaEncounter[]
}

const DATASET: {
  [key: number]: GenerationDataSet;
} = {
  1: generation1,
  2: generation2,
  3: generation3,
};

const DATASETMATRIX: {
  [key: number]: GenerationDataSet;
} = {
  1: generation1MTX,
  2: generation2MTX,
  3: generation3MTX,
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
      .getEncountersByGeneration(pokemonId, pokemonGeneration)
      .pipe(map((PKMNencounters) => this.generateMapMarkers(PKMNencounters)));
  }

  generateMapMarkers(PKMNencounters: LocationAreaEncounter[]): RegionMarkerList[] {
    const PKMNencountersList = PKMNencounters.map(
      (PKMNencounter) => PKMNencounter.location_area.name,
    );

    let mapMarkerList: RegionMarkerList[] = [];

    this.dataset().region.map(
      (regionObj) => {
        let regionMarkerList:RegionMarkerList = {'name': regionObj.name, 'subregions': []}
        regionObj.subregions.forEach((subregion) => {
          let subRegionMarkerList: SubRegionMarkerList = {
            'name': subregion.name,
            'id': subregion.id,
            'size': subregion.size,
            'markers': []
          };

          subregion.locations.forEach((location) => {
            location.locationareas.forEach((locationArea: any) => {
            if (PKMNencountersList.includes(locationArea.name)) {
                location.coordinates.forEach((c) => {
                  subRegionMarkerList.markers.push({
                    name: locationArea.name,
                    coordinates: c,
                  });
                });
              }
            });
          })

          if(subRegionMarkerList.markers.length > 0){
            regionMarkerList['subregions'].push(subRegionMarkerList);
          }

        })

        if(regionMarkerList.subregions.length > 0){
          mapMarkerList.push(regionMarkerList);
        }

      }
    );

    return mapMarkerList;
  }

  // filterEncountersBySubRegions(encounters: LocationAreaEncounter[]): EncounterSubRegionList[]{
  //   encounters.map(
  //     encounter =>
  //   )
  // }




  /// DEBUG ///
  // To be rebased later
  getAllMapPlaces(): Region[]{
    let mapMarkerList: Region[] = [];
    this.datasetmatrix().region.map(
      (regionObj) => {
        // console.log(regionObj);
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
      .getEncountersByGeneration(pokemonId, pokemonGeneration)
      .pipe(map((PKMNencounters) => this.generateMatrixMapMarkers(PKMNencounters)));
  }

  generateMatrixMapMarkers(PKMNencounters: LocationAreaEncounter[]): RegionMarkerList[] {
    const PKMNencountersList = PKMNencounters.map(
      (PKMNencounter) => PKMNencounter.location_area.name,
    );

    let mapMarkerList: RegionMarkerList[] = [];

    this.datasetmatrix().region.map(
      (regionObj) => {
        let regionMarkerList:RegionMarkerList = {'name': regionObj.name, 'subregions': []}
        regionObj.subregions.forEach((subregion) => {
          let subRegionMarkerList: SubRegionMarkerList = {
            'name': subregion.name,
            'id': subregion.id,
            'size': subregion.size,
            'markers': []
          };

          subregion.locations.forEach((location) => {
            location.locationareas.forEach((locationArea: any) => {
            if (PKMNencountersList.includes(locationArea.name)) {
                location.coordinates.forEach((c) => {
                  subRegionMarkerList.markers.push({
                    name: locationArea.name,
                    coordinates: c,
                  });
                });
              }
            });
          })

          if(subRegionMarkerList.markers.length > 0){
            regionMarkerList['subregions'].push(subRegionMarkerList);
          }

        })

        if(regionMarkerList.subregions.length > 0){
          mapMarkerList.push(regionMarkerList);
        }

      }
    );
    return mapMarkerList;
  }
}
