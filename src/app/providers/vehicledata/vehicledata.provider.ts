import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class VehicleDataProvider {
  private BACKEND_URL: string = 'http://localhost:3333/api/lines';
  private MOCKDATA_URL: string = 'http://127.0.0.1:3333/mocks';

  constructor(private http: Http) {

  }

  getAvailableLines() {
    return this.callBackend()
      .retryWhen(function(errors) {
        return errors.delay(200);
      })
      .map(this.mapResponse)
      .catch(this.handleError);
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
    return this.http.get(this.MOCKDATA_URL)
      .map((res: Response) => res.json())
      .switchMap(res => res.body)
      .pluck('monitoredVehicleJourney')
      .toArray()
      .catch(this.handleError);
  }

  private callBackend(searchPattern?: string) {
    let url = null;
    url = searchPattern ? this.BACKEND_URL + '?filter=' + searchPattern : this.BACKEND_URL;
    return this.http.get(url);
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
