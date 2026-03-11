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
import { LocationAreaEncounter, Pokemon, PokemonSpecies, PokemonSprites, PokemonStat, PokemonStatPast, PokemonType, PokemonTypePast } from '../../../core/models/PokeAPI/pokemon.type';
import { FlavorText } from '../../../core/models/PokeAPI/utilities.type';
import { EncountersService } from '../../../core/services/monster/encounters.service';
import { PokemonPageService } from '../../../core/services/monster/pokemon-page.service';
import type { TableRow } from '../../../core/services/monster/pokemon-page.service';
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
  NgbAccordionButton,
	NgbAccordionDirective,
	NgbAccordionItem,
	NgbAccordionHeader,
	NgbAccordionToggle,
	NgbAccordionBody,
	NgbAccordionCollapse,
 } from '@ng-bootstrap/ng-bootstrap';
 import { toArabic } from 'typescript-roman-numbers-converter';

@Component({
  selector: 'app-monster-page',
  imports: [
    CommonModule,
    WorldMapComponent,
    NgbProgressbar,
    NgbNavContent,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLinkButton,
    NgbNavLinkBase,
    NgbNavOutlet,
    NgbAccordionButton,
		NgbAccordionDirective,
		NgbAccordionItem,
		NgbAccordionHeader,
		NgbAccordionToggle,
		NgbAccordionBody,
		NgbAccordionCollapse,
  ],
  templateUrl: './monster-page.component.html',
  styleUrl: './monster-page.component.scss',
})
export class MonsterPageComponent implements OnInit, AfterViewInit {
  activeFlavorTab = 0;
  volume = 0.2;
  idMonster!: string;
  idPokeGen!: string;
  idDex!: string;
  monsterDetails$!: Observable<Pokemon>;
  monsterDetailsSpecies$!: Observable<PokemonSpecies>;
  pokemonSelectedSprite!: string;
  pokemonEncountersList$!: Observable<LocationAreaEncounter[]>;
  pokemonFlavorTextList!: FlavorText[];
  pokemonFlattenedEncountersList$!: Observable<TableRow[]>;

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
        this.setPokemonSprite$(pokemonFullData.sprites, this.idPokeGen),
        this.setFlattenedEncountersList$(pokemonFullData.id, this.idPokeGen)}
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
    this.pokemonEncountersList$ = this.encountersService.getEncountersByGeneration(id.toString(), generation);
  }

  setFlavorTextList$(flavorTextList: FlavorText[], generation:string){
    this.pokemonFlavorTextList = this.pokemonPageService.filterPokemonFlavorTextEntriesByIdGeneration(flavorTextList, generation, 'fr');
  }

  getEncounterIcon(key: string): string{
    return this.encountersService.getEncounterIconPath(key);
  }

  setTypeClasses(types: PokemonType[]): string {
    let classes:string[] = [];
    types.forEach((t, i) => {
      classes.push(`type-${i+1}-${t.type.name}`);
    })
    return classes.join(' ');
  }

  setFlattenedEncountersList$(id:number, generation:string): void {
    this.pokemonFlattenedEncountersList$ = this.pokemonPageService.getFlattenedEncountersList(id.toString(), generation);
  }

  setCurrentGenerationStats(generation: string, stats: PokemonStat[], past_stats?: PokemonStatPast[]): PokemonStat[]{
    if(past_stats && past_stats.length > 0 && generation === '1'){
      let renderedStats:PokemonStat[] = [];
      renderedStats = stats.filter(
        (groupStat) => !['special-attack','special-defense'].includes(groupStat.stat.name)
      )
      past_stats.map(
        (groupPastStat) => {
          if(groupPastStat.generation.name === 'generation-i'){
            groupPastStat.stats.map(
              (pastStat) => renderedStats.push(pastStat)
            )
          }
        }
      )
      return renderedStats
    }
    return stats;
  }

  setCurrentGenerationType(generation: string, types: PokemonType[], past_types?: PokemonTypePast[]): PokemonType[] {
    if(past_types && past_types.length > 0){
      let renderedTypes:PokemonType[] = [];
      past_types.map(
        (groupType) =>  {
          if(this.genLitteralToGenString(groupType.generation.name) >= generation){
            groupType.types.map(
              type => renderedTypes.push(type)
            )
          }
        }
      )
      return (renderedTypes.length != 0 ? renderedTypes : types);
    }
    return types;
  }

  genLitteralToGenString(entry: string): string {
    if(entry.match(/generation-/)){
      return ''+toArabic(entry.split(/generation-/)[1]);
    }
    return entry
  }

  ngAfterViewInit(): void {
    this.audio.nativeElement.volume = this.volume;
  }
}
