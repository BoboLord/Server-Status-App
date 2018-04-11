import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../services/app.service';
import { ConfigService } from './../../services/config.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public configService: ConfigService, public appService: AppService, private router: Router) { }

  ngOnInit() {
    this.appService.tempPing();
  }

  logout() {
    this.appService.userLogout();
    this.router.navigate(['/login']);
  }
}
