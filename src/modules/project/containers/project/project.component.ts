/** @format */

import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
  DoCheck,
  OnChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UpdateTaskDialogComponent } from '../../components/update-task-dialog/updateTaskDialog.component';
import {
  TaskForUpdate,
  Status,
  Task,
  TaskForCreate,
  ProjectForUpdate
} from '../../models/task.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Project } from '../../models';
import { TaskService, ProjectService } from '../../services';
import { DataService } from 'src/modules/home/services';
import {
  CreateTaskDialogComponent,
  UpdateProjectDialogComponent
} from '../../components';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, DoCheck {
  //#region prop
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

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
  fetched: boolean;
  //#endregion

  constructor(
    private _dialog: MatDialog,
    private _taskService: TaskService,
    private _projectService: ProjectService
  ) {}

  ngDoCheck(): void {
    this.dataSource.data.forEach(x => {
      if (
        Status.Onway === x.status &&
        new Date(x.deadline).getTime() < new Date().getTime()
      ) {
        x.status = Status.Expired;
      } else if (
        Status.Expired === x.status &&
        new Date(x.deadline).getTime() > new Date().getTime()
      ) {
        x.status = Status.Onway;
      }
    });
  }

  ngOnInit() {
    this._setStatus(this.data.tasks);

    this.dataSource = new MatTableDataSource(this.data.tasks);

    this.projectId = this.data.projectId;
    this.projectName = this.data.projectName;
  }

  private _setStatus(tasks: Task[]): void {
    tasks.forEach(checkingTask => {
      if (
        new Date(checkingTask.deadline).getTime() < new Date().getTime() &&
        checkingTask.status === Status.Onway
      ) {
        this._taskService
          .updateStatus$(checkingTask.id, Status.Expired)
          .subscribe(
            () => {},
            error => console.error(error.message)
          );

        checkingTask.status = Status.Expired;
      } else if (
        new Date(checkingTask.deadline).getTime() > new Date().getTime() &&
        checkingTask.status === Status.Expired
      ) {
        this._taskService
          .updateStatus$(checkingTask.id, Status.Onway)
          .subscribe(
            () => {},
            error => console.error(error.message)
          );
      }
    });
  }

  updateTaskDialog(transfer: Task) {
    this.updateTaskDialogRef = this._dialog.open(UpdateTaskDialogComponent, {
      data: {
        task: transfer.name,
        deadline: transfer.deadline
      }
    });

    this.updateTaskDialogRef.afterClosed().subscribe(result => {
      if (transfer) {
        this._taskService
          .updateTask$(transfer.id, result.task, result.deadline)
          .subscribe(
            task => {
              this._updateTask(task as Task);
            },
            error => console.error(error.message)
          );
      }
    });
  }

  private _updateTask(task: Task) {
    this.dataSource.data = this.dataSource.data.map(x =>
      x.id === task.id ? task : x
    );
  }

  updateProjectDialog() {
    this.updateProjectDialogRef = this._dialog.open(
      UpdateProjectDialogComponent,
      {
        data: { task: this.projectName }
      }
    );

    this.updateProjectDialogRef.afterClosed().subscribe(result => {
      this._projectService
        .updateProject$(this.projectId, result.task)
        .subscribe(
          () => {
            this.projectName = result.task;
          },
          error => console.error(error.message)
        );
    });
  }

  createTaskDialog() {
    this.createTaskDialogRef = this._dialog.open(CreateTaskDialogComponent, {
      data: { task: '', deadline: '', priority: '' }
    });

    this.createTaskDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._taskService
          .createTask$(
            this.projectId,
            result.task,
            result.deadline,
            result.priority
          )
          .subscribe(
            task => {
              this._addTaskToTable(task as Task);
            },
            error => console.error(error.message)
          );
      }
    });
  }

  private _addTaskToTable(task: Task) {
    const tmpTask = [...this.dataSource.data];
    tmpTask.push(task);

    this.dataSource.data = tmpTask;
  }

  dropTable(event: CdkDragDrop<Task[]>) {
    const prevIndex = this.dataSource.data.findIndex(
      d => d === event.item.data
    );

    moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);

    for (let index = 0; index < this.dataSource.filteredData.length; index++)
      this.dataSource.data[index].priority = index;

    this.dataSource.data = this.dataSource.data;

    this._taskService.updatePrioraty$(this.dataSource.data).subscribe(
      () => {},
      error => console.error(error.message)
    );
  }

  setDone(element: Task) {
    this._taskService.updateStatus$(element.id, Status.Done).subscribe(
      () => {},
      error => console.error(error.message)
    );

    element.status = Status.Done;
  }

  removeTask(id: number) {
    this._taskService.removeTask$(id).subscribe(
      () => {},
      error => console.error(error.message)
    );
    this.dataSource.data = this.dataSource.data.filter(x => x.id !== id);
  }

  removeProject() {
    this._projectService.removeProject$(this.projectId).subscribe(
      () => {
        this.deleted = !this.deleted;
      },
      error => console.error(error.message)
    );
  }
}
