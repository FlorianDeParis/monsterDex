import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { PokeApiService } from '../core/services/poke-api.service';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../core/models/PokeAPI/pokemon.type';
import { MonsterService } from '../core/services/monster.service';

@Component({
  selector: 'app-monster-page',
  imports: [
    CommonModule
  ],
  templateUrl: './monster-page.component.html',
  styleUrl: './monster-page.component.scss'
})
export class MonsterPageComponent implements OnInit, AfterViewInit {
  volume = 0.2;
  urlParams = {
    idMonster : '',
    idPokeGen : '',
    idDex: ''
  }
  monsterDetails$!: Observable<Pokemon>;
  pokemonSelectedSprite$!: Observable<string|null>;

  @ViewChild('audioPlayer', { static: false }) audio!: ElementRef<HTMLAudioElement>;

  constructor(private route: ActivatedRoute, private pokeApi: PokeApiService, private monsterService: MonsterService) {
    this.urlParams.idMonster = this.route.snapshot.params['idMonster'];
    this.urlParams.idPokeGen = this.route.snapshot.params['idPokeGen'];
    this.urlParams.idDex = this.route.snapshot.params['idDex'];
    console.log(this.urlParams);
    console.log(this.monsterService.getCurrentPokedexData(parseInt(this.urlParams.idDex)));
  }

  ngOnInit(): void {
    this.monsterDetails$ = this.pokeApi.getPokemonDetails(this.urlParams.idMonster).pipe(
      tap((data) => console.log(data))
    );


  }

  ngAfterViewInit(): void {
    this.audio.nativeElement.volume = this.volume;
  }
}
