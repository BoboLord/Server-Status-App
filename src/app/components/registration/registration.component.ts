import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../services/app.service';
import { FormGroup, FormControl, AbstractControl, ValidatorFn, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationFormSubmitted: boolean;
  errorMessage: string;
  email: FormControl;
  password: FormControl;
  constructor(private appService: AppService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
  }

  createForm() {
    this.registrationForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registrationFormSubmitted = true;
      this.appService.userRegister(this.registrationForm.value.email, this.registrationForm.value.password).then(response =>
        console.log('successful')
      ).catch(err => {
        this.registrationForm.controls['email'].setErrors(null);
        this.registrationForm.controls['password'].setErrors(null);

        if (err.status === 403 || 400) {
          this.errorMessage = err.error.message;
          if (err.error.errorIn === 'email') {
            this.registrationForm.controls['email'].setErrors({ 'incorrect': true });
          }
          if (err.error.errorIn === 'password') {
            this.registrationForm.controls['password'].setErrors({ 'incorrect': true });
          }
        }
      });
    } else {
      this.registrationFormSubmitted = true;
      let emptyFieldErrorCount = 0;
      if (this.registrationForm.get('email').invalid) {
        if (this.registrationForm.value.email === '') {
          emptyFieldErrorCount++;
          this.errorMessage = 'Please enter your email ID';
        } else {
          this.errorMessage = 'Please enter a valid email ID';
          return;
        }
      }
      if (this.registrationForm.get('password').invalid) {
        emptyFieldErrorCount++;
        this.errorMessage = 'Please enter your password';
      }
      if (emptyFieldErrorCount > 1) {
        this.errorMessage = 'Please enter all the registration fields';
      }
    }
  }

  // onSubmit() {
  //   if (this.registrationForm.valid) {
  //     this.registrationFormSubmitted = true;
  //     console.log(this.email);
  //     console.log(this.password);
  //     this.appService.register(this.registrationForm.value.email, this.registrationForm.value.password).then(response =>
  //       console.log(response)
  //     ).catch(err => {
  //       if (err.status === 403) {
  //         this.errorMessage = err.error.message;
  //       }
  //     });
  //   } else {
  //     this.registrationFormSubmitted = true;
  //   }
  // }
}
