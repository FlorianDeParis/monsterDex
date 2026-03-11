import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTestComponent } from './map-test.component';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('MapTestComponent', () => {
  let component: MapTestComponent;
  let fixture: ComponentFixture<MapTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapTestComponent],
      providers: [provideRouter([]), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
