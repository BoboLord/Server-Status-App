import { RouterModule, Routes } from '@angular/router';

import { ServerStatusComponent } from '../components/server-status-app/server-status.component';
import { SangamComponent } from '../components/sangam-3.0/sangam-3.0.component';

export const appRoutes: Routes = [
  { path: 'app-server-status', component: ServerStatusComponent },
  { path: 'sangam-3.0', component: SangamComponent },
  { path: '**', component: ServerStatusComponent }
];
