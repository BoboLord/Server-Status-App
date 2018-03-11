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
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  errorMessage: string;
  email: FormControl;
  password: FormControl;
  constructor(private appService: AppService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
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
      console.log(this.email);
      console.log(this.password);
      this.appService.register(this.registrationForm.value.email, this.registrationForm.value.password).then(response =>
        console.log(response)
      ).catch(err => {
        if (err.status === 403) {
          this.errorMessage = err.error.message;
        }
      });
    } else {
      this.registrationFormSubmitted = true;
    }
  }
}
