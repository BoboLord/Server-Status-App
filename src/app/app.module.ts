import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http/src/http_module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppService } from './services/app.service';
import { ConfigService } from './services/config.service';
import { HttpXsrfInterceptor } from './utilities/http-xsrf-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StoredServerStatusComponent } from './components/server-status-app/server-status.component';
import { PingToolComponent } from './components/ping-tool/ping-tool.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


import { appRoutes } from './utilities/app-routing';
import { ValidationTool } from './utilities/validation-tool';
import { MovieStatusComponent } from './components/movie-status/movie-status.component';
import { LoaderComponent } from './components/utility-components/loader/loader.component';

@NgModule({
  declarations: [AppComponent, MovieStatusComponent, HomeComponent, NavbarComponent, StoredServerStatusComponent, LoaderComponent,
    PingToolComponent, LoginComponent,
    ForgotPasswordComponent, RegistrationComponent, PageNotFoundComponent],
  imports: [BrowserModule, HttpClientModule, InlineSVGModule, ReactiveFormsModule, FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, onSameUrlNavigation: 'reload' } // <-- debugging purposes only
    ),
    CookieModule.forRoot(),
    HttpClientXsrfModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HttpClient, AppService, ConfigService, ValidationTool,
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
