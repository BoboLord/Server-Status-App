import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Cluster } from '../../models/cluster';
import { Server } from '../../models/server';
import { AppService } from '../../services/app.service';
import { ServerStatus } from '../../models/server-status';
import { resolve } from 'q';

// import { clearInterval } from 'timers';
@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.scss']
})
export class ServerStatusComponent implements OnInit {
  title = 'server-status-app';
  clusters: Cluster[];
  servers: Server[];
  sortedServers = [];
  serverIDArray: ServerStatus[];
  interval1Cleared = false;
  interval2Cleared = false;
  infoLoaded = false;
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.infoLoaded = false;
        this.appService.getListOfClusters().then(response1 => {
          this.clusters = response1.body;
          this.appService.getListOfServers().then(response2 => {
            this.servers = response2.body;
            this.getAllServerStats(this.servers);
          });
        });
      }
    });
    this.appService.getListOfClusters().then(response1 => {
      this.clusters = response1.body;
      this.appService.getListOfServers().then(response2 => {
        this.servers = response2.body;
        this.getAllServerStats(this.servers);
      });
    });
    const self = this;
  }
  getAllServerStats(serverList) {
    // console.log(window.onblur);
    this.infoLoaded = false;
    this.serverIDArray = [];
    for (const sortedServer of this.sortedServers) {
      sortedServer['servers'] = [];
    }
    if (this.servers && this.clusters) {
      this.sortedServers = this.clusters;
      for (const server of this.servers) {
        if (server.port) {
          server.url = 'http://' + server.host + ':' + server.port;
        } else {
          server.url = 'http://' + server.host;
        }
        for (const sortedServer of this.sortedServers) {
          if (server.clusterID === sortedServer.clusterID) {
            if (!sortedServer.servers) {
              sortedServer['servers'] = [];
            }
            sortedServer.servers.push(server);
            this.serverIDArray.push({ id: server.id, status: false });
            break;
          }
        }
      }
      this.interval1Cleared = true;
    }
    const serverArray = [];
    for (const serverID of this.serverIDArray) {
      serverArray.push(serverID.id);
    }
    this.appService.getServerListStatus(serverArray).then(response1 => {
      this.serverIDArray = response1.body;
      this.interval2Cleared = true;
      for (const cluster of this.sortedServers) {
        if (cluster.servers) {
          for (const server of cluster.servers) {
            for (const serverID of this.serverIDArray) {
              if (server.id === serverID.id) {
                server.status = serverID.status;
              }
            }
          }
        }
      }
      this.infoLoaded = true;
    });

  }
}
