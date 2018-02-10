import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { HttpService } from './http.service';
import { Server } from '../models/server';
import { ServerStatus } from '../models/server-status';
import { Cluster } from '../models/cluster';

@Injectable()
export class AppService {
  baseURL = 'http://35.200.180.139:5000/api';

  constructor(private httpClient: HttpClient) { }

  getListOfClusters(): Promise<HttpResponse<Cluster[]>> {
    return this.httpClient.get<Cluster[]>(
      this.baseURL + '/clusterlist',
      { observe: 'response' }
    ).toPromise();
  }

  getListOfServers(): Promise<HttpResponse<Server[]>> {
    return this.httpClient.get<Server[]>(
      this.baseURL + '/serverlist',
      { observe: 'response' }
    ).toPromise();
  }

  getCustomServerStatus(serverHost): Promise<HttpResponse<ServerStatus[]>> {
    return this.httpClient.get<ServerStatus[]>(
      this.baseURL + '/serverstatus/' +
      serverHost,
      { observe: 'response' }
    ).toPromise();
  }
  getServerStatus(serverID): Promise<HttpResponse<ServerStatus[]>> {
    return this.httpClient.get<ServerStatus[]>(
      this.baseURL + '/serverstatus/' +
      serverID,
      { observe: 'response' }
    ).toPromise();
  }

  getServerListStatus(serverList): Promise<HttpResponse<ServerStatus[]>> {
    return this.httpClient.post<ServerStatus[]>(
      this.baseURL + '/serverliststatus',
      serverList,
      { observe: 'response' }
    ).toPromise();
  }

}
