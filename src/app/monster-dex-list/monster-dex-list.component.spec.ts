import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDexListComponent } from './monster-dex-list.component';

describe('MonsterDexListComponent', () => {
  let component: MonsterDexListComponent;
  let fixture: ComponentFixture<MonsterDexListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterDexListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterDexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
