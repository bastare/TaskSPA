/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.apiUrl + 'data';
  userId: number;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this.userId = _auth.UserId;
  }

  getData$(id: number = this.userId) {
    return this._http.get(`${this.baseUrl}/${id}/getData`, {
      responseType: 'json'
    });
  }
}
