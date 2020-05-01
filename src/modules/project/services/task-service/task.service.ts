/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Task, Status } from '../../models/task.models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.apiUrl + 'task';

  userId: any;

  constructor(private http: HttpClient) {
    this.userId = new JwtHelperService().decodeToken(
      localStorage.getItem('token')
    ).nameid;
  }

  getTask$(id: number) {
    return this.http.get(`${this.baseUrl}/${this.userId}/get/${id}`, {
      responseType: 'json'
    });
  }

  createTask$(projectId: number, name: string, deadline: Date, priority: number) {
    return this.http.post(
      `${this.baseUrl}/${this.userId}/create/${projectId}`,
      { name, deadline, priority },
      {
        responseType: 'json'
      }
    );
  }

  updateTask$(id: number, name: string, deadline: Date) {
    return this.http.put(
      `${this.baseUrl}/${this.userId}/update`,
      { id, name, deadline },
      {
        responseType: 'json'
      }
    );
  }

  updateStatus$(id: number, status: Status) {
    return this.http.put(
      `${this.baseUrl}/${this.userId}/updateStatus`,
      { id, status },
      {
        responseType: 'json'
      }
    );
  }

  updatePrioraty$(tasks: Task[]) {
    return this.http.put(
      `${this.baseUrl}/${this.userId}/updatePrioraty`,
      { tasks },
      {
        responseType: 'json'
      }
    );
  }

  removeTask$(id) {
    return this.http.delete(`${this.baseUrl}/${this.userId}/remove/${id}`, {
      responseType: 'json'
    });
  }
}
