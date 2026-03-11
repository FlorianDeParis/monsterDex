import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterListComponent } from './monster-list.component';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('MonsterListComponent', () => {
  let component: MonsterListComponent;
  let fixture: ComponentFixture<MonsterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterListComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
