import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { UserForView, UserForAuthorization } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: UserForView;

  constructor(private http: HttpClient) {}

  login$(model: any) {
    return this.http.post(this.baseUrl + 'authentication', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));

          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;

          return user.user;
        }
      })
    );
  }

  register$(user: UserForAuthorization) {
    return this.http.post(this.baseUrl + 'authorization', user);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
