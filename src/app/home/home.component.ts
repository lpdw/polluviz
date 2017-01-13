//From angular
import { Component, OnInit, Injectable } from '@angular/core';
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
  providers: [ApiService, nglocationService]
})


export class HomeComponent implements OnInit {

  private _options: any = {};
  private _apiData: Array<any> = [];
  public selectedCity: string;
  public dataLocation: any = {};

  constructor(private _apiService: ApiService, private _router: Router, private _ngLocation: nglocationService) {

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
    this.dataLocation = JSON.parse(localStorage['location']);

    //Load all API that we need
    // let airvisual: AirPollution = new AirPollution();
    // airvisual.websiteName = "airvisual";

    let openaq: AirPollution = new AirPollution('openaq');

    let safeCast: ChimicalPollution = new ChimicalPollution('safecast');

    let aqicn: AirPollution = new AirPollution('aqicn');

    //options for Safecast
    this._options = {
      lat: this.dataLocation.latitude,
      lng: this.dataLocation.longitude,
      typePollution: safeCast.typePollution,
      distance: 2222,
      showMap: true,
      showChart: true
    };
    //get data for safecast
    this._apiService.getData(safeCast.websiteName, this._options).toPromise().then(
      this.addData.bind(this, 'safecast', this._options)
    );

    //options for openaq
    this._options = {
      lat: this.dataLocation.latitude,
      lng: this.dataLocation.longitude,
      typePollution: openaq.typePollution,
      country: 'FR',
      showMap: true,
      showChart: true
    };
    //get data for openaq
    this._apiService.getData(openaq.websiteName, this._options).toPromise().then(
      this.addData.bind(this, 'openaq', this._options)
    );

    //options for aqicn
    this._options = {
      lat: this.dataLocation.latitude,
      lng: this.dataLocation.longitude,
      typePollution: aqicn.typePollution,
      showMap: true,
      showChart: true
    };
    //get data for aqicn
    this._apiService.getData(aqicn.websiteName, this._options).toPromise().then(
      this.addData.bind(this, 'aqicn', this._options)
    );
  }

  showPageApi(api: any): void
  {
    let options;
    if(api.websiteName == 'safecast') //get all options for safecast
      options = { websiteName: api.websiteName, lat: api.options.lat, lng: api.options.lng, showMap: api.showMap,showChart: api.showChart, typePollution: api.typePollution, distance: api.options.distance };
    else if(api.websiteName == 'openaq') //get all options for openaq
      options = { websiteName: api.websiteName, lat: api.options.lat, lng: api.options.lng, showMap: api.showMap,showChart: api.showChart, typePollution: api.typePollution, country: api.options.country };
    else if(api.websiteName == 'aqicn') // get all options for aqicn
      options = { websiteName: api.websiteName, lat: api.options.lat, lng: api.options.lng, showMap: api.showMap,showChart: api.showChart, typePollution: api.typePollution};
    this._router.navigate(['/pageApi', options]);
  }

  redirectToExternalLink(link: string) {
    window.open(link.toLowerCase(), '_blank');
  }

  addData(website: string, options: any, data: any): void {
    this._apiData.push(
      {
        websiteName: website,
        data: data,
        typePollution: options.typePollution,
        options: options,
        showMap: options.showMap,
        showChart: options.showChart
      });
  }

}
