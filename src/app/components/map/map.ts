import { Component, OnInit } from '@angular/core';
import { GMapsProvider } from './../../providers/gmaps/gmaps.provider';
import { VehicleDataProvider } from './../../providers/vehicledata/vehicledata.provider';
const _ = require('lodash');
const shortId = require('shortid');

@Component({
  selector: 'map',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./map.scss')],
  template: require('./map.html')
})
export class Map implements OnInit {
  lineRefs: Array<Object>;

  constructor(private gmapsProvider: GMapsProvider,
    private vehicleDataProvider: VehicleDataProvider) {

  }

  ngOnInit() {
    this.gmapsProvider.initGMap();

    this.vehicleDataProvider.pollVehicleData()
      .subscribe((data) => this.addMarkers(data), err => { console.error(err); });
  }

  private addMarkers(data) {
    if (!data) {
      return;
    }

    _.forEach(data, (vehicle) => {
      let journeyObj = vehicle;

      this.gmapsProvider.addMarker({
        id: shortId.generate(),
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
