import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor,
  HttpHandler, HttpErrorResponse, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { CookieService } from 'ngx-cookie';


@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(private _cookieService: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ withCredentials: true });
    const headerName = 'X-CSRF-TOKEN';
    const token = this._cookieService.get('XSRF-TOKEN');
    if (token !== null && !request.headers.has(headerName)) {
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
}
