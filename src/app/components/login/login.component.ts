import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../services/app.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email = new FormControl('', Validators.required);
  // password = new FormControl('', Validators.required);
  errorMessage: string;
  constructor(private appService: AppService, private router: Router, fb: FormBuilder) {
    this.loginForm = fb.group({
      'email': this.email,
      'password': ['', Validators.required]
    });
  }

  ngOnInit() { }

  onSubmit() {
    console.log('model-based form submitted');
    console.log(this.loginForm);

    this.appService.login(this.loginForm.value.email, this.loginForm.value.password).then(response =>
      console.log(response)
    ).catch(err => {
      console.log(err);
      if (err.status === 403 || 400) {
        this.errorMessage = err.error.message;
      }
    });
  }

  isValidEmail() {
    if (this.email) {
      const re = /\S+@\S+\.\S+/;
      const isValid = re.test(this.email.toString().toLowerCase());
      console.log(isValid ? 'isvalid' : 'invalid');
      return isValid;
    }
  }
}
