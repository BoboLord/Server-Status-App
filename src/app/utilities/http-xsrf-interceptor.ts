import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import {
  HttpClient, HttpXsrfTokenExtractor, HttpRequest, HttpResponse,
  HttpHandler, HttpInterceptor, HttpEvent
} from '@angular/common/http';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-XSRF-TOKEN';
    const token = this.tokenExtractor.getToken() as string;
    // req = req.clone({
    //   withCredentials: true
    // });

    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req);
  }
}
