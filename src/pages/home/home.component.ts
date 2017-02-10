//From angular
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

//From our project
import { Api } from '../../api/api.class';
import { AirPollution } from '../../api/airpollution.api';
import { ChimicalPollution } from '../../api/chimicalpollution.api';
import { YahooWeather } from '../../api/yahooweather.api';
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
  public listApi: Array<Api>;
  public location: any;
  public allDataApiLoaded: boolean;
  public temperature: number;
  private _options: any;
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

    this._geolocationService.resetDefaultDataGeolocation();
    this._geolocationService.locationObservable.subscribe( location => {
        this.location = location;
    });

    let allApi = this._apiService.getAllApi();

    allApi.map((api) => {
      let options;
      let optionalOptions;
      if(api.websiteName == 'openaq') {
        optionalOptions = { country: 'FR' };
        options = this.getCommonAndOptionalOptions(api, optionalOptions);
      }
      else if(api.websiteName == 'safecast') {
        optionalOptions = { distance: 2222 };
        options = this.getCommonAndOptionalOptions(api, optionalOptions);
      }
      else if(api.websiteName == 'aqicn') {
        optionalOptions = { distance: 2222 };
        options = this.getCommonAndOptionalOptions(api, optionalOptions);
      }
      else if (api.websiteName == 'airvisual') {
        options = this.getCommonAndOptionalOptions(api);
      }
      api.setOptions(options);

      // API
      this._apiService.getData(api.websiteName, api.options)
      .subscribe( result => {
        this.listApi.push(api);
        if(this.listApi.length === 3) this.completeLoading();
      }, err => {
        console.log(`error getting data for ${api.websiteName} : ${err}`);
      });
    });

  }

  // we have common options
  getCommonAndOptionalOptions(api: Api, optionalOptions ?: any) {
    let options;

    options = [ {
      commonOptions: {
        websiteName: api.websiteName,
        typePollution: api.typePollution,
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
    this._geolocationService.searchingDataForCity(city);

    this._geolocationService.locationObservable.subscribe( location => {
      this.listApi.map((api) => {
        // foreach Api => update the location for the params only
        api.options[0].commonOptions.latitude = location.latitude;
        api.options[0].commonOptions.longitude = location.longitude;
      });

      this.completeLoading();
    });
  }

  showPageApi(api: Api): void {
    // merge common and optional options;
    let options = this.extend(api.options[0].commonOptions, api.options[0].optional);
    this._router.navigate(['/pageApi', options]);
  }

  private extend(obj, src) {
    if(typeof src !== 'undefined') {
      for (var key in src) {
          if (src.hasOwnProperty(key)) obj[key] = src[key];
      }
    }
    return obj;
  }

  startLoading() {

    this.allDataApiLoaded = false;
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
