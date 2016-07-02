import { enableProdMode } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';

const PROVIDERS = [];

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
    disableDebugTools();
    enableProdMode();
} else {

}

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
