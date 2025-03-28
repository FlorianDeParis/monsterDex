import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDexListPageComponent } from './monster-dex-list-page.component';

describe('MonsterDexListPageComponent', () => {
  let component: MonsterDexListPageComponent;
  let fixture: ComponentFixture<MonsterDexListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterDexListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterDexListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
