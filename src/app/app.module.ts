import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppService } from './services/app.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServerStatusComponent } from './components/server-status-app/server-status.component';
import { PingToolComponent } from './components/ping-tool/ping-tool.component';
import { HttpModule } from '@angular/http/src/http_module';

import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';

import { appRoutes } from './utilities/app-routing';
@NgModule({
  declarations: [AppComponent, NavbarComponent, ServerStatusComponent, PingToolComponent, PageNotFoundComponent],
  imports: [BrowserModule, HttpClientModule, InlineSVGModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, onSameUrlNavigation: 'reload'} // <-- debugging purposes only
    )
  ],
  providers: [HttpClient, AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
