import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapService, provideHttpClient(), provideRouter([])]
    });
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
