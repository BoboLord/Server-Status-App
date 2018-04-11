import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { HttpService } from './http.service';
import { ConfigService } from './../services/config.service';
import { Server } from '../models/server';
import { StoredServerStatus } from '../models/stored-server-status';
import { Cluster } from '../models/cluster';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService, private httpClient: HttpClient) { }

  tempPing(): Promise<HttpResponse<String>> {
    return this.httpClient.get<String>(
      this.configService.baseURL + '/ping/abc',
      { observe: 'response' }
    ).toPromise();
  }

  getToken(): Promise<HttpResponse<String>> {
    return this.httpClient.get<String>(
      this.configService.baseURL + '/gettoken',
      { observe: 'response' }
    ).toPromise();
  }
  getListOfClusters(): Promise<HttpResponse<Cluster[]>> {
    return this.httpClient.get<Cluster[]>(
      this.configService.baseURL + '/ping/clusterlist',
      { observe: 'response' }
    ).toPromise();
  }

  getListOfServers(): Promise<HttpResponse<Server[]>> {
    return this.httpClient.get<Server[]>(
      this.configService.baseURL + '/ping/serverlist',
      { observe: 'response' }
    ).toPromise();
  }

  getCustomStoredServerStatus(serverHost): Promise<HttpResponse<StoredServerStatus[]>> {
    return this.httpClient.get<StoredServerStatus[]>(
      this.configService.baseURL + '/ping/serverstatus/' +
      serverHost,
      { observe: 'response' }
    ).toPromise();
  }

  getServerStatus(url, port): Promise<HttpResponse<boolean>> {
    return this.httpClient.post<boolean>(
      this.configService.baseURL + '/ping/pingserver', { 'url': url, 'port': port },
      { observe: 'response' }
    ).toPromise();
  }

  getStoredServerStatus(serverID): Promise<HttpResponse<StoredServerStatus[]>> {
    return this.httpClient.get<StoredServerStatus[]>(
      this.configService.baseURL + '/ping/storedserverstatus/' +
      serverID,
      { observe: 'response' }
    ).toPromise();
  }

  getStoredServerListStatus(serverList): Promise<HttpResponse<StoredServerStatus[]>> {
    return this.httpClient.post<StoredServerStatus[]>(
      this.configService.baseURL + '/ping/serverliststatus',
      serverList,
      { observe: 'response' }
    ).toPromise();
  }
  userLogin(email, password) {
    return this.httpClient.post<string>(
      this.configService.baseURL + '/user/login',
      { 'email': email, 'password': password },
      { observe: 'response' }
    ).toPromise();
  }
  userRegister(email, password) {
    return this.httpClient.post<string>(
      this.configService.baseURL + '/user/register',
      { 'email': email, 'password': password },
      { observe: 'response' }
    ).toPromise();
  }
  userLogout() {
    return this.httpClient.post<string>(
      this.configService.baseURL + '/user/logout',
      {},
      { observe: 'response' }
    ).toPromise();
  }
}
