import { Component, OnInit } from '@angular/core';
import { Cluster } from './models/cluster';
import { Server } from './models/server';
import { AppService } from './services/app.service';
import { ServerStatus } from './models/server-status';

// import { clearInterval } from 'timers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {}
}
