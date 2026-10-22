import { Injectable } from '@angular/core';
import { Region, Subregion } from '../../models/monsterDex.type';
import { toRoman } from 'typescript-roman-numbers-converter';

import * as generation1 from '../../../../../public/assets/data/maps/gen-i/data-new.json';
import * as generation2 from '../../../../../public/assets/data/maps/gen-ii/data-new.json';
import * as generation3 from '../../../../../public/assets/data/maps/gen-iii/data-new.json';

interface GenerationDataSet {
  region: Region[];
}

const DATASET: { [generation: number]: GenerationDataSet } = {
  1: generation1,
  2: generation2,
  3: generation3,
};

const ROMAN_NUMERALS: { [generation: number]: string } = {
  1: 'I',
  2: 'II',
  3: 'III',
};

// Background picture of each subregion (same files as world-map.component.scss)
const MAP_IMAGES: { [subregionId: string]: string } = {
  'kanto-1': '/assets/img/maps/gen-i/kanto.png',
  'johto-2': '/assets/img/maps/gen-ii/johto.png',
  'kanto-2': '/assets/img/maps/gen-ii/kanto.png',
  'hoenn-3': '/assets/img/maps/gen-iii/hoenn.png',
  'kanto-3': '/assets/img/maps/gen-iii/kanto.png',
  'sevii_1_2_3-3': '/assets/img/maps/gen-iii/sevii-1-2-3.png',
  'sevii_4_5-3': '/assets/img/maps/gen-iii/sevii-4-5.png',
  'sevii_6-7-3': '/assets/img/maps/gen-iii/sevii-6-7.png',
};

export interface PoiArea {
  id: number;
  label: string;
}

export interface PoiLocation {
  /** Raw name coming from the data (ex: "celadon-city") */
  slug: string;
  /** Readable name (ex: "Celadon City") */
  name: string;
  /** Points located on the map, as [x, y] percentages */
  points: number[][];
  /** Points whose coordinates fall outside of the map */
  offMapPoints: number[][];
  areas: PoiArea[];
  /** Lower-cased text used by the search field */
  searchText: string;
}

export interface PoiMap {
  id: string;
  label: string;
  imagePath: string;
  /** Grid size of the map: [columns, rows] */
  size: number[];
  locations: PoiLocation[];
}

export interface PoiGeneration {
  generation: number;
  label: string;
  maps: PoiMap[];
}

@Injectable({
  providedIn: 'root',
})
export class PoiMapService {
  readonly generations: PoiGeneration[] = Object.keys(DATASET).map((key) =>
    this.buildGeneration(+key),
  );

  isOnMap([x, y]: number[]): boolean {
    return x >= 0 && x <= 100 && y >= 0 && y <= 100;
  }

  private buildGeneration(generation: number): PoiGeneration {
    const maps: PoiMap[] = [];

    DATASET[generation].region.forEach((region) => {
      region.subregions.forEach((subregion) => {
        maps.push(this.buildMap(subregion));
      });
    });

    return {
      generation,
      label: 'Génération ' + toRoman(generation),
      maps,
    };
  }

  private buildMap(subregion: Subregion): PoiMap {
    const locations = subregion.locations
      .map((location) => {
        const coordinates = location.coordinates.map(([x, y]) => [
          this.round(x),
          this.round(y),
        ]);
        const areas = location.locationareas.map((area) => ({
          id: area.id,
          label: this.areaLabel(location.name, area.name),
        }));
        const name = this.prettify(location.name);

        return {
          slug: location.name,
          name,
          points: coordinates.filter((point) => this.isOnMap(point)),
          offMapPoints: coordinates.filter((point) => !this.isOnMap(point)),
          areas,
          searchText: [name, location.name, ...areas.map((area) => area.label)]
            .join(' ')
            .toLowerCase(),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'fr', { numeric: true }));

    return {
      id: subregion.id,
      label: this.mapLabel(subregion.name),
      imagePath: MAP_IMAGES[subregion.id],
      size: subregion.size,
      locations,
    };
  }

  // "johto" => "Johto", while real labels ("Îles Sevii I II et III") stay untouched
  private mapLabel(name: string): string {
    return name === name.toLowerCase() ? this.prettify(name) : name;
  }

  // "celadon-city" => "Celadon City"
  private prettify(slug: string): string {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // "celadon-city-celadon-mansion" => "Celadon Mansion"
  private areaLabel(locationSlug: string, areaSlug: string): string {
    const prefix = locationSlug + '-';
    const rest = areaSlug.startsWith(prefix)
      ? areaSlug.slice(prefix.length)
      : areaSlug;

    return rest === 'area' ? 'Zone principale' : this.prettify(rest);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
