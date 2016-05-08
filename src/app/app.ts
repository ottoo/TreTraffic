import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {AppMenu} from './components/menu/menu';
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
  directives: [AppMenu, AppFooter],
  pipes: [],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
@RouteConfig([
    { path: '/', component: Map, name: 'Index', useAsDefault: true }
])
export class App {
  name = 'TreTraffic';

  constructor() {

  }
}
