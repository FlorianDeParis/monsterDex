import { TestBed } from '@angular/core/testing';

import { EncountersService } from './encounters.service';

import { provideHttpClient } from '@angular/common/http';

describe('EncountersService', () => {
  let service: EncountersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(EncountersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
