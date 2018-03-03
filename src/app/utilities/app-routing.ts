import { RouterModule, Routes } from '@angular/router';

import { StoredServerStatusComponent } from '../components/server-status-app/server-status.component';
import { PingToolComponent } from '../components/ping-tool/ping-tool.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { RegistrationComponent } from '../components/registration/registration.component';

export const appRoutes: Routes = [
  { path: '', component: StoredServerStatusComponent },
  { path: 'ping-tool', component: PingToolComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', component: PageNotFoundComponent }
];
