import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
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
  @Output() private onMarkerSelected: EventEmitter<number>;

  constructor() {
    this.onMarkerSelected = new EventEmitter();
  }

  ngOnInit() {

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
