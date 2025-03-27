import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { PokeApiService } from '../core/services/poke-api.service';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../core/models/monsterDetails.type';

@Component({
  selector: 'app-monster-page',
  imports: [
    CommonModule
  ],
  templateUrl: './monster-page.component.html',
  styleUrl: './monster-page.component.scss'
})
export class MonsterPageComponent implements OnInit, AfterViewInit {
  volume = 0.5;
  enMonsterName!: string;
  monsterDetails$!: Observable<Pokemon>;
  
  @ViewChild('audioPlayer', { static: false }) audio!: ElementRef<HTMLAudioElement>;
  
  constructor(private route: ActivatedRoute, private pokeApi: PokeApiService) {
    this.enMonsterName = this.route.snapshot.params['enMonsterName'];
  }
  
  ngOnInit(): void {
    this.monsterDetails$ = this.pokeApi.getPokemonDetails(this.enMonsterName);
  }

  ngAfterViewInit(): void {
    this.audio.nativeElement.volume = this.volume;
  }
}
