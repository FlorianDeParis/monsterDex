import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonsterPageComponent } from './monster-page/monster-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pokemon/:enMonsterName', component: MonsterPageComponent}
];
