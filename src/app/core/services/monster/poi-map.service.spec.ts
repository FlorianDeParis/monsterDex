import { TestBed } from '@angular/core/testing';

import { PoiMapService } from './poi-map.service';

describe('PoiMapService', () => {
  let service: PoiMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoiMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose generations I to III', () => {
    expect(service.generations.map((g) => g.generation)).toEqual([1, 2, 3]);
    expect(service.generations.map((g) => g.label)).toEqual([
      'Génération I',
      'Génération II',
      'Génération III',
    ]);
  });

  it('should build every map with a background image and some places', () => {
    const maps = service.generations.flatMap((g) => g.maps);

    expect(maps.length).toBe(8);
    maps.forEach((map) => {
      expect(map.imagePath).toMatch(
        /^\/assets\/img\/maps\/gen-i{1,3}\/.+\.png$/,
      );
      expect(map.locations.length).toBeGreaterThan(0);
    });
  });

  it('should format map labels', () => {
    const labels = service.generations[2].maps.map((map) => map.label);

    expect(labels).toContain('Hoenn');
    expect(labels).toContain('Îles Sevii I II et III');
  });

  it('should format place and area names', () => {
    const kanto = service.generations[0].maps[0];
    const celadon = kanto.locations.find((l) => l.slug === 'celadon-city');

    expect(celadon?.name).toBe('Celadon City');
    expect(celadon?.areas.map((a) => a.label)).toEqual([
      'Zone principale',
      'Celadon Mansion',
    ]);
    expect(celadon?.searchText).toContain('celadon mansion');
  });

  it('should sort the places by name', () => {
    const names = service.generations[0].maps[0].locations.map((l) => l.name);
    const sorted = [...names].sort((a, b) =>
      a.localeCompare(b, 'fr', { numeric: true }),
    );

    expect(names).toEqual(sorted);
  });

  it('should keep points located outside of the map apart', () => {
    const hoenn = service.generations[2].maps.find((m) => m.id === 'hoenn-3');
    const artisanCave = hoenn?.locations.find((l) => l.slug === 'artisan-cave');

    expect(artisanCave?.offMapPoints.length).toBe(1);
    artisanCave?.points.forEach((point) =>
      expect(service.isOnMap(point)).toBeTrue(),
    );
  });
});
