import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  effect,
  signal,
} from '@angular/core';
import {
  PoiGeneration,
  PoiLocation,
  PoiMap,
  PoiMapService,
} from '../../../core/services/monster/poi-map.service';

interface VisibleLocation {
  location: PoiLocation;
  index: number;
}

interface Hit {
  index: number;
  pointIndex: number;
}

interface Tooltip {
  name: string;
  detail: string;
  left: number;
  top: number;
  alignLeft: boolean;
}

const COLOR_MARKER = '#ff5a4d';
const COLOR_MARKER_EMPTY = '#9aa4b5';
const COLOR_MARKER_EMPTY_FILL = '#11151c';
const COLOR_RING = '#6ea2ff';
const COLOR_HALO = '#ffffff';
const COLOR_LABEL = '#11151c';
const COLOR_GRID = 'rgba(17, 21, 28, 0.3)';
const DIMMED_ALPHA = 0.22;

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrl: './poi-map.component.scss',
})
export class PoiMapComponent implements OnInit, AfterViewInit, OnDestroy {
  /** Generation displayed when the component opens (1, 2 or 3) */
  @Input() generation: number = 1;

  @ViewChild('mapCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mapFrame', { static: true })
  frameRef!: ElementRef<HTMLElement>;

  readonly generations: PoiGeneration[];

  readonly generationIndex = signal(0);
  readonly mapIndex = signal(0);
  readonly query = signal('');
  readonly selectedIndex = signal(-1);
  readonly selectedPoint = signal(0);
  readonly hoveredIndex = signal(-1);
  readonly hoveredPoint = signal(0);
  readonly showNames = signal(false);
  readonly showGrid = signal(false);

  readonly currentGeneration = computed(
    () => this.generations[this.generationIndex()],
  );
  readonly currentMap = computed(
    () => this.currentGeneration().maps[this.mapIndex()],
  );
  private readonly normalizedQuery = computed(() =>
    this.query().trim().toLowerCase(),
  );

  readonly visibleLocations = computed<VisibleLocation[]>(() =>
    this.currentMap()
      .locations.map((location, index) => ({ location, index }))
      .filter(({ location }) => this.matches(location)),
  );

  readonly selectedLocation = computed<PoiLocation | null>(
    () => this.currentMap().locations[this.selectedIndex()] ?? null,
  );

  /** Number of places matching the search in each map of the generation */
  readonly matchCounts = computed<number[]>(() =>
    this.currentGeneration().maps.map((map) =>
      this.normalizedQuery()
        ? map.locations.filter((location) => this.matches(location)).length
        : 0,
    ),
  );

  readonly stats = computed(() => {
    const locations = this.currentMap().locations;
    return {
      locations: locations.length,
      points: locations.reduce(
        (total, location) =>
          total + location.points.length + location.offMapPoints.length,
        0,
      ),
      withoutArea: locations.filter((location) => !location.areas.length)
        .length,
    };
  });

  readonly tooltip = computed<Tooltip | null>(() => {
    const hovered = this.hoveredIndex();
    const index = hovered >= 0 ? hovered : this.selectedIndex();
    const pointIndex =
      hovered >= 0 ? this.hoveredPoint() : this.selectedPoint();
    const map = this.currentMap();
    const location = map.locations[index];
    const point = location?.points[pointIndex];

    if (!location || !point) {
      return null;
    }

    return {
      name: location.name,
      detail:
        this.cellLabel(map, point) +
        (location.points.length > 1
          ? ' · ' + location.points.length + ' points'
          : ''),
      left: point[0],
      top: point[1],
      alignLeft: point[0] > 55,
    };
  });

  private readonly images = new Map<string, HTMLImageElement>();
  private readonly imagesLoaded = signal(0);
  private readonly frameWidth = signal(0);
  private resizeObserver?: ResizeObserver;

  constructor(
    private poiMapService: PoiMapService,
    private ngZone: NgZone,
  ) {
    this.generations = this.poiMapService.generations;

    // Redraw the canvas whenever something it depends on changes
    effect(() => this.draw());
  }

