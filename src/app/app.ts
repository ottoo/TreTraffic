import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {AppMenu} from './components/menu/menu';
import {Map} from './components/map/map';
import {GMapsProvider} from './providers/gmaps/gmaps.provider';
import {LocalStorageProvider} from './providers/localstorage/localstorage.provider';
import {VehicleDataProvider} from './providers/vehicledata/vehicledata.provider';

import {AppFooter} from './components/footer/footer';

import '../style/app.scss';

const _ = require('lodash');

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [GMapsProvider, LocalStorageProvider, VehicleDataProvider],
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
  lineRefs: Array<Object> = [];

  constructor(private vehicleDataProvider: VehicleDataProvider) {
    this.vehicleDataProvider.getAvailableLines()
      .subscribe(data => this.lineRefs = this.processLineRefs(data), err => console.log(err));
  }

  processLineRefs(data) {
    return _.chain(data)
      .map((val) => {
        return +val.lineRef;
      })
      .uniq()
      .sortBy()
      .map((val) => {
        return {
          lineRef: val,
          isDisabled: false
        };
      })
      .value();
  }
}
