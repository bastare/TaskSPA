/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _baseUrl: string;
  private _userId: number;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this._baseUrl  = environment.apiUrl + 'project';
    this._userId = _auth.getUserId();
  }

  removeProject$(id: number) {
    return this._http.delete(
      `${this._baseUrl}/${this._userId}/remove/${id}`,
      {
        responseType: 'json'
      }
    );
  }

  updateProject$(id: number, name: string) {
    return this._http.put(
      `${this._baseUrl}/${this._userId}/update`,
      { id, name },
      {
        responseType: 'json'
      }
    );
  }

  createProject$(name: string) {
    return this._http.post(
      `${this._baseUrl}/${this._userId}/create`,
      { name },
      {
        responseType: 'json'
      }
    );
  }
}
