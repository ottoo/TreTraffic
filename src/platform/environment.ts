import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';

const PROVIDERS = [];

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
    disableDebugTools();
    enableProdMode();
} else {
  PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
