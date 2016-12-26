import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions , URLSearchParams, Jsonp } from '@angular/http';

import { Api } from './API/api.class';
import { AirPollution } from './API/airpollution.api';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService
{
  private _listApi : Array<Api> = [];

  constructor(private _http: Http, private _jsonp: Jsonp)
  {
    //Air pollution
    let airpollution: AirPollution = new Api();
    airpollution.type = "Air";
    airpollution.server = "http://api.waqi.info/";
    airpollution.api = "feed/shanghai/?token=demo";
    airpollution.serverWithApiUrl = airpollution.server + airpollution.api;

    this._listApi.push(airpollution);
  }

  public getData(serverName: string): Observable<any>
  {
    let apiUrlToGet = "";
    for (let api of this._listApi) {
      if(api.server == serverName) {
        apiUrlToGet = api.serverWithApiUrl;
      }
    }
    console.log(serverName+" ==> "+apiUrlToGet);
    return this._http.get(apiUrlToGet).map(this.extractData).catch(this.handleError);
  }

  private extractData(response: Response)
  {
    let body = response.json();
    return body || {};
  }
  private handleError(error: any)
  {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
