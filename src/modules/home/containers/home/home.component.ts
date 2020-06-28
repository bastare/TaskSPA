/** @format */

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/modules/auth/services';
import { DataService } from '../../services';

import {
  ngxLoadingAnimationTypes,
  INgxLoadingConfig
} from 'ngx-loading';

import { Project } from 'src/modules/project/models';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../../../project/components/create-project-dialog/createProjectDialog.component';
import { ProjectForCreate } from 'src/modules/project/models/task.models';
import { ProjectService } from 'src/modules/project/services';
import { LoaderService } from 'src/app/shared/interceptors/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: Project[];
  fetched = false;

  createProjectDialogRef: MatDialogRef<
    CreateProjectDialogComponent,
    ProjectForCreate
  >;

  loaded = this._loaderServ.isLoading;

  config: INgxLoadingConfig = {
    animationType: ngxLoadingAnimationTypes.doubleBounce,
    backdropBackgroundColour: 'rgba(0, 255, 0, 0)',
    backdropBorderRadius: '8px',
    primaryColour: '#1ea',
    secondaryColour: '#f11',
    tertiaryColour: '#1ee'
  };

  constructor(
    private _auth: AuthService,
    private _dataService: DataService,
    private _dialog: MatDialog,
    private _projectService: ProjectService,
    private _loaderServ: LoaderService
  ) {}

  ngOnInit() {
    // TODO: Add full func
    this._dataService.getData$(this._auth.UserId).subscribe(res => {
      this.userData = res.result;
    });
  }


  createProjectDialog() {
    this.createProjectDialogRef = this._dialog.open(
      CreateProjectDialogComponent,
      {
        data: { task: '' }
      }
    );

    this.createProjectDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._projectService.createProject$(result.task).subscribe(
          () => {
            this._dataService.getData$(this._auth.UserId).subscribe(res => {
              this.userData = res.result;
            });
          },
          error => alert(error.message)
        );
      }
    });
  }
}
