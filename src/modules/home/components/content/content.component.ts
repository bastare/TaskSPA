/** @format */

import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/modules/auth/services";
import { DataService } from "../../services";

import { ngxLoadingAnimationTypes, INgxLoadingConfig } from "ngx-loading";

import { Project } from "src/modules/project/models";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { CreateProjectDialogComponent } from "../../../project/components/create-project-dialog/createProjectDialog.component";
import { ProjectForCreate } from "src/modules/project/models/task.models";
import { ProjectService } from "src/modules/project/services";
import { LoaderService } from "src/app/shared/interceptors/services/loader.service";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"],
})
export class ContentComponent implements OnInit {
  userData: Project[];
  fetched = false;
  loaded = this._loaderServ.isLoading;

  createProjectDialogRef: MatDialogRef<
    CreateProjectDialogComponent,
    ProjectForCreate
  >;

  config: INgxLoadingConfig = {
    animationType: ngxLoadingAnimationTypes.doubleBounce,
    backdropBackgroundColour: "rgba(0, 255, 0, 0)",
    backdropBorderRadius: "8px",
    primaryColour: "#1ea",
    secondaryColour: "#f11",
    tertiaryColour: "#1ee",
  };

  private _projectsNumbers: number;

  constructor(
    public auth: AuthService,
    private _dataService: DataService,
    private _dialog: MatDialog,
    private _projectService: ProjectService,
    private _loaderServ: LoaderService
  ) {
    this._projectsNumbers = 3;
  }

  ngOnInit() {
    this._load_projects();
  }

  createProjectDialog() {
    this.createProjectDialogRef = this._dialog.open(
      CreateProjectDialogComponent,
      {
        data: { task: "" },
      }
    );

    this.createProjectDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._projectService.createProject$(result.task).subscribe(
          () => {
            this._load_projects();
          },
          (error) => alert(error.message)
        );
      }
    });
  }

  accumulateProjects() {
    this._projectsNumbers += 2;

    this._load_projects();
  }

  private _load_projects() {
    this._dataService
      .getData$(this.auth.getUserId(), this._projectsNumbers)
      .subscribe((result) => {
        this.userData = result.result;
      });
  }
}
