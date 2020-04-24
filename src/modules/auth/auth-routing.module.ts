/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule } from './auth.module';

import * as authContainers from './containers';

import * as authGuards from './guards';

export const ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [],
    component: authContainers.LoginComponent
  },
  {
    path: 'register',
    canActivate: [],
    component: authContainers.RegisterComponent
  }
];

@NgModule({
  imports: [AuthModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
