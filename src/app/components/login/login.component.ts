import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../services/app.service';
import { FormGroup, FormControl, AbstractControl, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { ValidationTool } from '../../utilities/validation-tool';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormSubmitted: boolean;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  errorMessage: string;
  email: FormControl;
  password: FormControl;

  constructor(private appService: AppService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    this.loginForm.controls['email'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);

    if (this.loginForm.valid) {
      this.loginFormSubmitted = true;
      this.appService.login(this.loginForm.value.email, this.loginForm.value.password).then(response =>
        console.log('successful')
      ).catch(err => {
        if (err.status === 403 || 400) {
          this.errorMessage = err.error.message;
          if (err.error.errorIn === 'email') {
            this.loginForm.controls['email'].setErrors({ 'incorrect': true });
          }
          if (err.error.errorIn === 'password') {
            this.loginForm.controls['password'].setErrors({ 'incorrect': true });
          }
        }
      });
    } else {
      this.loginFormSubmitted = true;
      let emptyFieldErrorCount = 0;
      if (this.loginForm.get('email').invalid) {
        if (this.loginForm.value.email === '') {
          emptyFieldErrorCount++;
          this.errorMessage = 'Please enter your email ID';
        } else {
          this.errorMessage = 'Please enter a valid email ID';
          return;
        }
      }
      if (this.loginForm.get('password').invalid) {
        emptyFieldErrorCount++;
        this.errorMessage = 'Please enter your password';
      }
      if (emptyFieldErrorCount > 1) {
        this.errorMessage = 'Please enter all the login fields';
      }
    }
  }
}
