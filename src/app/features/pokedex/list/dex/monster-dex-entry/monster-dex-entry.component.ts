import {
  PokedexListEntry,
  PokedexListEntryVariant,
} from '../../../../../core/models/monsterDex.type';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../../../../core/services/toaster.service';

type dexEntry = PokedexListEntry | PokedexListEntryVariant;

@Component({
  selector: 'app-monster-dex-entry',
  imports: [CommonModule],
  templateUrl: './monster-dex-entry.component.html',
  styleUrl: './monster-dex-entry.component.scss',
})
export class MonsterDexEntryComponent implements OnInit{
  @Input() dexEntry!: PokedexListEntry;
  @Input() cssClass?: string;
  toggle: boolean = false;
  dexId!: number | null;
  imgPath!: string;
  BGCardStyle!: string;

  constructor(
    private route: Router,
    private toaster: ToasterService,
  ) {}

  ngOnInit(){
    this.imgPath = `assets/img/backgrounds/${(this.dexEntry?.imgPath || "world.png")}`;
    this.BGCardStyle = `url(${this.imgPath})`;
  }

  goToDex(pokedexSubEntry: PokedexListEntryVariant): void {
    this.route.navigate(
      [`/pokedex/${pokedexSubEntry.pokedexId}`],
      { state: { ...pokedexSubEntry}}
    );
  }

  handleClick(pokedexSubEntry: PokedexListEntryVariant): void {
    this.toaster.success(
      `Navigation vers le pokédex ${pokedexSubEntry.pokedexVariantName}`,
    );
    this.goToDex(pokedexSubEntry);
  }
}
