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

  private _listApi: Array<Api>;
  private _mapStyle: any = [];
  private _token: string;

  constructor
  (
    public http: Http,
    public jsonp: Jsonp
  )
  {
    this._listApi = new Array<Api>();
    this.initApi();
  }

  public initApi() {

    //Air pollution 1
    this._token = '4d786963eb8fec1329365e78bf3f9d16c1b157b9';
    let Aqicn: AirPollution = new AirPollution('aqicn', this._token);
    Aqicn.server = "http://api.waqi.info/";
    Aqicn.api = "feed/here/?token="+this._token;
    Aqicn.serverWithApiUrl = Aqicn.server + Aqicn.api;

    //Air pollution 2
    let Openaq: AirPollution = new AirPollution('openaq');
    Openaq.server = "https://api.openaq.org/";
    Openaq.api = "v1/latest?country=FR";
    Openaq.serverWithApiUrl = Openaq.server + Openaq.api;

    //Air pollution 3
    this._token = 'p4grS8buAWyJy36vJ';
    let Airvisual: AirPollution = new AirPollution('airvisual', this._token);
    Airvisual.server = "http://api.airvisual.com/";
    Airvisual.api = "v1/nearest?lat=" + Airvisual.lat + "&lon=" + Airvisual.long + "&key=" + Airvisual.token;
    Airvisual.serverWithApiUrl = Airvisual.server + Airvisual.api;

    //Chimical Pollution
    //This API is opensource and didn't need api-key, this api recognize longitude and latitude
    this._token = 'SH2oGvx4oSaGU59yJaAM';
    let SafeCast: ChimicalPollution = new ChimicalPollution('safecast', this._token);
    SafeCast.server = "https://api.safecast.org/";
    SafeCast.api = "measurements.json";
    SafeCast.serverWithApiUrl = SafeCast.server + SafeCast.api;


    // this._listApi.push(airpollution);
    this._listApi.push(Openaq);
    this._listApi.push(Airvisual);
    this._listApi.push(SafeCast);
    this._listApi.push(Aqicn);
  }

  public getApi(typePollution: string, websiteName ?: string) {
    if(websiteName) {
      return this._listApi.map((api) => {
        return (api.typePollution == typePollution.toLowerCase() && api.websiteName == websiteName.toLowerCase());
      });
    }
    else {
      return this._listApi.map((api) => {
        return (api.typePollution == typePollution.toLowerCase());
      });
    }
  }

  getMyWeatherApi(): Weather {
    //Weather
    let token = '691ec3376cb82530f3cd25ce9a1d1936';
    let MyWeather: Weather = new Weather('weather', token);
    MyWeather.server = "http://api.openweathermap.org/";
    setTimeout(() => {
      MyWeather.api = "data/2.5/weather?lat=" + MyWeather.lat + "&lon=" + MyWeather.long + "&APPID=" + MyWeather.token;
    },1500);
    MyWeather.serverWithApiUrl = MyWeather.server + MyWeather.api;

    return MyWeather;
  }

  public getAllApi() { return this._listApi; }

  public setOptions(websiteName: string, options: any) {
    this._listApi.map((api) => {
      api.setOptions(options);
    });
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
      else if(api.websiteName == serverName && serverName == 'aqicn') {
        apiUrlToGet = api.serverWithApiUrl;
      }
      else if(api.websiteName == serverName && serverName == 'airvisual') {
        apiUrlToGet = api.serverWithApiUrl;
      }
    }
    return this.http.get(apiUrlToGet).map(this.extractData).catch(this.handleError);
  }

  getDataForWeather(myWeather: Weather) {
    let apiUrlToGet = myWeather.server + myWeather.api;
    return this.http.get(apiUrlToGet).map(this.extractData).catch(this.handleError);
  }

  private extractData(response: Response) {
    // extract data from the API website and parse it to json
    let body = response.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
