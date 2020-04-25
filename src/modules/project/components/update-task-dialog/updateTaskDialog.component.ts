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
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      task: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }
}
