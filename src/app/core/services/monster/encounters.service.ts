import { Name } from './../../models/PokeAPI/utilities.type';
import { Injectable } from '@angular/core';
import { GenerationGamesList } from '../../env/config';
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { PokeApiService } from '../poke-api.service';
import { map, Observable, tap } from 'rxjs';
import { SimplifiedEncounter, GenerationGames } from '../../models/monsterDex.type';

@Injectable({
  providedIn: 'root'
})
export class EncountersService {

  generationGamesList!: GenerationGames[];

  constructor(private pokeApiService: PokeApiService) {
    this.generationGamesList = GenerationGamesList;
  }

  getPokemonEncounters(
    pokemonId: string,
    pokemonGeneration: string
  ): Observable<LocationAreaEncounter[]>{
    return this.pokeApiService.getPokemonEncounters(pokemonId).pipe(
      map((encounters) => this.getEncountersByRegionAndGeneration$(encounters, pokemonGeneration)),
      tap(e => console.log(e))
    );
  }

  getEncountersByRegionAndGeneration$(
    encountersAPI:LocationAreaEncounter[],
    pokemonGeneration:string
  ): LocationAreaEncounter[]{

    let encountersList:LocationAreaEncounter[] = [];
    encountersAPI.map(
      (encounter) => {
        (encountersList as any[]).push(this.isOnTheSameGameGeneration(encounter, pokemonGeneration))
      }
    );
    encountersList = encountersList.filter(Boolean);
    return encountersList;
  }

  // Some encounters are on the same region
  // but not in the same game generation
  isOnTheSameGameGeneration(
    locationAreaEncounter: LocationAreaEncounter,
    pokemonGeneration: string
  ): false | LocationAreaEncounter {
    const idxGen = this.generationGamesList.findIndex((element) => element.generation == parseInt(pokemonGeneration));
    const currentGenGameList = this.generationGamesList[idxGen].games;
    // console.log('before', locationAreaEncounter.version_details);

    const locationAreaEncounterFiltered = locationAreaEncounter.version_details.filter(
      (version_detail) => {
        if(currentGenGameList.indexOf(version_detail.version.name) !== -1){
          return {...version_detail}
        }
        return false;
      }
    );
    // console.log("locationAreaEncounterFiltered", locationAreaEncounterFiltered)
    const filteredLocations:LocationAreaEncounter = {...locationAreaEncounter, 'version_details': locationAreaEncounterFiltered};

    // console.log('%c after ', 'background:blue;color:white;');
    // console.log(filteredLocations);
    // console.log(
    //   `%c ${locationAreaEncounter.location_area.name} ` + '%cis on same generation ? ' + `%c ${filteredLocations.version_details.length > 0 ? 'YES' : 'NO' } `,
    //   'color:orange;background:black;',
    //   'color:white;background:black;',
    //   `background: ${filteredLocations.version_details.length > 0 ? 'green' : 'red' }`
    // );
    return filteredLocations.version_details.length > 0 ? {...filteredLocations} : false;
  }
}
