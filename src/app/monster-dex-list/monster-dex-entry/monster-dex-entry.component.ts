import { PokedexListEntry, PokedexListEntryVariant } from '../../core/models/monsterDex.type';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type dexEntry = (PokedexListEntry | PokedexListEntryVariant);

@Component({
  selector: 'app-monster-dex-entry',
  imports: [
    CommonModule,
    MonsterDexEntryComponent
  ],
  templateUrl: './monster-dex-entry.component.html',
  styleUrl: './monster-dex-entry.component.scss'
})

export class MonsterDexEntryComponent implements OnInit {
  @Input() dexEntry!: dexEntry
  toggle: boolean = false;
  label!: string;
  dexId!: number | null;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.label = this.isMainEntry(this.dexEntry) ?
      (this.dexEntry.pokedexVariants.length == 1 ?
        this.dexEntry.pokedexVariants[0].pokedexVariantName : this.dexEntry.label)
        : this.dexEntry.pokedexVariantName;
  }

  // Checks if it is an instance of a Pokedex variant
  isSubEntry(entry: dexEntry): entry is PokedexListEntryVariant {
    return (entry as PokedexListEntryVariant).pokedexId !== undefined;
  }

  // Checks if it is an instance of a Pokedex variant list
  isMainEntry(entry: dexEntry): entry is PokedexListEntry {
    return (entry as PokedexListEntry).label !== undefined;
  }

  isJustMainWithOneElement(entry: dexEntry): boolean {
    if(this.isMainEntry(entry) && (this.dexEntry as PokedexListEntry).pokedexVariants.length == 1){
      return true;
    }
    return false;
  }

  toggleChildList(): void {
    this.toggle = !this.toggle;
  }

  goToDex(dexId: number):void {
    this.route.navigateByUrl(`/pokedex/${dexId}`);
  }

  handleClick(entry: dexEntry): void {
    if(this.isJustMainWithOneElement(entry)){
      this.goToDex((entry as PokedexListEntry).pokedexVariants[0].pokedexId);
    } else if(this.isSubEntry(entry)){
      this.goToDex((entry as PokedexListEntryVariant).pokedexId);
    } else {
      this.toggleChildList();
    }
  }
}
