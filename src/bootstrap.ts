import {enableProdMode, provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
// All directives provided by the platform 
import {PLATFORM_DIRECTIVES} from '@angular/core';
// Router directives
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {FORM_PROVIDERS, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  return bootstrap(App, [
    // These are dependencies of our App
    ...ROUTER_PROVIDERS,
    ...FORM_PROVIDERS,
    ...HTTP_PROVIDERS,
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: [...ROUTER_DIRECTIVES] },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ])
  .catch(err => console.error(err));
});
