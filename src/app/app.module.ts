import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppService } from './services/app.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServerStatusComponent } from './components/server-status-app/server-status.component';
import { HttpModule } from '@angular/http/src/http_module';

import { RouterModule } from '@angular/router';
import { appRoutes } from './utilities/app-routing';
@NgModule({
  declarations: [AppComponent, NavbarComponent, ServerStatusComponent],
  imports: [BrowserModule, HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [HttpClient, AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
