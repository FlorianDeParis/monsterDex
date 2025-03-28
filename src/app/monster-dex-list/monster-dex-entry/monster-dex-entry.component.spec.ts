import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDexEntryComponent } from './monster-dex-entry.component';

describe('MonsterDexEntryComponent', () => {
  let component: MonsterDexEntryComponent;
  let fixture: ComponentFixture<MonsterDexEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterDexEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterDexEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
