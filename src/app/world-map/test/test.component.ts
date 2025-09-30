import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorldMapComponent } from '../world-map.component';
import { MapMarker } from '../../core/models/monsterDex.type';
import { from, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-test',
  imports: [WorldMapComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit{
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
