//From angular
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

//From our project
import { Api } from '../../api/api.class';
import { AirPollution } from '../../api/airpollution.api';
import { ChimicalPollution } from '../../api/chimicalpollution.api';
import { Weather } from '../../api/weather.api'; //TRYHARD

// From providers
import { ApiService } from '../../providers/api/api.service';
import { GeolocationService } from '../../providers/geolocation/geolocation.service';

// Slim loading => https://github.com/akserg/ng2-slim-loading-bar
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  public searchControl: FormControl;
  public location: any = {}
  public listApi: Array<Api>;
  public allDataApiLoaded: boolean = false;

  private _options: any = {};
  private _apiData: Array<any> = [];

  constructor
  (
    private _apiService: ApiService,
    private _router: Router,
    private _geolocationService: GeolocationService,
    private _slimLoadingBarService: SlimLoadingBarService
  )
  {
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.listApi = new Array<Api>();
  }

  ngOnInit() {
    this.startLoading();
    this.location = JSON.parse(window.localStorage.getItem('location'));

    let allApi = this._apiService.getAllApi();

    allApi.map((api) => {
      let options;
      let optionalOptions;
      if(api.websiteName == 'openaq') {
        optionalOptions = { country: 'FR' };
        options = this.getCommonAndOptionalOptions(api.websiteName, api.typePollution, optionalOptions);
      }
      else if(api.websiteName == 'safecast') {
        optionalOptions = { distance: 2222 };
        options = this.getCommonAndOptionalOptions(api.websiteName, api.typePollution, optionalOptions);
      }
      else if(api.websiteName == 'aqicn') {
        optionalOptions = { distance: 2222 };
        options = this.getCommonAndOptionalOptions(api.websiteName, api.typePollution, optionalOptions);
      }
      else if (api.websiteName == 'airvisual') {
        options = this.getCommonAndOptionalOptions(api.websiteName, api.typePollution);
      }
      api.setOptions(options);

      // geting data for all APIs
      this._apiService.getData(api.websiteName, api.options)
      .subscribe( result => {
        this.listApi.push(api);
        if(this.listApi.length === 3) this.completeLoading();
      }, err => {
        console.log(`error getting data for ${api.websiteName} : ${err}`);
      });
    });

    // getting data for weather
    let MyWeather: Weather = this._apiService.getMyWeatherApi();
    this._apiService.getDataForWeather(MyWeather)
    .subscribe( result => {
      console.log('Weather data : ', result);
    }, err => {
      console.log(`error getting data for Weather : ${err}`);
    });

  }

  // we have a common options
  getCommonAndOptionalOptions(websiteName: string, typePollution: string, optionalOptions? : any) {
    let options = [ {
      commonOptions: {
        websiteName: websiteName,
        lat: this.location.latitude,
        lng: this.location.longitude,
        typePollution: typePollution,
        showMap: true,
        showChart: true
      },
      optional: optionalOptions
    }];

    return options;
  }

  onSubmit(data: any) {
    this.startLoading();

    let city = data._value.toLowerCase();
    // get Location data from the city
    let result = this._geolocationService.searchingDataForCity(city);
    setTimeout(() => {
      this.listApi.map((api: Api) => {
        api.options[0].commonOptions.lat = result.latitude;
        api.options[0].commonOptions.lng = result.longitude;
      });
      this.completeLoading();
    }, 1000);

  }

  showPageApi(api: Api): void {
    // merge common and optional options;
    let options = this.extend(api.options[0].commonOptions, api.options[0].optional);
    this._router.navigate(['/pageApi', options]);
  }

  private extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
  }

  startLoading() {
     this._slimLoadingBarService.start(() => {
         console.log('Loading complete');
     });
   }

  stopLoading() {
    this._slimLoadingBarService.stop();
  }

  completeLoading() {
    this._slimLoadingBarService.complete();
    this.allDataApiLoaded = true;
  }
}
