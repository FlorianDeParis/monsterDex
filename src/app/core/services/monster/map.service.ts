import { Injectable, signal } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { map, Observable, tap } from 'rxjs';
import { EncountersService } from './encounters.service';
import { MapMarker } from '../../models/monsterDex.type';
import { ActivatedRoute } from '@angular/router';

import * as generation1 from '../../../../../public/assets/data/maps/gen-i/data.json';
import * as generation2 from '../../../../../public/assets/data/maps/gen-ii/data.json';

const DATASET: { [key: number]: any } = {
  1: generation1,
  2: generation2,
};

@Injectable()
export class MapService {
  readonly dataset = signal(null);

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
  ): Observable<MapMarker[]> {
    return this.encountersService
      .getPokemonEncounters(pokemonId, pokemonGeneration)
      .pipe(map((PKMNencounters) => this.generateMapMarkers(PKMNencounters)));
  }

  generateMapMarkers(PKMNencounters: LocationAreaEncounter[]): MapMarker[] {
    const PKMNencountersList = PKMNencounters.map(
      (PKMNencounter) => PKMNencounter.location_area.name,
    );

    let mapMarkerList: MapMarker[] = [];

    (this.dataset() as any).region[0].locations.foreach(
      (locationsGroup: any) => {
        locationsGroup.locationareas.foreach((locationArea: any) => {
          if (PKMNencountersList.includes(locationArea.name)) {
            locationsGroup.coordinates.foreach((c: number[]) => {
              mapMarkerList.push({
                name: locationArea.name,
                coordinates: c as number[],
              });
            });
          }
        });
      },
    );

    return mapMarkerList;
  }
}
