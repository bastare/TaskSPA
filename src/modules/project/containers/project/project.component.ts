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

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
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
    private dialog: MatDialog,
    private taskService: TaskService,
    private projectService: ProjectService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.setExpired(this.data.tasks);

    this.dataSource = new MatTableDataSource(this.data.tasks);

    this.projectId = this.data.projectId;
    this.projectName = this.data.projectName;
  }

  private setExpired(tasks: Task[]): void {
    tasks.forEach(checkingTask => {
      if (
        new Date(checkingTask.deadline).getTime() < new Date().getTime() &&
        checkingTask.status === Status.Onway
      ) {
        this.taskService.updateStatus$(checkingTask.id, Status.Expired).subscribe(
          () => {},
          error => console.error(error.message)
        );

        checkingTask.status = Status.Expired;
      }
    });
  }

  updateTaskDialog(transfer: Task) {
    this.updateTaskDialogRef = this.dialog.open(UpdateTaskDialogComponent, {
      data: {
        task: transfer.name,
        deadline: transfer.deadline
      }
    });

    this.updateTaskDialogRef.afterClosed().subscribe(result => {
      if (transfer) {
        this.taskService
          .updateTask$(transfer.id, result.task, result.deadline)
          .subscribe(
            () => {
              this.updateTableData();
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
              this.updateTableData();
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
      () => {},
      error => console.error(error.message)
    );

    element.status = Status.Done;
  }

  removeTask(id) {
    this.taskService.removeTask$(id).subscribe(
      () => {},
      error => console.error(error.message)
    );
    this.dataSource.data = this.dataSource.data.filter(x => x.id !== id);
  }

  removeProject() {
    this.projectService.removeProject$(this.projectId).subscribe(
      () => {
        this.deleted = !this.deleted;
      },
      error => console.error(error.message)
    );
  }

  private updateTableData() {
    this.dataService.getData$().subscribe(
      res => {
        this.data.tasks = (res as Project[]).find(
          x => x.projectId === this.projectId
        )?.tasks;

        this.dataSource.data = this.data.tasks;
      },
      error => {
        console.error(error.message);
      }
    );
  }
}
