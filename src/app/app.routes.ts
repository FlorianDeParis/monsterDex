import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonsterPageComponent } from './monster-page/monster-page.component';
import { MonsterDexListPageComponent } from './monster-dex-list/monster-dex-list-page/monster-dex-list-page.component';
import { MonsterListComponent } from './monster-list/monster-list.component';
import { WorldMapComponent } from './world-map/world-map.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pokedexes', component: MonsterDexListPageComponent},
  { path: 'pokedex/:region', component: MonsterListComponent}, // region => pokedex id
  { path: 'pokemon/:idMonster/:idPokeGen/:idDex', component: MonsterPageComponent}, // idMonster => national pokemon id, idPokeGen => pokemon generation, idDex => pokedex id
  { path: 'map/:map', component: WorldMapComponent} // static Kanto map
];
