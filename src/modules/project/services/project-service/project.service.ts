/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl + 'project';

  constructor(private http: HttpClient, private auth: AuthService) {}

  removeProject$(id: number) {
    return this.http.delete(`${this.baseUrl}/${this.auth.UserId}/remove/${id}`, {
      responseType: 'json'
    });
  }

  updateProject$(id: number, name: string) {
    return this.http.put(
      `${this.baseUrl}/${this.auth.UserId}/update`,
      { id, name },
      {
        responseType: 'json'
      }
    );
  }

  createProject$(name: string) {
    return this.http.post(
      `${this.baseUrl}/${this.auth.UserId}/create`,
      { name },
      {
        responseType: 'json'
      }
    );
  }
}
