import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { LocationAreaEncounter, Pokemon, PokemonSpecies, PokemonSprites, PokemonType } from '../../../core/models/PokeAPI/pokemon.type';
import { FlavorText } from '../../../core/models/PokeAPI/utilities.type';
import { EncountersService } from '../../../core/services/monster/encounters.service';
import { PokemonPageService } from '../../../core/services/monster/pokemon-page.service';
import { PokeApiService } from '../../../core/services/poke-api.service';
import { PokedexService } from '../../../core/services/monster/pokedex.service';
import { WorldMapComponent } from '../../map/world-map/world-map.component';
import {
  NgbProgressbar,
  NgbNavContent,
  NgbNav,
	NgbNavItem,
	NgbNavItemRole,
	NgbNavLinkButton,
	NgbNavLinkBase,
	NgbNavOutlet,
 } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-monster-page',
  imports: [CommonModule, WorldMapComponent, NgbProgressbar, NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet],
  templateUrl: './monster-page.component.html',
  styleUrl: './monster-page.component.scss',
})
export class MonsterPageComponent implements OnInit, AfterViewInit {
  activeFlavorTab = 1;
  volume = 0.2;
  idMonster!: string;
  idPokeGen!: string;
  idDex!: string;
  monsterDetails$!: Observable<Pokemon>;
  monsterDetailsSpecies$!: Observable<PokemonSpecies>;
  pokemonSelectedSprite!: string;
  pokemonEncountersList$!: Observable<LocationAreaEncounter[]>;
  pokemonFlavorTextList!: FlavorText[];

  @ViewChild('audioPlayer', { static: false })
  audio!: ElementRef<HTMLAudioElement>;

  constructor(
    private route: ActivatedRoute,
    private pokeApi: PokeApiService,
    private pokedexService: PokedexService,
    private pokemonPageService: PokemonPageService,
    private encountersService: EncountersService,
  ) {
    this.idMonster = this.route.snapshot.params['idMonster'];
    this.idPokeGen = this.route.snapshot.params['idPokeGen'];
    this.idDex = this.route.snapshot.params['idDex'];
  }

  ngOnInit(): void {
    this.monsterDetails$ = this.pokeApi.getPokemonDetails(this.idMonster).pipe(
      tap((pokemonFullData) => {
        this.setEncountersList$(pokemonFullData.id, this.idPokeGen),
        this.setPokemonSprite$(pokemonFullData.sprites, this.idPokeGen)}
      ),
    );

    this.monsterDetailsSpecies$ = this.pokeApi.getPokemonSpeciesDetails(this.idMonster).pipe(
      tap((data) => console.log(data)),
      tap((detailsSpecies) => {
        this.setFlavorTextList$(detailsSpecies.flavor_text_entries, this.idPokeGen)
      })
    )
  }

  setPokemonSprite$(spriteObject: PokemonSprites, generation: string): void {
    this.pokemonSelectedSprite =
      this.pokemonPageService.getPokemonArtworkByIdGeneration(
        spriteObject,
        generation,
      );
  }

  setEncountersList$(id:number, generation:string): void {
    this.pokemonEncountersList$ = this.encountersService.getEncountersList(id.toString(), generation);
  }

  setFlavorTextList$(flavorTextList: FlavorText[], generation:string){
    this.pokemonFlavorTextList = this.pokemonPageService.filterPokemonFlavorTextEntriesByIdGeneration(flavorTextList, generation, 'fr');
  }

  ngAfterViewInit(): void {
    this.audio.nativeElement.volume = this.volume;
  }

  setTypeClasses(types: PokemonType[]): string {
    let classes:string[] = [];
    types.forEach((t, i) => {
      classes.push(`type-${i+1}-${t.type.name}`);
    })
    return classes.join(' ');
  }
}
