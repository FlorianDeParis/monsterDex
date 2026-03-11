import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterPageComponent } from './monster-page.component';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('MonsterPageComponent', () => {
  let component: MonsterPageComponent;
  let fixture: ComponentFixture<MonsterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterPageComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
