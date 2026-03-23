import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCanvasComponent } from './test-canvas.component';

describe('TestCanvasComponent', () => {
  let component: TestCanvasComponent;
  let fixture: ComponentFixture<TestCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
