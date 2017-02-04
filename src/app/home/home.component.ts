//From angular
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//From our project
import { Api } from '../API/api.class';
import { ApiService } from '../api.service';
import { AirPollution } from '../API/airpollution.api';
import { ChimicalPollution } from '../API/chimicalpollution.api';
import { Weather } from '../API/weather.api'; //TRYHARD

//Geolocation component
import { GeolocationService } from '../../providers/geolocation/geolocation.service';

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

  private _options: any = {};
  private _apiData: Array<any> = [];

  constructor
  (
    private _apiService: ApiService,
    private _router: Router,
    private _geolocationService: GeolocationService,
    // private _ngLocation: nglocationService
  )
  {
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.listApi = new Array<Api>();
  }

  ngOnInit()
  {

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
    this._apiService.getData(SafeCast.websiteName, SafeCast.options).toPromise().then(
      this.addData.bind(this, this._options)
    );

    //get data for openaq
    this._apiService.getData(Openaq.websiteName, Openaq.options).toPromise().then(
      this.addData.bind(this, this._options)
    );

    //get data for aqicn
    this._apiService.getData(Aqicn.websiteName, this._options).toPromise().then(
      this.addData.bind(this, this._options)
    );

    //get data for MyWweather
    // this._apiService.getData(MyWeather.websiteName, this._options).toPromise().then(
    //   this.addData.bind(this, this._options)
    // );

    this.listApi.push(Openaq);
    this.listApi.push(SafeCast);
    this.listApi.push(Aqicn);
    // this.listApi.push(MyWeather);
  }

  onSubmit(data: any) {
    let city = data._value.toLowerCase();
    // get Location data from the city
    let result = this._geolocationService.searchingDataForCity(city);
    let timeoutId = setTimeout(() => {
      console.log(result);
      this.listApi.map((api) => {
        api.options.lat = result.latitude;
        api.options.lng = result.longitude;
      });
    }, 1000);
  }

  showPageApi(api: any): void {
    this._router.navigate(['/pageApi', api.options]);
  }

  addData(options: any, data: any): void {
    this._apiData.push({
        websiteName: options.websiteName,
        data: data,
        options: options
    });
  }
}
