import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UISoundsComponent } from './uisounds.component';

describe('UISoundsComponent', () => {
  let component: UISoundsComponent;
  let fixture: ComponentFixture<UISoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UISoundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UISoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
