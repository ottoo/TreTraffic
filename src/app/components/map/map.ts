import {Component} from 'angular2/core';
import {GMapsProvider} from './../../providers/gmaps/gmaps.provider';
import {VehicleDataProvider} from './../../providers/vehicledata/vehicledata.provider';
import {AppMenu} from './../menu/menu';
const _ = require('lodash');
const shortid = require('shortid');

@Component({
  selector: 'map',
  providers: [GMapsProvider, VehicleDataProvider],
  directives: [AppMenu],
  pipes: [],
  styles: [ require('./map.scss') ],
  template: require('./map.html')
})
export class Map {

  constructor(private gmapsProvider: GMapsProvider,
              private vehicleDataProvider: VehicleDataProvider) {

  }

  ngOnInit() {
      this.gmapsProvider.initGMap();
      this.vehicleDataProvider.getAvailableLines();      
      this.vehicleDataProvider.initPollingData().subscribe((vehicleData) => {

          _.forEach(vehicleData, (vehicle) => {
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

      }, error => { console.log(error)});
  }

  markerSelected(lineRef: number) {
    this.gmapsProvider.toggleMarkerVisibility(lineRef);
  }

}
