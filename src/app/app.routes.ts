import { Routes } from '@angular/router';
import { MonsterPageComponent } from './features/monster/page/monster-page.component';
import { MonsterDexListPageComponent } from './features/pokedex/list/dex/monster-dex-list-page/monster-dex-list-page.component';
import { MonsterListComponent } from './features/pokedex/list/monster/monster-list/monster-list.component';
import { MapTestComponent } from './features/debug/map/map-test.component';

export const routes: Routes = [
  { path: '', component: MonsterDexListPageComponent },
  { path: 'pokedex/:region', component: MonsterListComponent }, // region => pokedex id
  { path: 'pokemon/:idMonster/:generation', component: MonsterPageComponent },
  { path: 'debug-map/:idMonster/:idPokeGen/:idDex', component: MapTestComponent }, // world map testing
  { path: '**', redirectTo: '' },
];
