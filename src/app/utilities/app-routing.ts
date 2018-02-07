import { RouterModule, Routes } from '@angular/router';

import { ServerStatusComponent } from '../components/server-status-app/server-status.component';
import { PingToolComponent } from '../components/ping-tool/ping-tool.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '', component: ServerStatusComponent },
  { path: 'ping-tool', component: PingToolComponent },
  { path: '**', component: PageNotFoundComponent }
];
