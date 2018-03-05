import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() { }
  submit() {
    this.appService.login(this.email, this.password).then(response =>
      console.log(response)
    ).catch(err => {
      console.log(err);
      if (err.status === 403) {
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
