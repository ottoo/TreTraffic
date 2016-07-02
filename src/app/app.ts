import { Component, OnInit } from '@angular/core';
import { AppMenu } from './components/menu/menu';
import { GMapsProvider } from './providers/gmaps/gmaps.provider';
import { VehicleDataProvider } from './providers/vehicledata/vehicledata.provider';
import { AppFooter } from './components/footer/footer';
import { Observable } from 'rxjs';

import '../style/app.scss';

@Component({
    selector: 'app',
    providers: [GMapsProvider, VehicleDataProvider],
    directives: [AppMenu, AppFooter],
    pipes: [],
    styles: [require('./app.scss')],
    templateUrl: './app.html'
})
export class App implements OnInit {
    name = 'TreTraffic';
    lineRefs$: Observable<Array<Object>>;

    constructor(private vehicleDataProvider: VehicleDataProvider) {

    }

    ngOnInit() {
        this.lineRefs$ = this.vehicleDataProvider.lineRefs$;
        this.vehicleDataProvider.getAvailableLines();
    }
}
