/** @format */

import { Component, VERSION } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = VERSION;
}
