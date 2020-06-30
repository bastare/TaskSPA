/** @format */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../../environments/environment";
import { UserForView, UserForAuthorization } from "../models/user.models";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _baseUrl: string;
  private _jwtHelper: JwtHelperService;

  currentUser: UserForView;

  constructor(private _http: HttpClient, private _router: Router) {
    this._baseUrl = environment.apiUrl + "api/auth";
    this._jwtHelper = new JwtHelperService();
  }

  getUserId(): number {
    return this._jwtHelper.decodeToken(localStorage.getItem("token")).nameid;
  }

  getRoles(): Array<string> {
    return this._jwtHelper.decodeToken(localStorage.getItem("token")).role;
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  login$(model: any) {
    return this._http.post(`${this._baseUrl}/authentication`, model).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));

          this.currentUser = response.user;

          return response.user;
        }
      })
    );
  }

  register$(user: UserForAuthorization) {
    return this._http.post(`${this._baseUrl}/authorization`, user).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));

          this.currentUser = response.user;

          return response.user;
        }
      })
    );
  }

  loggedIn(): boolean {
    return !this._jwtHelper.isTokenExpired(this.getToken());
  }

  roleMatcher(allowedRole): boolean {
    let isMatch = false;

    const userRoles = this.getRoles();

    allowedRole.forEach((element) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return false;
      }
    });

    return isMatch;
  }

  logOut() {
    localStorage.clear();
    this._router.navigateByUrl("/auth/login");
  }
}
