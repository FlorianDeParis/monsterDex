import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { tap, Observable } from 'rxjs';
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
export class MonsterPageComponent implements OnInit {
  enMonsterName!: string;
  monsterDetails$!: Observable<Pokemon>;
  constructor(private route: ActivatedRoute, private pokeApi: PokeApiService) {
    this.enMonsterName = this.route.snapshot.params['enMonsterName'];
  }

  ngOnInit(): void {
    this.monsterDetails$ = this.pokeApi.getPokemonDetails(this.enMonsterName).pipe(
      tap(result => console.log(result))
    );
    console.log(this.enMonsterName);
  }
}
