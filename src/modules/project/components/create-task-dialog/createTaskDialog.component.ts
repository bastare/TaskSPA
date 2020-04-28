/** @format */

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-createTaskDialog',
  templateUrl: './createTaskDialog.component.html',
  styleUrls: ['./createTaskDialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      task: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }
}
