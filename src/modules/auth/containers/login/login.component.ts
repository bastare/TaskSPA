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
  loginForm: FormGroup;
  state: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]+$/)]]
    });
  }

  authorize() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value as UserForAuthorization;

      this.authService.login$(user).subscribe(
        () => {
          this.router.navigateByUrl('/home');
        },
        error => {
          if (error.status === 401) {
            if (!this.state) this.state = !this.state;
          }
        }
      );
    }
  }
}
