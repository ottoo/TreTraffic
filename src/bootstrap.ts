import { bootstrap } from '@angular/platform-browser-dynamic';
import { DIRECTIVES } from './platform/directives';
import { PROVIDERS } from './platform/providers';
import { ENV_PROVIDERS } from './platform/environment';

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
    ...DIRECTIVES,
    ...PROVIDERS,
    ...ENV_PROVIDERS,
  ])
    .catch(err => console.error(err));
});
