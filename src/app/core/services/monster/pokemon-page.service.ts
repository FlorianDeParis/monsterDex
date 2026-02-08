import { PokeApiService } from './../poke-api.service';
import { Injectable } from '@angular/core';
import { toRoman } from 'typescript-roman-numbers-converter';
import {
  LocationAreaEncounter,
  PokemonSprites,
  PokemonSpritesVersions,
} from '../../models/PokeAPI/pokemon.type';
import { NamedAPIResource } from '../../models/PokeAPI/utilities.type';
import { ToasterService } from '../toaster.service';

import { tap, Observable, map } from 'rxjs';
import { EncountersService } from './encounters.service';


interface TableCell {
  value: string;
  rowspan?: number;
  hidden?: boolean;
}

export interface TableRow {
  zone: TableCell;
  version: TableCell;
  method: TableCell;
  level: {
    min_level: number;
    max_level?: number;
  };
  chance: TableCell;
  condition_values?: NamedAPIResource[];
}
@Injectable({
  providedIn: 'root',
})
export class PokemonPageService {
  constructor(
    private toaster: ToasterService,
    private encountersService: EncountersService,
    private pokeApiService: PokeApiService
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


  getFlattenedEncountersList(
    pokemonId: string,
    pokemonGeneration: string,
  ): Observable<TableRow[]> {
    return this.pokeApiService.getPokemonEncounters(pokemonId).pipe(
      map((encounters) =>
        this.encountersService.getEncountersByRegionAndGeneration$(encounters, pokemonGeneration),
      ),
      map((encounters) =>
        this.buildTable(encounters)
      ),
      tap((e) => console.log(e))
    );
  }


  buildTable(data: LocationAreaEncounter[]): TableRow[] {
    const rows: TableRow[] = [];

    data.forEach(LocationAreaEncounter => {
      const zoneName = LocationAreaEncounter.location_area.name;

      // Nombre total de lignes pour la zone
      const zoneRowspan = LocationAreaEncounter.version_details.reduce(
        (sum, v) => sum + v.encounter_details.length,
        0
      );

      let isFirstZoneRow = true;

      LocationAreaEncounter.version_details.forEach(versionDetail => {
        const versionName = versionDetail.version.name;
        const versionRowspan = versionDetail.encounter_details.length;

        let isFirstVersionRow = true;

        versionDetail.encounter_details.forEach(encounter => {
          console.log(encounter),
          rows.push({
            zone: {
              value: zoneName,
              rowspan: isFirstZoneRow ? zoneRowspan : undefined,
              hidden: !isFirstZoneRow
            },
            version: {
              value: versionName,
              rowspan: isFirstVersionRow ? versionRowspan : undefined,
              hidden: !isFirstVersionRow
            },
            method: {
              value: encounter.method.name
            },
            level: {
              min_level: encounter.min_level,
              max_level: encounter.max_level
            },
            chance: {
              value: `${encounter.chance}%`
            },
            condition_values: encounter.condition_values
          });

          isFirstZoneRow = false;
          isFirstVersionRow = false;
        });
      });
    });

    return rows;
  }
}
