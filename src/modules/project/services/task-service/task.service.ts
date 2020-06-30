/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task, Status } from '../../models/task.models';
import { AuthService } from 'src/modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _baseUrl: string;
  private _userId: number;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this._baseUrl  = environment.apiUrl + 'task';
    this._userId = _auth.getUserId();
  }

  getTask$(id: number) {
    return this._http.get(`${this._baseUrl}/${this._userId}/get/${id}`, {
      responseType: 'json'
    });
  }

  createTask$(
    projectId: number,
    name: string,
    deadline: Date,
    priority: number
  ) {
    return this._http.post(
      `${this._baseUrl}/${this._userId}/create/${projectId}`,
      { name, deadline, priority },
      {
        responseType: 'json'
      }
    );
  }

  updateTask$(id: number, name: string, deadline: Date) {
    return this._http.put(
      `${this._baseUrl}/${this._userId}/update`,
      { id, name, deadline },
      {
        responseType: 'json'
      }
    );
  }

  updateStatus$(id: number, status: Status) {
    return this._http.put(
      `${this._baseUrl}/${this._userId}/updateStatus`,
      { id, status },
      {
        responseType: 'json'
      }
    );
  }

  updatePrioraty$(tasks: Task[]) {
    return this._http.put(
      `${this._baseUrl}/${this._userId}/updatePrioraty`,
      { tasks },
      {
        responseType: 'json'
      }
    );
  }

  removeTask$(id) {
    return this._http.delete(`${this._baseUrl}/${this._userId}/remove/${id}`, {
      responseType: 'json'
    });
  }
}
