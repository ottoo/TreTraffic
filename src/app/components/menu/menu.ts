import { Component, Input, OnInit } from '@angular/core';
import { GMapsProvider } from './../../providers/gmaps/gmaps.provider';
const _ = require('lodash');

@Component({
  selector: 'app-menu',
  providers: [],
  directives: [],
  pipes: [],
  styles: [ require('./menu.scss') ],
  template: require('./menu.html')
})
export class AppMenu implements OnInit {
  @Input() lineRefs: Array<Object>;

  constructor(private gmapsProvider: GMapsProvider) {

  }

  ngOnInit() {
    $('.button-collapse').sideNav();
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
