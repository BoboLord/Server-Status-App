import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { StoredServerStatusComponent } from '../components/server-status-app/server-status.component';
import { PingToolComponent } from '../components/ping-tool/ping-tool.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { MovieStatusComponent } from '../components/movie-status/movie-status.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'serverstatus', component: StoredServerStatusComponent },
  { path: 'moviestatus', component: MovieStatusComponent },
  { path: 'pingtool', component: PingToolComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', component: PageNotFoundComponent }
];
