import { MapTypeStyle } from 'angular2-google-maps/core';
//From angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//Form our project
import { Api } from './API/api.class';
import { AirPollution } from './API/airpollution.api';
import { ChimicalPollution } from './API/chimicalpollution.api';


@Injectable()
export class ApiService {
  private _listApi: Array<Api> = [];
  private _mapStyle: any = [];
  private _serverNameToGet: string = "";

  constructor(private _http: Http, private _jsonp: Jsonp) {
    //TODO Commentaires de code !
    //Air pollution 1
    // let airpollution: AirPollution = new Api();
    // airpollution.server = "http://api.waqi.info/";
    // airpollution.api = "feed/shanghai/?token=demo";
    // airpollution.serverWithApiUrl = airpollution.server + airpollution.api;
    //Air quality

    // 1) Create an ApiPollution with properties
    // 2) Add it one the _listApi
    let airquality: AirPollution = new AirPollution();
    airquality.websiteName = "openaq";
    airquality.server = "https://api.openaq.org/";
    airquality.api = "v1/latest?country=FR";
    airquality.serverWithApiUrl = airquality.server + airquality.api;

    //Air quality
    let airvisual: AirPollution = new AirPollution();
    airvisual.websiteName = "airvisual";
    airvisual.server = "http://api.airvisual.com/";
    airvisual.lat = "29.52961";
    airvisual.long = "34.938219"
    airvisual.key = "p4grS8buAWyJy36vJ";
    airvisual.api = "v1/nearest?lat=" + airvisual.lat + "&lon=" + airvisual.long + "&key=" + airvisual.key;
    airvisual.serverWithApiUrl = airvisual.server + airvisual.api;

    //Chimical Pollution
    //This API is opensource and didn't need api-key, this api recognize longitude and latitude

    let safeCast: ChimicalPollution = new ChimicalPollution();
    safeCast.websiteName = "safecast";
    safeCast.server = "https://api.safecast.org/";
    safeCast.lat = "48.837153";
    safeCast.long = "2.258291";
    safeCast.api = "measurements.json?distance=35&latitude=" + safeCast.lat + "&longitude=" + safeCast.long;
    safeCast.serverWithApiUrl = safeCast.server + safeCast.api;

    // this._listApi.push(airpollution);
    this._listApi.push(airquality);
    this._listApi.push(airvisual);
    this._listApi.push(safeCast);
  }

  public getData(serverName: string, options: any = {}): Observable<any>
  {
    console.log(options);
    //we take the Api given from the parameters and return a Observable
    let apiUrlToGet = "";
    for (let api of this._listApi) {
      //For safecast
      if (api.websiteName == serverName && serverName == 'safecast') {
        apiUrlToGet = api.server + "measurements.json?distance=222&latitude=" + options.lat + "&longitude=" + options.lng;
        console.log(apiUrlToGet);
      }
    }
    return this._http.get(apiUrlToGet).map(this.extractData).catch(this.handleError);
  }

  private extractData(response: Response) {
    // extract data from the API website and parse it to json
    console.log(response);
    let body = response.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
