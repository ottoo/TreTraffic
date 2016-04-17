import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs';

@Injectable()
export class VehicleDataProvider {
    private BACKEND_URL: string = 'http://ottokivikarki.co:3333/api/lines';
    private MOCKDATA_URL: string = 'http://127.0.0.1:3333/mocks';

    constructor(private http: Http) {
        this.http = http;
        console.log('Init Vehicle data provider');
    }

    callBackend(searchPattern?: string) {
        let url = null;
        url = searchPattern ? this.BACKEND_URL + '?filter=' + searchPattern : this.BACKEND_URL;
        return this.http.get(url);
    }

    getAvailableLines() {
        return this.callBackend()
            .map((res: Response) => res.json())
            .pluck('body');
    }

    initPollingData() {
        return Observable.interval(3000)
            .switchMap(() => this.callBackend())
            .map((res: Response) => res.json())
            .pluck('body');
    }

    getMockData(): Observable<any> {
        return this.http.get(this.MOCKDATA_URL)
            .map((res: Response) => res.json())
            .switchMap(res => res.body)
            .pluck('monitoredVehicleJourney')
            .toArray();
    }
}
