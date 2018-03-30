import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpClient, HttpHeaders,
  HttpHandler, HttpErrorResponse, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { CookieService } from 'ngx-cookie';
import { AppService } from '../services/app.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(private _cookieService: CookieService, private http: HttpClient) { }

  getToken(): Promise<HttpResponse<String>> {
    const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

    return this.http.get<HttpResponse<String>>(
      'http://127.0.0.1:3000' + '/gettoken',
      { headers }
    ).toPromise();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ withCredentials: true });
    const headerName = 'X-CSRF-TOKEN';
    if (this._cookieService.get('XSRF-TOKEN')) {
      const token = this._cookieService.get('XSRF-TOKEN');
      if (token !== null && !request.headers.has(headerName)) {
        request = request.clone({ headers: request.headers.set(headerName, token) });
      } else {
        console.log('gg');
      }
    } else {
      if (request.headers.has(InterceptorSkipHeader)) {
        console.log('awd');
        const headers = request.headers.delete(InterceptorSkipHeader);
        return next.handle(request);
      }
      this.getToken();

    }
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          // authService.logout();
        }
      }
    });
  }
}
