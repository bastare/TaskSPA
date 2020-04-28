/** @format */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeModule } from './home.module';

import * as homeContainers from './containers';

import * as homeGuards from './guards';

import { DataResolve } from './services/data.resolve';
import { TaskResolve } from '../project/services/task-service/task.resolve';

export const ROUTES: Routes = [
  {
    path: 'home',
    canActivate: [],
    component: homeContainers.HomeComponent
    // resolve: {
    //   dataResolver: DataResolve
    // }
  }
];

@NgModule({
  imports: [HomeModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
