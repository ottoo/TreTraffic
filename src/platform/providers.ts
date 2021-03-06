import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './../app/app.routes';

export const APPLICATION_PROVIDERS = [
    disableDeprecatedForms(),
    provideForms(),
    provideRouter(routes),
    ...HTTP_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const PROVIDERS = [
    ...APPLICATION_PROVIDERS
];
