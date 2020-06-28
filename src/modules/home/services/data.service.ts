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
  baseUrl = environment.apiUrl + 'data';
  userId: number;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this.userId = _auth.UserId;
  }

  getData$(id: number = this.userId, page?, itemsPerPage?): Observable<PaginatedResult<Project[]>> {
    const paginationResult = new PaginatedResult<Project[]>();

    let params = new HttpParams();

    if(page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this._http.get(`${this.baseUrl}/${id}/getData`, {
      responseType: 'json',
      observe:'response',
      params
    }).pipe(
      map(response => {
        debugger
        paginationResult.result = response.body as Project[];

        if(response.headers.get('Pagination') != null){
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }

        return paginationResult;
      })
    )
  }
}
