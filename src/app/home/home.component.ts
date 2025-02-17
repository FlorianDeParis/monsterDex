import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../core/services/poke-api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private pokeApi: PokeApiService){}

  ngOnInit(): void {

    this.pokeApi.getKantoDex().pipe(
      tap(data => console.log(data))
    ).subscribe();
  }
}
