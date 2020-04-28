/** @format */

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-createProjecrDialog',
  templateUrl: './createProjecrDialog.component.html',
  styleUrls: ['./createProjecrDialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      task: ['', Validators.required]
    });
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }
}
