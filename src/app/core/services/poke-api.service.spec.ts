import { TestBed } from '@angular/core/testing';

import { PokeApiService } from './poke-api.service';

import { provideHttpClient } from '@angular/common/http';

describe('PokeApiService', () => {
  let service: PokeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(PokeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
