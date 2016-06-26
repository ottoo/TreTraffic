import { provideRouter, RouterConfig } from '@angular/router';

import { Map } from './components/map/map';

export const routes: RouterConfig = [
  { path: '', component: Map }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
