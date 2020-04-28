/** @format */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as authComponents from './components';

import * as authContainers from './containers';

import * as authGuards from './guards';

import * as authServices from './services';
import { ProjectModule } from '../project/project.module';
import { MaterialModule } from 'src/app/app.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectModule,
    MaterialModule
  ],
  providers: [...authServices.services, ...authGuards.guards],
  declarations: [...authContainers.containers, ...authComponents.components],
  exports: [...authContainers.containers, ...authComponents.components]
})
export class HomeModule {}
