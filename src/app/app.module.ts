import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from './services/app.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoredServerStatusComponent } from './components/server-status-app/server-status.component';
import { PingToolComponent } from './components/ping-tool/ping-tool.component';
import { HttpModule } from '@angular/http/src/http_module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';

import { appRoutes } from './utilities/app-routing';
@NgModule({
  declarations: [AppComponent, NavbarComponent, StoredServerStatusComponent, PingToolComponent, PageNotFoundComponent],
  imports: [BrowserModule, HttpClientModule, InlineSVGModule, FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, onSameUrlNavigation: 'reload' } // <-- debugging purposes only
    ),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HttpClient, AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
