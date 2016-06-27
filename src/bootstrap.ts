import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { DIRECTIVES } from './platform/directives';

import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { disableDeprecatedForms, provideForms, REACTIVE_FORM_DIRECTIVES }
from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app/app.routes.ts';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

const ENV_PROVIDERS = [];

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import { App } from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  return bootstrap(App, [
    // These are dependencies of our App
    disableDeprecatedForms(),
    provideForms(),
    ...DIRECTIVES,
    ...APP_ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ENV_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ])
    .catch(err => console.error(err));
});
