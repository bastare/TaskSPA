/** @format */

import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  DoCheck
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { UpdateTaskDialogComponent } from '../../components/update-task-dialog/updateTaskDialog.component';

import {
  TaskForUpdate,
  Status,
  Task,
  TaskForCreate,
  ProjectForUpdate,
  ProjectForCreate
} from '../../models/task.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Project } from '../../models';
import { TaskService, ProjectService } from '../../services';
import { DataService } from 'src/modules/home/services';
import {
  CreateTaskDialogComponent,
  UpdateProjectDialogComponent
} from '../../components';
import { AuthService } from 'src/modules/auth/services';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, DoCheck {
  //#region prop
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() data: Project;

  displayedColumns: string[] = [
    'state',
    'priority',
    'name',
    'deadline',
    'status',
    'update',
    'remove'
  ];
  dataSource: MatTableDataSource<Task>;

  updateTaskDialogRef: MatDialogRef<UpdateTaskDialogComponent, TaskForUpdate>;
  createTaskDialogRef: MatDialogRef<CreateTaskDialogComponent, TaskForCreate>;

  updateProjectDialogRef: MatDialogRef<
    UpdateProjectDialogComponent,
    ProjectForUpdate
  >;

  projectId: number;
  projectName: string;

  deleted: boolean;
  fetched: any;
  //#endregion

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private projectService: ProjectService,
    private dataService: DataService
  ) {}

  ngDoCheck(): void {
    if (this.dataSource?.data?.length) {
      const [checkingTask] = this.dataSource.data;
      if (
        new Date(checkingTask.deadline).getTime() < new Date().getTime() &&
        checkingTask.status === Status.Onway
      )
        this.taskService.updateStatus$(checkingTask.id, Status.Expired).subscribe(
          () => this._updateTableData(),
          error => console.error(error.message)
        );
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.tasks);
    this.dataSource.sort = this.sort;

    this.projectId = this.data.projectId;
    this.projectName = this.data.projectName;
  }

  updateTaskDialog(transfer: Task) {
    this.updateTaskDialogRef = this.dialog.open(UpdateTaskDialogComponent, {
      data: { task: transfer.name, deadline: transfer.deadline }
    });

    this.updateTaskDialogRef.afterClosed().subscribe(result => {
      if (transfer) {
        this.taskService
          .updateTask$(transfer.id, result.task, result.deadline)
          .subscribe(
            () => {
              this._updateTableData();
            },
            error => console.error(error.message)
          );
      }
    });
  }

  updateProjectDialog() {
    this.updateProjectDialogRef = this.dialog.open(UpdateProjectDialogComponent, {
      data: { task: this.projectName }
    });

    this.updateProjectDialogRef.afterClosed().subscribe(result => {
      this.projectService.updateProject$(this.projectId, result.task).subscribe(
        () => {
          this.projectName = result.task;
        },
        error => console.error(error.message)
      );
    });
  }

  createTaskDialog() {
    this.createTaskDialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: { task: '', deadline: '', priority: '' }
    });

    this.createTaskDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService
          .createTask$(this.projectId, result.task, result.deadline, result.priority)
          .subscribe(
            () => {
              this._updateTableData();
            },
            error => console.error(error.message)
          );
      }
    });
  }

  dropTable(event: CdkDragDrop<Task[]>) {
    const prevIndex = this.data.tasks.findIndex(d => d === event.item.data);

    moveItemInArray(this.data.tasks, prevIndex, event.currentIndex);

    for (let index = 0; index < this.dataSource.filteredData.length; index++)
      this.data.tasks[index].priority = index;

    this.dataSource.data = this.data.tasks;

    this.taskService.updatePrioraty$(this.data.tasks).subscribe(
      () => {},
      error => console.error(error.message)
    );
  }

  setDone(element: Task) {
    this.taskService.updateStatus$(element.id, Status.Done).subscribe(
      () => {
        this._updateTableData();
      },
      error => console.error(error.message)
    );
  }

  removeTask(id) {
    this.taskService.removeTask$(id).subscribe(
      () => {
        this._updateTableData();
      },
      error => console.error(error.message)
    );
  }

  removeProject() {
    this.projectService.removeProject$(this.projectId).subscribe(
      () => {
        this.deleted = !this.deleted;
      },
      error => console.error(error.message)
    );
  }

  _updateTableData() {
    this.dataService.getData$().subscribe(
      res => {
        this.data.tasks = (res as Project[]).find(
          x => x.projectId === this.projectId
        ).tasks;

        this.dataSource.data = this.data.tasks;
      },
      error => {
        console.error(error.message);
      }
    );
  }
}
