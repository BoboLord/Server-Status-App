import {Injectable, Inject} from '@angular/core';
import {Http, Response, RequestOptions, Request, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {
    baseURL = 'http://localhost:3000/api';
    constructor(private http: Http) {}

    getHeader = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return headers;
    }

    request = (req) => {
        const baseUrl = this.baseURL,
            requestOptions = new RequestOptions({
            method: req.method,
            url: baseUrl + req.url,
            headers: req.header ? req.header : this.getHeader(),
            body: JSON.stringify(req.params)
        });

        return this.http.request(new Request(requestOptions))
                        .map((res: Response) => res.json());
    }
}
