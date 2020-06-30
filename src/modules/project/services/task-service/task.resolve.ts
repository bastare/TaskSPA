/** @format */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TaskService } from '..';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/modules/auth/services';

@Injectable()
export class TaskResolve implements Resolve<any> {
  constructor(private taskService: TaskService, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.taskService.removeTask$(this.auth.getUserId());
  }
}
