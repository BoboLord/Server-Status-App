import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { HttpService } from './http.service';
import { Server } from '../models/server';
import { StoredServerStatus } from '../models/stored-server-status';
import { Cluster } from '../models/cluster';

@Injectable()
export class AppService {
//  baseURL = 'http://35.200.180.139:5000';
baseURL = 'http://localhost:5000';

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

  getCustomStoredServerStatus(serverHost): Promise<HttpResponse<StoredServerStatus[]>> {
    return this.httpClient.get<StoredServerStatus[]>(
      this.baseURL + '/serverstatus/' +
      serverHost,
      { observe: 'response' }
    ).toPromise();
  }

  getServerStatus(url, port): Promise<HttpResponse<boolean>> {
    return this.httpClient.post<boolean>(
      this.baseURL + '/pingserver', {'url': url, 'port': port},
      { observe: 'response' }
    ).toPromise();
  }

  getStoredServerStatus(serverID): Promise<HttpResponse<StoredServerStatus[]>> {
    return this.httpClient.get<StoredServerStatus[]>(
      this.baseURL + '/storedserverstatus/' +
      serverID,
      { observe: 'response' }
    ).toPromise();
  }

  getStoredServerListStatus(serverList): Promise<HttpResponse<StoredServerStatus[]>> {
    return this.httpClient.post<StoredServerStatus[]>(
      this.baseURL + '/serverliststatus',
      serverList,
      { observe: 'response' }
    ).toPromise();
  }

}
