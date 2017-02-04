//From angular
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

    //Load all API that we need
    // let airvisual: AirPollution = new AirPollution();
    // airvisual.websiteName = "airvisual";

    let Openaq: AirPollution = new AirPollution('openaq');
    let SafeCast: ChimicalPollution = new ChimicalPollution('safecast');
    let Aqicn: AirPollution = new AirPollution('aqicn');
    // let MyWeather: Weather = new Weather('weather'); //TRYHARD

    //options for openaq
    Openaq.setOptions({
      websiteName: 'openaq',
      lat: this.location.latitude,
      lng: this.location.longitude,
      typePollution: Openaq.typePollution,
      country: 'FR',
      showMap: true,
      showChart: true
    });

    //options for Safecast
    SafeCast.setOptions({
      websiteName: 'safecast',
      lat: this.location.latitude,
      lng: this.location.longitude,
      typePollution: SafeCast.typePollution,
      distance: 2222,
      showMap: true,
      showChart: true
    });

    //options for aqicn
    Aqicn.setOptions({
      websiteName: 'aqicn',
      lat: this.location.latitude,
      lng: this.location.longitude,
      typePollution: Aqicn.typePollution,
      showMap: true,
      showChart: true
    });

    // options for weather TRYHARD
    // MyWeather.setOptions({
    //   websiteName: 'weather',
    //   lat: this.location.latitude,
    //   lng: this.location.longitude,
    //   typePollution: MyWeather.typePollution,
    //   showMap: true,
    //   showChart: true
    // });

    //get data for safecast
    this._apiService.getData(SafeCast.websiteName, SafeCast.options)
    .subscribe( result => {
      SafeCast.setData(result);
      this.listApi.push(SafeCast);
      if(this.listApi.length === 3) this.completeLoading();
    }, err => {
      console.log('error getting data for SafeCast', err);
    });

    //get data for openaq
    this._apiService.getData(Openaq.websiteName, Openaq.options)
    .subscribe( result => {
      Openaq.setData(result);
      this.listApi.push(Openaq);
      if(this.listApi.length === 3) this.completeLoading();
    }, err => {
      console.log('error getting data for Openaq', err);
    });

    //get data for aqicn
    this._apiService.getData(Aqicn.websiteName, this._options)
    .subscribe( result => {
      Aqicn.setData(result);
      this.listApi.push(Aqicn);
      if(this.listApi.length === 3) this.completeLoading();
    }, err => {
      console.log('error getting data for Aqicn', err);
    });

    //get data for MyWweather
    // this._apiService.getData(MyWeather.websiteName, this._options).subscribe( result => {
    //   MyWeather.setData(result);
    //   this.listApi.push(MyWeather);
    // }, err => {
    //   console.log('error getting data for Aqicn', err);
    // });
  }

  onSubmit(data: any) {
    this.startLoading();

    let city = data._value.toLowerCase();
    // get Location data from the city
    let result = this._geolocationService.searchingDataForCity(city);
    setTimeout(() => {
      console.log(result);
      this.listApi.map((api) => {
        api.options.lat = result.latitude;
        api.options.lng = result.longitude;
      });
      this.completeLoading();
    }, 1000);
  }

  showPageApi(api: any): void {
    this._router.navigate(['/pageApi', api.options]);
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
