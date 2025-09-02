import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KantoMapComponent } from './kanto-map.component';

describe('KantoMapComponent', () => {
  let component: KantoMapComponent;
  let fixture: ComponentFixture<KantoMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KantoMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KantoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
