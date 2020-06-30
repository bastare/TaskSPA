import { LoaderService } from './../../../../app/shared/interceptors/services/loader.service';
/** @format */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { UserForAuthorization } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loaded = this._loaderService.isLoading;

  loginForm: FormGroup;

  error: { state: boolean; message: string } = {} as {
    state: boolean;
    message: string;
  };

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _loaderService : LoaderService
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]+$/)]]
    });
  }

  authorize() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value as UserForAuthorization;

      this._authService.login$(user).subscribe(
        () => {
          this._router.navigateByUrl('/home');
        },
        error => {
          if (error.status === 401) {
            if (!this.error.state) {
              this.error.state = !this.error.state;
              this.error.message = error.error;
              console.log(error);
            }
          }
        }
      );
    }
  }
}
