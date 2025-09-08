import { PokeApiService } from './../poke-api.service';
import { Injectable } from '@angular/core';
import { toRoman } from 'typescript-roman-numbers-converter';
import {
  LocationAreaEncounter,
  PokemonSprites,
  PokemonSpritesVersions,
} from '../../models/PokeAPI/pokemon.type';
import { ToasterService } from '../toaster.service';
import  * as dataRegionPlaces from '../../../../../public/assets/data/maps/gen-i/kanto.json'; // this will be dynamized later
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonPageService {
  constructor(
    private pokeApiService: PokeApiService,
    private toaster: ToasterService,
  ) {}

  getPokemonArtworkByIdGeneration(
    spriteObject: PokemonSprites,
    IdGen: string,
  ): string {
    const romanGeneration = toRoman(parseInt(IdGen)).toLowerCase();
    let returnedSprite = spriteObject.front_default;
    let spriteFront = null;
    if (typeof spriteObject.versions !== 'undefined') {
      const generationKey = 'generation-' + romanGeneration;
      let spriteWithGen = this.getMyObjectValueCastedKey(
        spriteObject.versions,
        generationKey,
      );
      if (spriteWithGen) {
        const indexesWithoutIcons = Object.keys(spriteWithGen).filter(
          (index) => index != 'icons',
        ); // Ignore icon object when fetching sprites
        if (indexesWithoutIcons.length > 0) {
          spriteFront = this.getMyObjectValueCastedKey(
            spriteWithGen[indexesWithoutIcons[0]],
            'front_default',
          );
        }
      }
      if (spriteWithGen && spriteFront) {
        returnedSprite = spriteFront;
      } else {
        this.toaster.error(
          'Sprite non trouvé, chargement du sprite par défaut',
        );
      }
    }
    return returnedSprite as string;
  }

  getMyObjectValueCastedKey(myObject: any, key: string): any {
    return myObject[key as keyof typeof myObject];
  }

  getPokemonEncounters(pokemonId: string, pokemonGeneration: string){
    const encounters = this.pokeApiService.getPokemonEncounters(pokemonId).pipe(
      map((encounters) => this.filterEncounters$(encounters)),
      tap(e => console.log(e))
    ).subscribe();
  }

  filterEncounters$(encountersAPI:LocationAreaEncounter[]){
    console.log('DATA JSON', dataRegionPlaces);
    console.log(encountersAPI);
    const encountersList = encountersAPI.map(
      (encounter) => encounter.location_area.name
    );
    const places = dataRegionPlaces.region[0].locations;
    const found: any[] = [];

    places.filter(
      (place) => {
        if (encountersList.indexOf(place.name) > -1) {
          found.push(
            {
              'name' : [place.name],
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
