import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { BACKEND_URL, MOCKDATA_URL } from './../../config/config';
import * as _ from 'lodash';

@Injectable()
export class VehicleDataProvider {
    private _lineRefs$: Subject<Array<Object>>;
    /* Private data held in memory here */
    private vehicleData = {
        lineRefs: []
    };

    constructor(private http: Http) {
        this._lineRefs$ = <Subject<Array<Object>>>new Subject();
    }

    get lineRefs$() {
        return this._lineRefs$.asObservable();
    }

    getAvailableLines() {
        return this.callBackend()
            .retryWhen(function(errors) {
                return errors.delay(200);
            })
            .map(this.mapResponse)
            .subscribe(data => {
                this.vehicleData.lineRefs = data;
                this._lineRefs$.next(this.vehicleData.lineRefs);
            }, error => {
                console.log('Could not load bus lines.');
            });
    }

    pollVehicleData() {
        return Observable.interval(3000)
            .retryWhen(function(errors) {
                return errors.delay(200);
            })
            .switchMap(() => this.callBackend())
            .map(this.mapResponse)
            .catch(this.handleError);
    }

    getMockData(): Observable<any> {
        return this.http.get(MOCKDATA_URL)
            .map((res: Response) => res.json())
            .switchMap(res => res.body)
            .pluck('monitoredVehicleJourney')
            .toArray()
            .catch(this.handleError);
    }

    private callBackend(searchPattern?: string) {
        let url = null;
        url = searchPattern ? BACKEND_URL + '?filter=' + searchPattern : BACKEND_URL;
        return this.http.get(url);
    }

    private processLineRefs(data) {
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

    private mapResponse(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let json = res.json();
        return json || {};
    }

    private handleError(err: any) {
        let error = err.message || 'Server error';
        console.error(error);
        return Observable.throw(error);
    }
}
