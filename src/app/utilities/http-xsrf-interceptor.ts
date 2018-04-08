import { Injectable, Injector } from '@angular/core';
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

import { ConfigService } from './../services/config.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(private injector: Injector,
    private configService: ConfigService, private _cookieService: CookieService, private http: HttpClient) { }

  getToken(): Observable<HttpResponse<String>> {
    const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

    return this.http.get<HttpResponse<String>>(
      this.configService.baseURL + '/gettoken',
      { headers }
    );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ withCredentials: true });
    const headerName = 'X-CSRF-TOKEN';
    if (request.url !== this.configService.baseURL + '/gettoken' && !this._cookieService.get('XSRF-TOKEN')) {
      return this.getToken().pipe(switchMap(() => {
        const http11: HttpClient = this.injector.get(HttpClient);
        let clone: HttpRequest<any> = request.clone();
        if (this._cookieService.get('XSRF-TOKEN')) {
          console.log(this._cookieService.get('XSRF-TOKEN'));
          const token = this._cookieService.get('XSRF-TOKEN');
          this.configService.csrfToken = token;
          clone = clone.clone({ headers: request.headers.set(headerName, token) });
        }
        return next.handle(clone);
      }));
    } else {
      if (this._cookieService.get('XSRF-TOKEN')) {
        console.log(this._cookieService.get('XSRF-TOKEN'));
        const token = this._cookieService.get('XSRF-TOKEN');
        this.configService.csrfToken = token;
        request = request.clone({ headers: request.headers.set(headerName, token) });
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
    // }
  }
}
