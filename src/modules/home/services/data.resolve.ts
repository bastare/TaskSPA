/** @format */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from '.';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/modules/auth/services';

@Injectable()
export class DataResolve implements Resolve<any> {
  constructor(private dataService: DataService, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.dataService.getData$(this.auth.UserId);
  }
}
