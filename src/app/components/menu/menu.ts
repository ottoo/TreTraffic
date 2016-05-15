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
