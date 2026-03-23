import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService } from '../../core/services/monster/map.service';
import { RegionMarkerList } from '../../core/models/monsterDex.type';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-test-canvas',
  imports: [],
  templateUrl: './test-canvas.component.html',
  styleUrl: './test-canvas.component.scss'
})
export class TestCanvasComponent implements AfterViewInit {
  @ViewChild('testCanvas', { static: false}) myCanvas!: ElementRef
  context!: CanvasRenderingContext2D
  markers!: RegionMarkerList[]

  constructor(private mapService: MapService){}

  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.mapService.getMapMarkers('1','1').pipe(
      tap(m => this.markers = m)
    ).subscribe(r => this.drawCanvas(r));
  }

  drawCanvas(RegionMarkerList: RegionMarkerList[]): void {

  }
}
