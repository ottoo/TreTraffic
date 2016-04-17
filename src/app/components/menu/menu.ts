import {Component, EventEmitter, Output} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {VehicleDataProvider} from './../../providers/vehicledata/vehicledata.provider';
const _ = require('lodash');

@Component({
  selector: 'app-menu',
  providers: [VehicleDataProvider],
  directives: [CORE_DIRECTIVES],
  pipes: [],
  styles: [ require('./menu.scss') ],
  template: require('./menu.html')
})
export class AppMenu {
  @Output() private onMarkerSelected: EventEmitter<number>;
  private lineRefs: Array<number>;


  constructor(private vehicleDataProvider: VehicleDataProvider) {
    this.onMarkerSelected = new EventEmitter();
  }

  /**
   * Called on after angular has created bindings
   * Creates the line refs for the menu bar
   */
  ngOnInit() {
    this.vehicleDataProvider.getAvailableLines().subscribe((data) => {
      this.lineRefs = _.chain(data)
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
    });
  }
  
  /**
   * Toggles the marker visibility
   * @param {number} lineRef bus line number
   */
  toggleMarkerVisibility(lineRef: number) {
    let foundLineRef = _.find(this.lineRefs, (val) => {
      return val.lineRef === lineRef;
    });

    foundLineRef.isDisabled = !foundLineRef.isDisabled;

    this.onMarkerSelected.emit(lineRef);
  }

}
