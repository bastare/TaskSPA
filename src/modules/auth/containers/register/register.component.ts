import { LoaderService } from './../../../../app/shared/interceptors/services/loader.service';
/** @format */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserForAuthorization } from '../../models/user.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loaded = this._loaderService.isLoading;

  registerForm: FormGroup;

  error: { state: boolean; message: string } = {} as {
    state: boolean;
    message: string;
  };

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this._formBuilder.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
            Validators.pattern(/^[a-z0-9_-]+$/)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            Validators.pattern(/^[a-z0-9_-]+$/)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: form =>
          form.get('password').value === form.get('confirmPassword').value
            ? null
            : { mismatch: true }
      }
    );
  }

  authorization() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value as UserForAuthorization;

      this._authService.register$(user).subscribe(
        () => this._router.navigateByUrl('/home'),
        error => {
          if (!this.error.state) {
            error.error?.forEach((error) => {
              this.error.state = !this.error.state;
              this.error.message = error.description
            })
            console.error(error);
          }
        }
      );
    }
  }
}
