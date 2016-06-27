import { PLATFORM_DIRECTIVES } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

export const APPLICATION_DIRECTIVES = [
    ...CORE_DIRECTIVES,
    ...ROUTER_DIRECTIVES,
    ...REACTIVE_FORM_DIRECTIVES
];

export const DIRECTIVES = [
    {
        provide: PLATFORM_DIRECTIVES,
        multi: true,
        useValue: APPLICATION_DIRECTIVES
    }
];
