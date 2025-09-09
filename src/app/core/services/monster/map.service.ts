import { SimplifiedEncounter } from './../../models/monsterDex.type';
import { PokemonPageService } from './pokemon-page.service';
import { Injectable } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { map, Observable, tap } from 'rxjs';
import { EncountersService } from './encounters.service';
import { mapMarker } from '../../models/monsterDex.type';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  constructor(
    private pokeApiService: PokeApiService,
    private encountersService: EncountersService
  ) {}

  getMapMarkers(pokemonId: string, pokemonGeneration: string): Observable<mapMarker[]>{ //Observable<mapMarker[]>
    return this.encountersService.getPokemonEncounters(pokemonId, pokemonGeneration).pipe(
      map(PKMNencounters => this.flattenMarkerArray$(PKMNencounters))
    );
    // return mapMarkerList;
  }

  flattenMarkerArray$(PKMNencounters: SimplifiedEncounter[]): mapMarker[]{
    let mapMarkerList:mapMarker[] = [];
    PKMNencounters.map(
      PKMNencounter => {
        if(typeof PKMNencounter.encounters[0] === 'object'){
          PKMNencounter.encounters.map(e => { mapMarkerList.push({'name':PKMNencounter.name,'coordinates':e as number[]}) })
        } else {
          mapMarkerList.push({'name':PKMNencounter.name,'coordinates':PKMNencounter.encounters as number[]})
        }

      }
    );
    return mapMarkerList;
  }
}
