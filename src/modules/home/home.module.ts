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
import { NgxLoadingModule } from 'ngx-loading';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ContentComponent } from './components/content/content.component';
import { RoleGuardDirective } from './directives/role-guard.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectModule,
    MaterialModule,
    NgxLoadingModule,
    InfiniteScrollModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [...authServices.services, ...authGuards.guards],
  declarations: [...authContainers.containers, ...authComponents.components, ContentComponent, RoleGuardDirective],
  exports: [...authContainers.containers, ...authComponents.components]
})
export class HomeModule {}
