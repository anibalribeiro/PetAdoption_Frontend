import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { AuthenticationService } from '../../core/services/auth.service';
import { GlobalErrorHandler } from '../../core/services/globar-error.handler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private titleService: Title) {
    this.titleService.setTitle('Pet Adopt - Password Reset');
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.signupForm.controls;
  }

  signUp() {
    this.loading = true;
    this.authService.singUp({
      username: this.form.username.value,
      password: this.form.password.value,
      phone: this.form.phone.value,
    }).subscribe(data => {
      this.notificationService.snackbarSuccess('Registered successfully');
      this.router.navigate(['/auth/login']);
    }, error => {
      this.notificationService.snackbarError(GlobalErrorHandler.displayPrettyErrorMessage(error));
      this.loading = false;
    });
  }

  cancel() {
    this.router.navigate(['/auth/login']);
  }
}
