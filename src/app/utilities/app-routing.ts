import { RouterModule, Routes } from '@angular/router';

import { ServerStatusComponent } from '../components/server-status-app/server-status.component';

export const appRoutes: Routes = [
  { path: 'server-status', component: ServerStatusComponent },
  { path: '**', component: ServerStatusComponent }
];
