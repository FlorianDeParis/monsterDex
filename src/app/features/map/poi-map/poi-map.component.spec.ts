import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiMapComponent } from './poi-map.component';

describe('PoiMapComponent', () => {
  let component: PoiMapComponent;
  let fixture: ComponentFixture<PoiMapComponent>;
  let element: HTMLElement;

  const items = () => element.querySelectorAll<HTMLButtonElement>('.poi-item');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoiMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PoiMapComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list the places of the first map', () => {
    expect(items().length).toBe(component.currentMap().locations.length);
  });

  it('should open on the requested generation', () => {
    const other = TestBed.createComponent(PoiMapComponent);
    other.componentInstance.generation = 3;
    other.detectChanges();

    expect(other.componentInstance.currentGeneration().generation).toBe(3);
  });

  it('should switch generation and go back to its first map', () => {
    component.selectGeneration(2);
    component.selectMap(1);
    component.selectGeneration(1);
    fixture.detectChanges();

    expect(component.currentGeneration().generation).toBe(2);
    expect(component.mapIndex()).toBe(0);
    expect(items().length).toBe(component.currentMap().locations.length);
  });

  it('should filter the places with the search field', () => {
    const total = items().length;
    component.query.set('celadon');
    fixture.detectChanges();

    expect(items().length).toBeGreaterThan(0);
    expect(items().length).toBeLessThan(total);
    expect(
      Array.from(items()).some((item) =>
        item.textContent?.includes('Celadon City'),
      ),
    ).toBeTrue();
  });

  it('should display a message when nothing matches', () => {
    component.query.set('zzzz');
    fixture.detectChanges();

    expect(items().length).toBe(0);
    expect(element.querySelector('.poi-empty')).toBeTruthy();
  });

  it('should show and clear the detail of a selected place', () => {
    items()[0].click();
    fixture.detectChanges();

    expect(component.selectedLocation()).not.toBeNull();
    expect(element.querySelector('.poi-detail')).toBeTruthy();

    component.clearSelection();
    fixture.detectChanges();

    expect(element.querySelector('.poi-detail')).toBeNull();
  });
});
