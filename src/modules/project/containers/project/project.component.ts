/** @format */

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { UpdateTaskDialogComponent } from '../../components/update-task-dialog/updateTaskDialog.component';

import { TaskForUpdate } from '../../models/task.models';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragHandle
} from '@angular/cdk/drag-drop';

//#region table
export interface PeriodicElement {
  name: string;
  position: number;
  deadline: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', deadline: new Date(2020, 20, 20) },
  { position: 2, name: 'Helium', deadline: new Date(2020, 20, 20) },
  { position: 3, name: 'Lithium', deadline: new Date(2020, 20, 20) }
];

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'deadline', 'status', 'update'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  fileNameDialogRef: MatDialogRef<UpdateTaskDialogComponent, TaskForUpdate>;
  constructor(private dialog: MatDialog) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  openFileDialog(file?) {
    this.fileNameDialogRef = this.dialog.open(UpdateTaskDialogComponent, {
      data: { task: '', deadline: '' }
    });

    this.fileNameDialogRef.afterClosed().subscribe(result => {
      if (file) {
        this.dataSource.filteredData.forEach(x => {
          if (file.position === x.position) {
            x.name = result.task;
            x.deadline = result.deadline;
          }
        });
      }
    });
  }

  // dropTable(event: CdkDragDrop<PeriodicElement[]>) {
  //   const prevIndex = ELEMENT_DATA.findIndex((d) => d === event.item.data);
  //   moveItemInArray(ELEMENT_DATA, prevIndex, event.currentIndex);
  //   this.dataSource.renderRows();
}
