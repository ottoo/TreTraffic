import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {GMapsProvider} from './../../providers/gmaps/gmaps.provider';
const _ = require('lodash');

@Component({
  selector: 'app-menu',
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: [],
  styles: [ require('./menu.scss') ],
  template: require('./menu.html')
})
export class AppMenu {
  @Input() lineRefs: Array<Object>;

  constructor(private gmapsProvider: GMapsProvider) {

  }

  ngOnInit() {
    $(".button-collapse").sideNav();
  }

  /**
   * Toggles all the lines visibilities at once
   * @param {Array<Object>} lineRefs
   * @param {Boolean}       isDisabled
   */
  toggleAllLinesVisibility(lineRefs: Array<Object>, isDisabled: Boolean) {
    _.forEach(this.lineRefs, (line) => {
      if (line.isDisabled == isDisabled) {
        line.isDisabled = !line.isDisabled;
        this.gmapsProvider.toggleMarkerVisibility(line.lineRef);
      }
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

    this.gmapsProvider.toggleMarkerVisibility(lineRef);
  }

}
