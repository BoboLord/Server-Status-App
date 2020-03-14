import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpClient, HttpHeaders,
  HttpHandler, HttpErrorResponse, HttpRequest, HttpResponse
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { AppService } from '../services/app.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

import { ConfigService } from './../services/config.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  headerName = 'X-CSRF-TOKEN';

  constructor(private injector: Injector,
    private configService: ConfigService, private _cookieService: CookieService, private http: HttpClient) { }

  getToken(): Observable<HttpResponse<String>> {
    return this.http.get<HttpResponse<String>>(
      this.configService.baseURL + '/gettoken',
      {}
    );
  }

  addHeaders(request: HttpRequest<any>) {
    request = request.clone({ withCredentials: true });
    if (this._cookieService.get('XSRF-TOKEN')) {
      const token = this._cookieService.get('XSRF-TOKEN');
      this.configService.csrfToken = token;
      request = request.clone({ headers: request.headers.set(this.headerName, token) });
    }
    return request;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== this.configService.baseURL + '/gettoken' && !this._cookieService.get('XSRF-TOKEN')) {
      return this.getToken().pipe(switchMap(() => {
        const clone = this.addHeaders(request);
        return next.handle(clone);
      }));
    } else {
      const clone = this.addHeaders(request);
      return next.handle(clone).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            // authService.logout();
          }
        }
      }));
    }
  }
}
