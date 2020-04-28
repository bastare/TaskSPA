/** @format */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/modules/auth/guards';
import { AuthModule } from 'src/modules/auth/auth.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('../modules/home/home-routing.module').then(m => m.HomeRoutingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
