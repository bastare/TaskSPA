/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl + 'project';

  constructor(private _http: HttpClient, private _auth: AuthService) {}

  removeProject$(id: number) {
    return this._http.delete(
      `${this.baseUrl}/${this._auth.UserId}/remove/${id}`,
      {
        responseType: 'json'
      }
    );
  }

  updateProject$(id: number, name: string) {
    return this._http.put(
      `${this.baseUrl}/${this._auth.UserId}/update`,
      { id, name },
      {
        responseType: 'json'
      }
    );
  }

  createProject$(name: string) {
    return this._http.post(
      `${this.baseUrl}/${this._auth.UserId}/create`,
      { name },
      {
        responseType: 'json'
      }
    );
  }
}
