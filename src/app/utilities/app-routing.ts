import { RouterModule, Routes } from '@angular/router';

import { ServerStatusComponent } from '../components/server-status-app/server-status.component';
import { PingToolComponent } from '../components/ping-tool/ping-tool.component';

export const appRoutes: Routes = [
  { path: 'server-status', component: ServerStatusComponent },
  { path: 'ping-tool', component: PingToolComponent },
  { path: '**', component: ServerStatusComponent }
];
