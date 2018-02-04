import { Component, OnInit } from '@angular/core';
import { Cluster } from './models/cluster';
import { Server } from './models/server';
import { AppService } from './services/app.service';
import { ServerStatus } from './models/server-status';

// import { clearInterval } from 'timers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  clusters: Cluster[];
  servers: Server[];
  sortedServers = [];
  serverIDArray: ServerStatus[];
  interval1Cleared = false;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getListOfClusters().then(response => {this.clusters = response.body; });
    this.appService.getListOfServers().then(response => {this.servers = response.body; });
    const self = this;
    self.serverIDArray = [];
    const interval1 = setInterval(function() {
      if (self.servers && self.clusters) {
        self.sortedServers = self.clusters;
        for (const server of self.servers) {
          for (const sortedServer of self.sortedServers) {
            if (server.clusterID === sortedServer.clusterID) {
              if (!sortedServer.servers) {
                sortedServer['servers'] = [];
              }
              sortedServer.servers.push(server);
              self.serverIDArray.push({'id' : server.id, 'status' : false});
              break;
            }
          }
        }
        console.log(self.sortedServers);
        self.interval1Cleared = true;
        clearInterval(interval1);
      }
    }, 50);
    const interval2 = setInterval(function() {
      if (self.interval1Cleared) {
        const serverArray  = [];
        for (const serverID of self.serverIDArray) {
          serverArray.push(serverID.id);
        }
        self.appService.getServerListStatus(serverArray).then(response => {self.serverIDArray = response.body; });
        clearInterval(interval2);
      }
    }, 50);
  }
}
