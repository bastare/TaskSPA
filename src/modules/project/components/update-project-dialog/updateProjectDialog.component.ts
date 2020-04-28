/** @format */

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updateProjectDialog',
  templateUrl: './updateProjectDialog.component.html',
  styleUrls: ['./updateProjectDialog.component.css']
})
export class UpdateProjectDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      task: [this.data.task, Validators.required]
    });
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }
}
