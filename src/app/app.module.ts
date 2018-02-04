import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppService } from './services/app.service';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http/src/http_module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [HttpClient, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
