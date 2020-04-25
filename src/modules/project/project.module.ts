/**
 * /* tslint:disable: ordered-imports
 *
 * @format
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as projectComponents from './components';

import * as projectContainers from './containers';

import * as projectGuards from './guards';

import * as projectServices from './services';

import { MaterialModule } from 'src/app/app.module';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MaterialModule],
  providers: [...projectServices.services, ...projectGuards.guards],
  declarations: [...projectContainers.containers, ...projectComponents.components],
  exports: [...projectContainers.containers, ...projectComponents.components],
  entryComponents: [...projectComponents.components]
})
export class ProjectModule {}
