import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/delay';

import { AuthenticationService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { GlobalErrorHandler } from '../../core/services/globar-error.handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private titleService: Title,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
    this.titleService.setTitle('Pet Adoption - Login');
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    const savedUsername = localStorage.getItem('savedUsername');
    this.loginForm = this.formBuilder.group({
      username: [savedUsername, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: new FormControl(savedUsername !== null)
    });
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.loginForm.controls;
  }

  login() {
    this.loading = true;
    this.authenticationService
      .login({
        username: this.form.username.value.toLowerCase(),
        password: this.form.password.value,
      }).subscribe(data => {
        if (this.form.rememberMe.value) {
          localStorage.setItem('savedUsername', this.form.username.value);
        } else {
          localStorage.removeItem('savedUsername');
        }
        this.router.navigate(['/pet']);
      }, error => {
        this.notificationService.snackbarError(GlobalErrorHandler.displayPrettyErrorMessage(error));
        this.loading = false;
      }
    );
  }

  register() {
    this.router.navigate(['/auth/signup']);
  }
}
