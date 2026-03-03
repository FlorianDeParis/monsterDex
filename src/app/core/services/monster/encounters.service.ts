import { Name } from './../../models/PokeAPI/utilities.type';
import { Injectable } from '@angular/core';
import { GenerationGamesList } from '../../env/config';
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { PokeApiService } from '../poke-api.service';
import { map, Observable, tap } from 'rxjs';
import { GenerationGames } from '../../models/monsterDex.type';

import * as encountersIcons from '../../../../../public/assets/data/encounters/types.json';

@Injectable({
  providedIn: 'root',
})
export class EncountersService {
  generationGamesList!: GenerationGames[];

  constructor(private pokeApiService: PokeApiService) {
    this.generationGamesList = GenerationGamesList;
  }

  getEncounters(pokemonId: string): Observable<LocationAreaEncounter[]>{
    return this.pokeApiService.getPokemonEncounters(pokemonId);
  }

  getEncountersByGeneration(pokemonId: string, generation: string): Observable<LocationAreaEncounter[]>{
    const currentGenGameList = this.generationGamesList.filter(
      (list) => list.generation == Number.parseInt(generation)
    )[0].games;

    return this.getEncounters(pokemonId).pipe(
      map(encountersList => {
        let filteredEncountersList: LocationAreaEncounter[] = [];
        encountersList.map((encounter) => {
          const filteredEncounter = this.filterCurrentGameGeneration(encounter, currentGenGameList);
          filteredEncounter && (filteredEncountersList as any[]).push(filteredEncounter);
        });

        return filteredEncountersList;
      })
    );
  }

  // Some encounters are on the same region
  // but not in the same game generation
  filterCurrentGameGeneration(
    locationAreaEncounter: LocationAreaEncounter,
    currentGenGameList: string[],
  ): false | LocationAreaEncounter {

    const locationAreaEncounterFiltered =
      locationAreaEncounter.version_details.filter((version_detail) => {
        if (currentGenGameList.indexOf(version_detail.version.name) !== -1) {
          return { ...version_detail };
        }
        return false;
      });

    const filteredLocations: LocationAreaEncounter = {
      ...locationAreaEncounter,
      version_details: locationAreaEncounterFiltered,
    };

    return filteredLocations.version_details.length > 0
      ? { ...filteredLocations }
      : false;
  }

  getEncounterIconPath(key: string): string{
    const icon = encountersIcons['types'].find(
      (e) => e.name === key
    )
    return icon?.path ?? '';
  }
}
