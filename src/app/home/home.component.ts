//From angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//From our project
import { Api } from '../API/api.class';
import { ApiService } from '../api.service';
import { AirPollution } from '../API/airpollution.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  public errorMessage: string;
  public _listApi : Array<Api> = [];

  constructor(private _apiService: ApiService,private _router: Router) { }

  ngOnInit() {
    //TOUS LES API QUI SERONT CHARGE DE BASE
    let openaq: AirPollution = new AirPollution();
    openaq.websiteName = "openaq";
    openaq.server = "https://api.openaq.org/";

    let airvisual: AirPollution = new AirPollution();
    airvisual.websiteName = "airvisual";
    airvisual.server = "http://api.airvisual.com/";

    this._listApi.push(openaq);
    this._listApi.push(airvisual);

    // this._apiService.getData("http://api.waqi.info/").toPromise().then(data => console.log(data) );
    this._apiService.getData(openaq.websiteName).toPromise().then(data => console.log(data));
    this._apiService.getData(airvisual.websiteName).toPromise().then(data => console.log(data));
  }

  showPageApi(websiteName: string) :void {
    let options = {};
    this._router.navigate(['/pageApi',{ websiteName: websiteName, lat: '42', showMap: true }]);
  }

  redirectToExternalLink(link: string) {
    window.open(link.toLowerCase(), '_blank') ;
  }
}
