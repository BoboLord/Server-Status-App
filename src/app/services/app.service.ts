import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { HttpService } from './http.service';
import { Server } from '../models/server';
import { Cluster } from '../models/cluster';

@Injectable()
export class AppService {
    baseURL = 'http://localhost:3000/api';

    constructor(private httpClient: HttpClient) {}

    // getListOfClusters() {
    //     // return this.httpService.request('/clusterlist');
    //     return this.httpClient.get(this.baseURL + '/clusterlist')
    //     .map((res: Response) => res.json());
    // }


    getListOfClusters(): Promise<HttpResponse<Cluster[]>> {
    return this.httpClient.get<Cluster[]>(
      this.baseURL + '/clusterlist',
      { observe: 'response' }
      ).toPromise();
    }


    // getListOfServers(); {
    //     return this.http.get<Server[]>(this.baseURL + 'serverlist');
    // }

    // pingSingleWebsite(id: number); {
    //     return this.http.get<boolean>(this.baseURL + 'pingsinglewebsite/' + id);
    // }
}
