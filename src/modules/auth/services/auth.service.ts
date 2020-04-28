/** @format */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { UserForView, UserForAuthorization } from '../models/user.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get UserId() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token'))?.nameid ?? {};
  }

  baseUrl = environment.apiUrl + 'api/auth';
  jwtHelper = new JwtHelperService();

  currentUser: UserForView;

  constructor(private http: HttpClient, private router: Router) {}

  login$(model: any) {
    return this.http.post(`${this.baseUrl}/authentication`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));

          this.currentUser = user.user;

          return user.user;
        }
      })
    );
  }

  register$(user: UserForAuthorization) {
    return this.http.post(`${this.baseUrl}/authorization`, user);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
