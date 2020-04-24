import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { UserForAuthorization } from '../../models/user.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        login: [
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

      this.authService.register$(user).subscribe(
        () =>
          this.authService.login$(user).subscribe(
            () => this.router.navigateByUrl('/home'),
            error => console.error(error.message)
          ),
        error => console.error(error.message)
      );
    }
  }
}
