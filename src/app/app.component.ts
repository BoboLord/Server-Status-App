import { Component, OnInit } from '@angular/core';
import { Cluster } from './models/cluster';
import { Server } from './models/server';
import {AppService} from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  clusters: Cluster[];
  servers: Server[];
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getListOfClusters().then(response => {this.clusters = response.body; console.log(this.clusters); });

    // this.servers = this.appService.getListOfServers();

  }
}
