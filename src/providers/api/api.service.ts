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
// providers
import { GeolocationService } from '../../providers/geolocation/geolocation.service';

import { Api } from '../../api/api.class';
import { AirPollution } from '../../api/airpollution.api';
import { ChimicalPollution } from '../../api/chimicalpollution.api';
import { YahooWeather } from '../../api/yahooweather.api';

/**
- * @class ApiService
- * @constructor
- **/

@Injectable()
export class ApiService {

  private _location: any;
  private _listApi: Array<Api>;
  private _mapStyle: any = [];
  private _token: string;

  constructor
  (
    public http: Http,
    public jsonp: Jsonp,
    private _geolocationService : GeolocationService
  )
  {
    this._listApi = new Array<Api>();
    this._location = {
      latitude:  48.866667,
      longitude:  2.333333,
      address: 'Paris',
      postalCode: 75000,
      city: 'Paris',
      search: false // if is from a research
    }

    this._geolocationService.locationObservable.subscribe((data: any) => {
      this.updateLocationData(data);
    });
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
    Airvisual.api = "v1/nearest?lat=" + Airvisual.latitude + "&lon=" + Airvisual.longitude + "&key=" + Airvisual.token;
    Airvisual.serverWithApiUrl = Airvisual.server + Airvisual.api;

    //Chimical Pollution
    //This API is opensource and didn't need api-key, this api recognize longitude and latitude
    this._token = 'SH2oGvx4oSaGU59yJaAM';
    let SafeCast: ChimicalPollution = new ChimicalPollution('safecast', this._token);
    SafeCast.server = "https://api.safecast.org/";
    SafeCast.api = "measurements.json?distance=20000&latitude="+SafeCast.latitude+"&longitude="+SafeCast.longitude;
    SafeCast.serverWithApiUrl = SafeCast.server + SafeCast.api;


    // this._listApi.push(airpollution);
    this._listApi.push(Openaq);
    this._listApi.push(Airvisual);
    this._listApi.push(SafeCast);
    this._listApi.push(Aqicn);

    // update location
    this._listApi.map((api) => {
      this._geolocationService.locationObservable.subscribe(location => {
        api.latitude = location.latitude;
        api.longitude = location.longitude;
        this._location.latitude = location.latitude;
        this._location.longitude = location.longitude;
      });
    });
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

  updateLocationData(data: any) {
    this._location = {
      latitude:  data.latitude,
      longitude:  data.longitude,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      search: data.search // if is from a research
    }
  }

  //Do not set intervall - API endpoint cannot permit this kind of request
  getMyWeatherApi(): YahooWeather{
    let myYahooWeather: YahooWeather = new YahooWeather('Weathers');
    myYahooWeather.server = "https://query.yahooapis.com/v1/";
    myYahooWeather.api = "public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+"Paris"+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    myYahooWeather.serverWithApiUrl = myYahooWeather.server + myYahooWeather.api;
    return myYahooWeather;
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
      api.latitude = this._location.latitude;
      api.longitude = this._location.longitude;

      //For SAFECAST
      if (api.websiteName == serverName && serverName == 'safecast') {
        apiUrlToGet = api.server + "measurements.json?distance="+ options.distance + "&latitude=" + api.latitude + "&longitude=" + api.longitude;
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

  getDataForWeather(myYahooWeather: YahooWeather) {
    let apiUrlToGet = myYahooWeather.server + myYahooWeather.api;
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
