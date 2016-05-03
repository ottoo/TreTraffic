import {Component} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

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
  providers: [GMapsProvider, VehicleDataProvider],
  directives: [AppFooter],
  pipes: [],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
@RouteConfig([
    { path: '/', component: Map, name: 'Index', useAsDefault: true },
    { path: '/**', redirectTo: ['Index'] }
])
export class App {
  name = 'TreTraffic';

  constructor() {

  }
}
