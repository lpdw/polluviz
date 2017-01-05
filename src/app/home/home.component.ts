import { LatLng } from 'angular2-google-maps/core';
import { flatten } from '@angular/router/src/utils/collection';
//From angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//From our project
import { Api } from '../API/api.class';
import { ApiService } from '../api.service';
import { AirPollution } from '../API/airpollution.api';
import { ChimicalPollution } from '../API/chimicalpollution.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  public errorMessage: string;
  private _listApi : Array<Api> = [];
  private _options: any = {};
  public location: any = {};
  private _optionsLocation: any = {};

  constructor(private _apiService: ApiService,private _router: Router) {}

  ngOnInit()
  {
    // Set the options for the geolocation
    this._optionsLocation = {
      enableHighAccuracy: true, //Gets a more accurate position via GPS
      timeout: 5000, //Duration before return to error function
      maximumAge: 0  // Duration of the caching of the current position,  if maximumAge: 0 then the position will never come from the cache, it will always be renewed
    }

    //Check if the browser support the Geolocation
    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.successPosition.bind(this), this.errorPosition, this._optionsLocation);
    else
      alert("Le navigateur ne supporte pas la géolocalisation");


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
    this._listApi.push(safeCast);
    this._listApi.push(openaq);
    // this._listApi.push(airvisual);

    // this._apiService.getData("http://api.waqi.info/").toPromise().then(data => console.log(data) );
    this._apiService.getData(safeCast.websiteName).toPromise().then(data => console.log(data));
    //this._apiService.getData(openaq.websiteName).toPromise().then(data => console.log(data));
    // this._apiService.getData(airvisual.websiteName).toPromise().then(data => console.log(data));
  }

  showPageApi(websiteName: string,lat: string,lng: string) :void {
    let options = {};
    this._router.navigate(['/pageApi',{ websiteName: websiteName, lat: lat, lng: lng , showMap: true }]);
  }

  redirectToExternalLink(link: string) {
    window.open(link.toLowerCase(), '_blank') ;
  }

  // Callback succes location
  successPosition(pos) {
    this.location = pos.coords;
  }

  //callback error location
  errorPosition(error): void {
    let info = "Erreur lors de la géolocalisation : ";
    switch(error.code)
    {
     case error.TIMEOUT:
       info += "Timeout !";
       break;
     case error.PERMISSION_DENIED:
      info += "Vous n’avez pas donné la permission";
      break;
     case error.POSITION_UNAVAILABLE:
      info += "La position n’a pu être déterminée";
      break;
     case error.UNKNOWN_ERROR:
      info += "Erreur inconnue";
      break;
   }
    // console.warn(`ERROR(${error.code}): ${error.message}`);
    console.log(info);
  }

}