  ngOnInit() {
    const index = this.generations.findIndex(
      (generation) => generation.generation === +this.generation,
    );
    this.generationIndex.set(Math.max(index, 0));
  }

  ngAfterViewInit() {
    this.generations.forEach((generation) =>
      generation.maps.forEach((map) => this.loadImage(map)),
    );

    this.resizeObserver = new ResizeObserver(([entry]) =>
      this.ngZone.run(() => this.frameWidth.set(entry.contentRect.width)),
    );
    this.resizeObserver.observe(this.frameRef.nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  // --- Template actions -----------------------------------------------------

  selectGeneration(index: number) {
    if (index === this.generationIndex()) {
      return;
    }
    this.generationIndex.set(index);
    this.resetMapState(0);
  }

  selectMap(index: number) {
    if (index === this.mapIndex()) {
      return;
    }
    this.resetMapState(index);
  }

  selectLocation(index: number) {
    this.selectedIndex.set(index === this.selectedIndex() ? -1 : index);
    this.selectedPoint.set(0);
  }

  clearSelection() {
    this.selectedIndex.set(-1);
  }

  hoverLocation(index: number) {
    this.hoveredIndex.set(index);
    this.hoveredPoint.set(0);
  }

  onPointerMove(event: PointerEvent) {
    if (event.pointerType === 'touch') {
      return;
    }
    const hit = this.hitTest(event);
    this.canvasRef.nativeElement.style.cursor = hit ? 'pointer' : 'default';
    this.hoveredIndex.set(hit ? hit.index : -1);
    this.hoveredPoint.set(hit ? hit.pointIndex : 0);
  }

  onPointerLeave() {
    this.hoveredIndex.set(-1);
  }

  onCanvasClick(event: MouseEvent) {
    const hit = this.hitTest(event);
    if (!hit || hit.index === this.selectedIndex()) {
      this.selectedIndex.set(-1);
      return;
    }
    this.selectedIndex.set(hit.index);
    this.selectedPoint.set(hit.pointIndex);
  }

  // --- Display helpers ------------------------------------------------------

  cellLabel(map: PoiMap, point: number[]): string {
    return (
      'col ' +
      Math.floor((point[0] / 100) * map.size[0]) +
      ' · lig ' +
      Math.floor((point[1] / 100) * map.size[1])
    );
  }

  plural(count: number, one: string, many: string): string {
    return count + ' ' + (count > 1 ? many : one);
  }

  listMeta(location: PoiLocation): string {
    if (!location.points.length) {
      return 'hors carte';
    }
    const parts: string[] = [];
    if (!location.areas.length) {
      parts.push('sans zone');
    }
    if (location.points.length > 1) {
      parts.push('×' + location.points.length);
    }
    return parts.join(' · ');
  }

  // --- Canvas ---------------------------------------------------------------

  private matches(location: PoiLocation): boolean {
    const query = this.normalizedQuery();
    return !query || location.searchText.includes(query);
  }

  private resetMapState(mapIndex: number) {
    this.mapIndex.set(mapIndex);
    this.selectedIndex.set(-1);
    this.hoveredIndex.set(-1);
  }

  private loadImage(map: PoiMap) {
    if (this.images.has(map.imagePath)) {
      return;
    }
    const image = new Image();
    image.onload = () =>
      this.ngZone.run(() => this.imagesLoaded.update((count) => count + 1));
    image.src = map.imagePath;
    this.images.set(map.imagePath, image);
  }

  private markerRadius(width: number, map: PoiMap): number {
    return Math.max(5, (width / map.size[0]) * 0.3);
  }

  private hitTest(event: MouseEvent): Hit | null {
    const map = this.currentMap();
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let best: Hit | null = null;
    let bestDistance = Math.max(this.markerRadius(rect.width, map) * 1.6, 12);

    map.locations.forEach((location, index) => {
      location.points.forEach((point, pointIndex) => {
        const dx = (point[0] / 100) * rect.width - x;
        const dy = (point[1] / 100) * rect.height - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = { index, pointIndex };
        }
      });
    });

    return best;
  }

  private draw() {
    // Signals read here are the dependencies of the effect
    const map = this.currentMap();
    const width = this.frameWidth();
    this.imagesLoaded();
    const selected = this.selectedIndex();
    const hovered = this.hoveredIndex();
    const showGrid = this.showGrid();
    const showNames = this.showNames();
    this.normalizedQuery();

    const image = this.images.get(map.imagePath);
    const canvas = this.canvasRef?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !image || !image.complete || !image.naturalWidth || !width) {
      return;
    }

    const height = (width * map.size[1]) / map.size[0];
    const ratio = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(width * ratio);
    const pixelHeight = Math.round(height * ratio);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    canvas.style.height = height + 'px';

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);

