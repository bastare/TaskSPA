/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/modules/auth/services';
import { Observable } from 'rxjs';
import { Project } from 'src/modules/project/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.apiUrl + 'data';
  userId: number;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userId = auth.UserId;
  }

  getData$(id: number = this.userId) {
    return this.http.get(`${this.baseUrl}/${id}/getData`, { responseType: 'json' });
  }
}
