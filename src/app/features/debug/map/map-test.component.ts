import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorldMapComponent } from '../../map/world-map/world-map.component';
import { MapMarker } from '../../../core/models/monsterDex.type';
import { from, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-map-test',
  imports: [WorldMapComponent],
  templateUrl: './map-test.component.html',
  styleUrl: './map-test.component.scss'
})
export class MapTestComponent implements OnInit{
  idMonster!: string;
  idPokeGen!: string;
  idDex!: string;
  constructor(
    private route: ActivatedRoute
  ){
    this.idMonster = this.route.snapshot.params['idMonster'];
    this.idPokeGen = this.route.snapshot.params['idPokeGen'];
    this.idDex = this.route.snapshot.params['idDex'];
  }

  ngOnInit() {}

}
