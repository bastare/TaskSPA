/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.apiUrl + 'task';

  userId: any;

  constructor(private http: HttpClient) {
    this.userId = new JwtHelperService().decodeToken(localStorage.getItem('token')).nameid;
  }

  createTask$(projectId, name, deadline, priority) {
    return this.http.post(
      `${this.baseUrl}/${this.userId}/create/${projectId}`,
      { name, deadline, priority },
      {
        responseType: 'json'
      }
    );
  }

  updateTask$(id, name, deadline) {
    return this.http.put(
      `${this.baseUrl}/${this.userId}/update`,
      { id, name, deadline },
      {
        responseType: 'json'
      }
    );
  }

  updateStatus$(id, status) {
    return this.http.put(
      `${this.baseUrl}/${this.userId}/updateStatus`,
      { id, status },
      {
        responseType: 'json'
      }
    );
  }

  updatePrioraty$(tasks) {
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
