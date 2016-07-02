import {
    it,
    inject,
    beforeEachProviders
} from '@angular/core/testing';

import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { provide } from '@angular/core';

import { GMapsProvider } from './providers/gmaps/gmaps.provider';
import { VehicleDataProvider } from './providers/vehicledata/vehicledata.provider';
import { App } from './app';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    BaseRequestOptions,
    GMapsProvider,
    VehicleDataProvider,
    MockBackend,
    // Provide a mocked (fake) backend for Http
    provide(Http, {
      useFactory: function useFactory(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  it('should have a name', inject([App], (app: App) => {
    expect(app.name).toEqual('TreTraffic');
  }));

});
