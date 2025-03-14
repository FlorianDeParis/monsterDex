import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { tap } from 'rxjs';
import { PokeApiService } from '../core/services/poke-api.service';

@Component({
  selector: 'app-monster-page',
  imports: [],
  templateUrl: './monster-page.component.html',
  styleUrl: './monster-page.component.scss'
})
export class MonsterPageComponent implements OnInit {
  enMonsterName!: string;
  monsterDetails$!: any;
  constructor(private route: ActivatedRoute, private pokeApi: PokeApiService) {
    this.enMonsterName = this.route.snapshot.params['enMonsterName'];
  }

  ngOnInit(): void {
    this.pokeApi.getPokemonDetails(this.enMonsterName).pipe(
      tap(result => console.log(result))
    ).subscribe();
    console.log(this.enMonsterName);
  }
}
