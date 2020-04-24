/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeModule } from './home.module';

import * as homeContainers from './containers';

import * as homeGuards from './guards';

export const ROUTES: Routes = [
  {
    path: 'home',
    canActivate: [],
    component: homeContainers.HomeComponent
  }
];

@NgModule({
  imports: [HomeModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
