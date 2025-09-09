import { Injectable } from '@angular/core';
import  * as dataRegionPlaces from '../../../../../public/assets/data/maps/gen-i/kanto.json'; // this will be dynamized later
import { LocationAreaEncounter } from '../../models/PokeAPI/pokemon.type';
import { PokeApiService } from '../poke-api.service';
import { map, Observable, tap } from 'rxjs';
import { SimplifiedEncounter } from '../../models/monsterDex.type';

@Injectable({
  providedIn: 'root'
})
export class EncountersService {

  constructor(
    private pokeApiService: PokeApiService,
  ) {}

  getPokemonEncounters(pokemonId: string, pokemonGeneration: string): Observable<SimplifiedEncounter[]>{
    return this.pokeApiService.getPokemonEncounters(pokemonId).pipe(
      map((encounters) => this.filterEncounters$(encounters)),
      tap(e => console.log(e))
    );
  }

  filterEncounters$(encountersAPI:LocationAreaEncounter[]): SimplifiedEncounter[]{
    console.log('DATA JSON', dataRegionPlaces);
    console.log(encountersAPI);
    const encountersList = encountersAPI.map(
      (encounter) => encounter.location_area.name
    );
    const places = dataRegionPlaces.region[0].locations;
    const found:SimplifiedEncounter[] = [];

    places.filter(
      (place) => {
        if (encountersList.indexOf(place.name) > -1) {
          found.push(
            {
              'name' : place.name,
              'encounters' : place.coordinates
            }
          );
          return true;
        } else if (place.locationareas.length > 0) {
          const locationAreasFiltered = place.locationareas.filter(
            (locationarea) => {
              if (encountersList.indexOf(locationarea.name) > -1){
                return {[locationarea.name]: place.coordinates};
              }
              return false;
            }
          );

          if(locationAreasFiltered.length > 0){
            found.push(
              {
                'name': locationAreasFiltered[0].name,
                'encounters': place.coordinates
              }
            );
            return true;
          }
        }
        return false;
      }
    );

    // console.log(found);
    return found;
  }
}
