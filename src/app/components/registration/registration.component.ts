import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() { }

  submit() {
    this.appService.register(this.email, this.password).then(response =>
      console.log(response)
    ).catch(err => {
      console.log(err);
      if (err.status === 403) {
        this.errorMessage = err.error.message;
      }
    });
  }

}
