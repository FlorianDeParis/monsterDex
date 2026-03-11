import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMapComponent } from './world-map.component';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('WorldMapComponent', () => {
  let component: WorldMapComponent;
  let fixture: ComponentFixture<WorldMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldMapComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorldMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
