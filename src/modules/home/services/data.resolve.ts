/** @format */

import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DataService } from '.';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/modules/auth/services';

@Injectable()
export class DataResolve implements Resolve<any> {
  constructor(private _dataService: DataService, private _auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this._dataService.getData$(this._auth.getUserId());
  }
}
