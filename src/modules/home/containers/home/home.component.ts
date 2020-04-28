/** @format */

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/modules/auth/services';
import { DataService } from '../../services';

import { Project } from 'src/modules/project/models';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../../../project/components/create-project-dialog/createProjectDialog.component';
import { ProjectForCreate } from 'src/modules/project/models/task.models';
import { ProjectService } from 'src/modules/project/services';

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

  constructor(
    public auth: AuthService,
    private dataService: DataService,
    private dialog: MatDialog,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.dataService.getData$(this.auth.UserId).subscribe(res => {
      this.userData = res as Project[];
    });
  }

  createProjectDialog() {
    this.createProjectDialogRef = this.dialog.open(CreateProjectDialogComponent, {
      data: { task: '' }
    });

    this.createProjectDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.createProject$(result.task).subscribe(
          () => {
            this.dataService.getData$(this.auth.UserId).subscribe(res => {
              this.userData = res as Project[];
            });
          },
          error => alert(error.message)
        );
      }
    });
  }
}
