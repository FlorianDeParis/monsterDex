import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MonsterPageComponent } from './features/monster/page/monster-page.component';
import { MonsterDexListPageComponent } from './features/pokedex/list/dex/monster-dex-list-page/monster-dex-list-page.component';
import { MonsterListComponent } from './features/pokedex/list/monster/monster-list/monster-list.component';
import { WorldMapComponent } from './features/map/world-map/world-map.component';
import { MapTestComponent } from './features/debug/map/map-test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokedexes', component: MonsterDexListPageComponent },
  { path: 'pokedex/:region', component: MonsterListComponent }, // region => pokedex id
  {
    path: 'pokemon/:idMonster/:idPokeGen/:idDex',
    component: MonsterPageComponent,
  }, // idMonster => national pokemon id, idPokeGen => pokemon generation, idDex => pokedex id
  { path: 'map/:idMonster/:idPokeGen/:idDex', component: MapTestComponent }, // world map testing
];
