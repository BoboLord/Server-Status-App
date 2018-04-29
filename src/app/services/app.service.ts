import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { HttpService } from './http.service';
import { ConfigService } from './../services/config.service';
import { Server } from '../models/server';
import { StoredServerStatus } from '../models/stored-server-status';
import { Cluster } from '../models/cluster';
import { MovieStatus } from '../models/movie-status';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

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
  getListOfClusters(): Observable<HttpResponse<Cluster[]>> {
    return this.httpClient.get<Cluster[]>(
      this.configService.baseURL + '/ping/clusterlist',
      { observe: 'response' }
    ).catch((err: HttpErrorResponse) => {
      return Observable.throw(err.error);
    });
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

  getStoredServerStatus(serverID): Observable<HttpResponse<StoredServerStatus[]>> {
    return this.httpClient.get<StoredServerStatus[]>(
      this.configService.baseURL + '/ping/storedserverstatus/' +
      serverID,
      { observe: 'response' }
    );
  }

  getStoredServerListStatus(serverList): Promise<HttpResponse<StoredServerStatus[]>> {
    return this.httpClient.post<StoredServerStatus[]>(
      this.configService.baseURL + '/ping/serverliststatus',
      serverList,
      { observe: 'response' }
    ).toPromise();
  }

  checkMovieStatus(): Observable<MovieStatus> {
    return this.httpClient.get<MovieStatus>(
      this.configService.baseURL + '/getmoviestatus', {}
    ).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      return Observable.throw(err.error);
    });
  }
  getMovieList(): Observable<MovieStatus> {
    return this.httpClient.get<MovieStatus>(
      this.configService.baseURL + '/getmovielist', {}
    ).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      return Observable.throw(err.error);
    });
  }

  userLogin(email, password) {
    return this.httpClient.post<string>(
      this.configService.baseURL + '/user/login',
      { 'email': email, 'password': password },
      { observe: 'response' }
    ).toPromise().catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
    });
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
