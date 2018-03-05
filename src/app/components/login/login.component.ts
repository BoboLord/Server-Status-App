import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() { }
  submit() {
    this.appService.login(this.username, this.password).then(response =>
      console.log(response)
    ).catch(err => {
      console.log(err);
      if (err.status === 403) {
        this.errorMessage = err.error.message;
      }
    });
  }
}
