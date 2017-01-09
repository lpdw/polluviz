import { LatLng } from 'angular2-google-maps/core';
import { flatten } from '@angular/router/src/utils/collection';
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

  public errorMessage: string;
  // private _listApi: Array<Api> = [];
  private _options: any = {};

  private _optionsLocation: any = {};
  private _apiData: Array<any> = [];
  public selectedCity: string;
  public dataLocation: any = {};
  private lat: number;
  private lng: number;

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

    this.lat = this.dataLocation.latitude;
    this.lng = this.dataLocation.longitude;
    // Set the options for the geolocation
    this._optionsLocation = {
      enableHighAccuracy: true, //Gets a more accurate position via GPS
      timeout: 5000, //Duration before return to error function
      maximumAge: 0  // Duration of the caching of the current position,  if maximumAge: 0 then the position will never come from the cache, it will always be renewed
    }


    //TOUS LES API QUI SERONT CHARGE DE BASE
    let openaq: AirPollution = new AirPollution();
    openaq.websiteName = "openaq";
    openaq.server = "https://api.openaq.org/";

    // let airvisual: AirPollution = new AirPollution();
    // airvisual.websiteName = "airvisual";
    // airvisual.server = "http://api.airvisual.com/";

    // API SafeCast for ChemicalPollution
    let safeCast: ChimicalPollution = new ChimicalPollution();
    safeCast.websiteName = "safecast";
    safeCast.server = "https://api.safecast.org/";

    //Push into listApi
    // this._listApi.push(safeCast);
    // this._listApi.push(openaq);
    // this._listApi.push(airvisual);

    // this._options = { lat: this.lat,lng: this.lng };
    // this._apiService.getData("http://api.waqi.info/").toPromise().then(data => console.log(data) );

    //options for safecast
    let showMap = true;
    let showChart = true;

    this._options = { lat: this.lat, lng: this.lng, distance: 2222 };
    this._apiService.getData(safeCast.websiteName, this._options).toPromise().then(
      this.addData.bind(this, 'safecast', this._options, safeCast.typePollution, showMap, showChart)
    );

    //options for openaq
    this._options = { lat: this.lat, lng: this.lng, country: 'FR' };
    this._apiService.getData(openaq.websiteName, this._options).toPromise().then(
      this.addData.bind(this, 'openaq', this._options, openaq.typePollution, showMap, showChart)
    );

    //this._apiService.getData(openaq.websiteName).toPromise().then(data => console.log(data));
    // this._apiService.getData(airvisual.websiteName).toPromise().then(data => console.log(data));
  }

  showPageApi(api: any): void {
    let  options;
    if(api.websiteName == 'safecast') //get all options for safecast
      options = { websiteName: api.websiteName, lat: api.options.lat, lng: api.options.lng, showMap: api.showMap,showChart: api.showChart, typePollution: api.typePollution, distance: api.options.distance };
    else if(api.websiteName == 'openaq') //get all options for openaq
      options = { websiteName: api.websiteName, lat: api.options.lat, lng: api.options.lng, showMap: api.showMap,showChart: api.showChart, typePollution: api.typePollution, country: api.options.country };

    this._router.navigate(['/pageApi', options]);
  }

  redirectToExternalLink(link: string) {
    window.open(link.toLowerCase(), '_blank');
  }

  addData(website: string, options: any, typePollution: string,showMap: boolean,showChart: boolean, data: any): void {
    this._apiData.push({websiteName: website, data: data,typePollution: typePollution, options: options, showMap: showMap, showChart: showChart});
  }

}
