import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {Map} from './components/map/map';
import {GMapsProvider} from './providers/gmaps/gmaps.provider';
import {VehicleDataProvider} from './providers/vehicledata/vehicledata.provider';

import {AppFooter} from './components/footer/footer';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app', // <app></app>
  providers: [...FORM_PROVIDERS, GMapsProvider, VehicleDataProvider],
  directives: [...ROUTER_DIRECTIVES, AppFooter],
  pipes: [],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
@RouteConfig([
    { path: '/', component: Map, name: 'Index' },
    { path: '/**', redirectTo: ['Index'] }
])
export class App {
  name = 'TreTraffic';

  constructor() {

  }
}
