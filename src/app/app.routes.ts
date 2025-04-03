import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonsterPageComponent } from './monster-page/monster-page.component';
import { MonsterDexListComponent } from './monster-dex-list/monster-dex-list.component';
import { MonsterListComponent } from './monster-list/monster-list.component';
import { UISoundsComponent } from './core/components/uisounds/uisounds.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pokedexes', component: MonsterDexListComponent},
  { path: 'pokedex/:region', component: MonsterListComponent},
  { path: 'pokemon/:enMonsterName', component: MonsterPageComponent},
  { path: 'sound', component: UISoundsComponent},
];
