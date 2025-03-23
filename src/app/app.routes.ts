import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonsterPageComponent } from './monster-page/monster-page.component';
import { MonsterListComponent } from './monster-list/monster-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pokedex/:region', component: MonsterListComponent},
  { path: 'pokemon/:enMonsterName', component: MonsterPageComponent}
];
