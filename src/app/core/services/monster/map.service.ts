import { SimplifiedEncounter } from './../../models/monsterDex.type';
import { PokemonPageService } from './pokemon-page.service';
import { Injectable } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { map, Observable, tap } from 'rxjs';
import { EncountersService } from './encounters.service';
import { mapMarker } from '../../models/monsterDex.type';

import * as dataRegionPlaces from '../../../../../public/assets/data/maps/gen-i/data.json'; // this will be dynamized later

@Injectable({
  providedIn: 'root'
})

export class MapService {
  constructor(
    private pokeApiService: PokeApiService,
    private encountersService: EncountersService
  ) {}

  getMapMarkers(pokemonId: string, pokemonGeneration: string): Observable<mapMarker[]>{
    return this.encountersService.getPokemonEncounters(pokemonId, pokemonGeneration).pipe(
      map(PKMNencounters => this.generateMapMarkers$(PKMNencounters))
    );
    // return mapMarkerList;
  }

  generateMapMarkers$(PKMNencounters: LocationAreaEncounter[]): mapMarker[]{
    let PKMNencountersList = [];
    PKMNencountersList = PKMNencounters.map(
      PKMNencounter => PKMNencounter.location_area.name
    );

    const worldMapPlaces = dataRegionPlaces;
    let mapMarkerList:mapMarker[] = [];

    worldMapPlaces.region[0].locations.map(
      (locationsGroup) => {
        locationsGroup.locationareas.map(
          (locationArea) => {
            if(PKMNencountersList.includes(locationArea.name)){
              locationsGroup.coordinates.map(
                c => {
                  mapMarkerList.push({'name': locationArea.name, 'coordinates': c as number[]})
                }
              )
            }
          }
        )
      }
    )
    return mapMarkerList;
  }
}
