import {Component} from 'angular2/core';
import {AppMenu} from './../menu/menu';
import {GMapsProvider} from './../../providers/gmaps/gmaps.provider';
import {VehicleDataProvider} from './../../providers/vehicledata/vehicledata.provider';
const _ = require('lodash');
const shortid = require('shortid');

@Component({
  selector: 'map',
  providers: [],
  directives: [AppMenu],
  pipes: [],
  styles: [ require('./map.scss') ],
  template: require('./map.html')
})
export class Map {
  lineRefs: Array<Object>;

  constructor(private gmapsProvider: GMapsProvider,
              private vehicleDataProvider: VehicleDataProvider) {

  }

  ngOnInit() {
      this.gmapsProvider.initGMap();
      
      this.vehicleDataProvider.getAvailableLines()
        .subscribe(data => this.lineRefs = this.processLineRefs(data), err => console.log(err));

      this.vehicleDataProvider.initPollingData()
        .subscribe(data => this.addMarkers(data), err => { console.log(err)});
  }

  processLineRefs(data) {
    return _.chain(data)
        .map((val) => {
            return val.monitoredVehicleJourney;
        })
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

  addMarkers(data) {
      _.forEach(data, (vehicle) => {
          let journeyObj = vehicle.monitoredVehicleJourney;

          this.gmapsProvider.addMarker({
              id: shortid.generate(),
              lat: journeyObj.vehicleLocation.latitude,
              lng: journeyObj.vehicleLocation.longitude,
              title: journeyObj.lineRef,
              lineRef: journeyObj.lineRef,
              vehicleRef: journeyObj.vehicleRef,
              delay: journeyObj.delay
          });
      });
  }
}
