import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterTileComponent } from './monster-tile.component';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('MonsterTileComponent', () => {
  let component: MonsterTileComponent;
  let fixture: ComponentFixture<MonsterTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterTileComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterTileComponent);
    component = fixture.componentInstance;
    component.pokemon = { entry_number: 1, pokemon_species: { name: 'bulbasaur', url: 'pokemon-species/1/' } };
    component.idDex = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