    const cell = width / map.size[0];
    const radius = this.markerRadius(width, map);

    if (showGrid) {
      this.drawGrid(ctx, map, width, height);
    }

    // Three layers: dimmed (not matching the search), normal, active (hovered or selected)
    const layers: { location: PoiLocation; index: number }[][] = [[], [], []];
    map.locations.forEach((location, index) => {
      const active = index === selected || index === hovered;
      layers[active ? 2 : this.matches(location) ? 1 : 0].push({
        location,
        index,
      });
    });

    layers.forEach((layer, layerIndex) => {
      ctx.globalAlpha = layerIndex === 0 ? DIMMED_ALPHA : 1;
      layer.forEach(({ location, index }) =>
        location.points.forEach((point) =>
          this.drawMarker(
            ctx,
            (point[0] / 100) * width,
            (point[1] / 100) * height,
            radius,
            !location.areas.length,
            index === selected,
            index === hovered,
          ),
        ),
      );
    });
    ctx.globalAlpha = 1;

    const fontSize = Math.max(11, Math.min(15, cell * 0.5));
    map.locations.forEach((location, index) => {
      const point = location.points[0];
      const visible =
        index === selected || (showNames && this.matches(location));
      if (point && visible) {
        this.drawLabel(
          ctx,
          location.name,
          (point[0] / 100) * width,
          (point[1] / 100) * height,
          radius,
          width,
          fontSize,
        );
      }
    });
  }

  private drawGrid(
    ctx: CanvasRenderingContext2D,
    map: PoiMap,
    width: number,
    height: number,
  ) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLOR_GRID;
    ctx.beginPath();
    for (let column = 1; column < map.size[0]; column++) {
      const x = Math.round((column * width) / map.size[0]) + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let row = 1; row < map.size[1]; row++) {
      const y = Math.round((row * height) / map.size[1]) + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  private drawMarker(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    withoutArea: boolean,
    selected: boolean,
    hovered: boolean,
  ) {
    if (selected || hovered) {
      ctx.beginPath();
      ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
      ctx.lineWidth = selected ? 3 : 2;
      ctx.strokeStyle = COLOR_RING;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, selected ? radius * 1.2 : radius, 0, Math.PI * 2);
    ctx.lineWidth = 2.5;
    if (withoutArea) {
      ctx.fillStyle = COLOR_MARKER_EMPTY_FILL;
      ctx.fill();
      ctx.strokeStyle = COLOR_MARKER_EMPTY;
    } else {
      ctx.fillStyle = COLOR_MARKER;
      ctx.fill();
      ctx.strokeStyle = COLOR_HALO;
    }
    ctx.stroke();
  }

  private drawLabel(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    radius: number,
    canvasWidth: number,
    fontSize: number,
  ) {
    ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
    ctx.textBaseline = 'middle';
    const fitsOnRight =
      x + radius + 5 + ctx.measureText(text).width < canvasWidth - 2;
    ctx.textAlign = fitsOnRight ? 'left' : 'right';
    const textX = fitsOnRight ? x + radius + 5 : x - radius - 5;

    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.strokeText(text, textX, y);
    ctx.fillStyle = COLOR_LABEL;
    ctx.fillText(text, textX, y);
  }
}
