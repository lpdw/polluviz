//From angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { Component } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//Form our project
import { Api } from '../../api/api.class';
import { AirPollution } from '../../api/airpollution.api';
import { ChimicalPollution } from '../../api/chimicalpollution.api';
import { Weather } from '../../api/weather.api'; //TRYHARD


/**
- * @class ApiService
- * @constructor
- **/

@Injectable()
export class ApiService {

  private _listApi: Array<Api> = [];
  private _mapStyle: any = [];
  public location: any = {};
  private _token: string;

  constructor(private _http: Http, private _jsonp: Jsonp) {

    //Air pollution 1
    this._token = '4d786963eb8fec1329365e78bf3f9d16c1b157b9';
    let aqicn: AirPollution = new AirPollution('aqicn', this._token);
    aqicn.server = "http://api.waqi.info/";
    aqicn.api = "feed/here/?token="+this._token;
    aqicn.serverWithApiUrl = aqicn.server + aqicn.api;

    //Air quality
    // 1) Create an ApiPollution with properties
    // 2) Add it one the _listApi
    let openaq: AirPollution = new AirPollution('openaq');
    openaq.server = "https://api.openaq.org/";
    openaq.api = "v1/latest?country=FR";
    openaq.serverWithApiUrl = openaq.server + openaq.api;

    //Air quality
    this._token = 'p4grS8buAWyJy36vJ';
    let airvisual: AirPollution = new AirPollution('airvisual', this._token);
    airvisual.server = "http://api.airvisual.com/";
    airvisual.api = "v1/nearest?lat=" + airvisual.lat + "&lon=" + airvisual.long + "&key=" + airvisual.token;
    airvisual.serverWithApiUrl = airvisual.server + airvisual.api;

    //Chimical Pollution
    //This API is opensource and didn't need api-key, this api recognize longitude and latitude
    this._token = 'SH2oGvx4oSaGU59yJaAM';
    let safeCast: ChimicalPollution = new ChimicalPollution('safecast', this._token);
    safeCast.server = "https://api.safecast.org/";
    safeCast.api = "measurements.json";
    safeCast.serverWithApiUrl = safeCast.server + safeCast.api;

    //Weather
    this._token = '691ec3376cb82530f3cd25ce9a1d1936';
    let weather: Weather = new Weather('weather', this._token);
    weather.server = "http://api.openweathermap.org/";
    weather.api = "data/2.5/weather?lat=" + weather.lat + "&lon=" + weather.long + "&appid=" + weather.token;
    weather.serverWithApiUrl = weather.server + weather.api;

    // this._listApi.push(airpollution);
    this._listApi.push(openaq);
    this._listApi.push(airvisual);
    this._listApi.push(safeCast);
    this._listApi.push(aqicn);
    this._listApi.push(weather); //TRYHARD
  }

  public getData(serverName: string, options: any = {}): Observable<any> {
    // console.log(options);
    //we take the Api given from the parameters and return a Observable
    let apiUrlToGet = "";
    for (let api of this._listApi)
    {
      //For SAFECAST
      if (api.websiteName == serverName && serverName == 'safecast') {
        apiUrlToGet = api.server + "measurements.json?distance="+ options.distance + "&latitude=" + options.lat + "&longitude=" + options.lng;
      }
      //For OPENAQ
      else if(api.websiteName == serverName && serverName == 'openaq') {
        apiUrlToGet = api.server + "v1/latest?country=" + options.country;
      }
      //For WEATHER TRYHARD
      else if(api.websiteName == serverName && serverName == 'weather') {
        apiUrlToGet = api.server + "v1/latest?country=" + options.country;
      }
      else if(api.websiteName == serverName && serverName == 'aqicn') {
        apiUrlToGet = api.serverWithApiUrl;
      }
    }
    // console.log(apiUrlToGet);
    return this._http.get(apiUrlToGet).map(this.extractData).catch(this.handleError);
  }

  private extractData(response: Response) {
    // extract data from the API website and parse it to json
    let body = response.json() || response;
    console.log(body);
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
