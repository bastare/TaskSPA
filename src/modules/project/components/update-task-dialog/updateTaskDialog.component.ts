/** @format */

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskForUpdate } from '../../models/task.models';

@Component({
  selector: 'app-updateTaskDialog',
  templateUrl: './updateTaskDialog.component.html',
  styleUrls: ['./updateTaskDialog.component.css']
})
export class UpdateTaskDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      task: [this.data.task, Validators.required],
      deadline: [this.data.deadline, Validators.required]
    });
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }
}
