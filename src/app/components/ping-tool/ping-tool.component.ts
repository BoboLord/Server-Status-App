import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Cluster } from '../../models/cluster';
import { Server } from '../../models/server';
import { AppService } from '../../services/app.service';
import { ServerStatus } from '../../models/server-status';

@Component({
  selector: 'app-ping-tool',
  templateUrl: './ping-tool.component.html',
  styleUrls: ['./ping-tool.component.scss']
})
export class PingToolComponent implements OnInit {
  title = 'server-status-app';
  url: string;
  urlError: string;
  port: string;
  portError: string;
  status: boolean;
  serverStatusArray: ServerStatus[];
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.url = '139.59.65.157';
    this.port = '80';
    this.status = false;
  }

  pingServer() {
    this.appService.getServerStatus(this.url, this.port)
      .then(response => {
        if (!this.serverStatusArray) {
          this.serverStatusArray = [];
        }
        const currentDate = new Date();
        const hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours().toString() : currentDate.getHours().toString();
        const minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes().toString() : currentDate.getMinutes().toString();
        const seconds = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds().toString() : currentDate.getSeconds().toString();
        this.serverStatusArray.push({
          'url': this.url, 'port': this.port, 'status': response.body,
          'time': hours + ':' + minutes + ':' + seconds
        });
      });
  }

  isValidUrl(url: string) {
    const inValid = /\s/;
    if (inValid.test(url)) {
      this.urlError = 'Please enter a valid URL';
    } else {
      this.urlError = null;
    }
    return !inValid.test(url);
  }

  isValidPort(port: string) {
    const inValid = /^\d+$/;
    if (inValid.test(port) || port === '') {
      this.portError = null;
    } else {
      this.portError = 'Please enter a valid port';
    }
    return inValid.test(port) || port === '';
  }
}
