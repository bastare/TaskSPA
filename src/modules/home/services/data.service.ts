import { Project } from './../../project/models/project.models';
/** @format */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/modules/auth/services';
import { PaginatedResult } from 'src/app/shared/pagination/models/pagination';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _baseUrl = environment.apiUrl + 'data';
  private _userId: number;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this._userId = _auth.UserId;
  }

  getData$(id: number = this._userId, page?: string, itemsPerPage?: string): Observable<PaginatedResult<Project[]>> {
    const paginationResult = new PaginatedResult<Project[]>();

    const params = new HttpParams()
      .set('pageNumber', page ?? '10')
      .set('pageSize',   itemsPerPage ?? '4')

    return this._http.get(`${this._baseUrl}/${id}/getData`, {
      responseType: 'json',
      observe:'response',
      params
    }).pipe(
      map(response => {
        paginationResult.result = response.body as Project[];

        if(response.headers.get('X-Pagination') != null){
          paginationResult.pagination = JSON.parse(response.headers.get('X-Pagination'))
        }

        return paginationResult;
      })
    )
  }
}
