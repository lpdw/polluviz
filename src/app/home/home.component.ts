//From angular
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//From our project
import { Api } from '../API/api.class';
import { ApiService } from '../api.service';
import { AirPollution } from '../API/airpollution.api';
import { ChimicalPollution } from '../API/chimicalpollution.api';
//Geolocation component
import { EmitterService } from '../ng2-location/browser-location'
import { nglocationService } from '../ng2-location/browser-location-service';
import {EventEmitter} from '@angular/core';
import {Location} from '../ng2-location/location-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService, nglocationService],
})
export class HomeComponent implements OnInit {

  public searchControl: FormControl;

  private _options: any = {};
  private _apiData: Array<any> = [];
  public selectedCity: string;
  public location: any = {};

  constructor(private _apiService: ApiService, private _router: Router, private _ngLocation: nglocationService) {

    this.searchControl = new FormControl();
    this.searchControl.setValue('');

    //See manual function for more details.
     _ngLocation.getCitydata();

    //Emitter is used for retrieve city information / Exist or not
    EmitterService.get("selectedCity").subscribe(data => {
      this.selectedCity = data;
      localStorage.setItem('city', this.selectedCity);
    });

  }

  ngOnInit()
  {
    this.selectedCity = localStorage.getItem('city');
    this.location = JSON.parse(localStorage['location']);

    //Load all API that we need
    // let airvisual: AirPollution = new AirPollution();
    // airvisual.websiteName = "airvisual";

    let Openaq: AirPollution = new AirPollution('openaq');
    let SafeCast: ChimicalPollution = new ChimicalPollution('safecast');
    let Aqicn: AirPollution = new AirPollution('aqicn');

    //options for Safecast
    this._options = {
      websiteName: 'safecast',
      lat: this.location.latitude,
      lng: this.location.longitude,
      typePollution: SafeCast.typePollution,
      distance: 2222,
      showMap: true,
      showChart: true
    };
    //get data for safecast
    this._apiService.getData(SafeCast.websiteName, this._options).toPromise().then(
      this.addData.bind(this, this._options)
    );

    //options for openaq
    this._options = {
      websiteName: 'openaq',
      lat: this.location.latitude,
      lng: this.location.longitude,
      typePollution: Openaq.typePollution,
      country: 'FR',
      showMap: true,
      showChart: true
    };
    //get data for openaq
    this._apiService.getData(Openaq.websiteName, this._options).toPromise().then(
      this.addData.bind(this, this._options)
    );

    //options for aqicn
    this._options = {
      websiteName: 'aqicn',
      lat: this.location.latitude,
      lng: this.location.longitude,
      typePollution: Aqicn.typePollution,
      showMap: true,
      showChart: true
    };
    //get data for aqicn
    this._apiService.getData(Aqicn.websiteName, this._options).toPromise().then(
      this.addData.bind(this, this._options)
    );
  }

  onSubmit(data: any) {
    let city = data._value.toLowerCase();
    // get Location data from the city  
  }

  showPageApi(api: any): void {
    this._router.navigate(['/pageApi', api.options]);
  }

  addData(options: any, data: any): void {
    this._apiData.push({
        websiteName: options.websiteName,
        data: data,
        options: options,
    });
  }
}
