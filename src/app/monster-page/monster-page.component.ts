import { PokemonPageService } from './../core/services/monster/pokemon-page.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { PokeApiService } from '../core/services/poke-api.service';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonSprites } from '../core/models/PokeAPI/pokemon.type';
import { PokedexService } from '../core/services/monster/pokedex.service';

@Component({
  selector: 'app-monster-page',
  imports: [CommonModule],
  templateUrl: './monster-page.component.html',
  styleUrl: './monster-page.component.scss',
})
export class MonsterPageComponent implements OnInit, AfterViewInit {
  volume = 0.2;
  idMonster!: string;
  idPokeGen!: string;
  idDex!: string;
  monsterDetails$!: Observable<Pokemon>;
  pokemonSelectedSprite!: string;

  @ViewChild('audioPlayer', { static: false })
  audio!: ElementRef<HTMLAudioElement>;

  constructor(
    private route: ActivatedRoute,
    private pokeApi: PokeApiService,
    private pokedexService: PokedexService,
    private pokemonPageService: PokemonPageService,
  ) {
    this.idMonster = this.route.snapshot.params['idMonster'];
    this.idPokeGen = this.route.snapshot.params['idPokeGen'];
    this.idDex = this.route.snapshot.params['idDex'];
    console.log({
      'id pokemon': this.idMonster,
      generation: this.idPokeGen,
      'id Endoint pokedex': this.idDex,
    });
    console.log(
      this.pokedexService.getCurrentPokedexData(parseInt(this.idDex)),
    );
  }

  ngOnInit(): void {
    this.monsterDetails$ = this.pokeApi.getPokemonDetails(this.idMonster).pipe(
      tap((data) => console.log(data)),
      tap((pokemonFullData) =>
        this.setPokemonSprite$(pokemonFullData.sprites, this.idPokeGen),
      ),
    );
  }

  setPokemonSprite$(spriteObject: PokemonSprites, generation: string): void {
    this.pokemonSelectedSprite =
      this.pokemonPageService.getPokemonArtworkByIdGeneration(
        spriteObject,
        generation,
      );
  }

  ngAfterViewInit(): void {
    this.audio.nativeElement.volume = this.volume;
  }
}
