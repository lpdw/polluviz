//From Angular
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Api } from '../../api/api.class';
import { ApiService } from '../../providers/api/api.service';
//Geolocation component
import { GeolocationService } from '../../providers/geolocation/geolocation.service';
//YahooWeather API
import { YahooWeather } from '../../api/yahooweather.api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [ApiService],
})
export class MenuComponent implements OnInit {

  public location: any;
  public city: string;
  public showBtnNavBack: boolean = false;
  public _subscribe: any;
  public temperature: string;
  public alternatif: string;
  constructor ( private router: Router, private _route: ActivatedRoute, private _geolocationService: GeolocationService, private _apiService: ApiService ) {

    // watch the current url
    this.router.events.subscribe( val => {
      if(val.url == "/") {
        this.showBtnNavBack = false;
      }
      else { // we are on the page Api
        this.showBtnNavBack = true;
      }
    });

  }

  ngOnInit() {

    // wath the location
    this._subscribe = this._geolocationService.locationObservable.subscribe( location => {
      this.city = location.city;
    });


    let myYahooWeather: YahooWeather = this._apiService.getMyWeatherApi();
    this._apiService.getDataForWeather(myYahooWeather)
    .subscribe( result => {

      //TODO I a poor lonsome cowboy ... I've a long long way from home.
      this.temperature = ((result.query.results.channel.item.condition.temp - 32)*5/9).toFixed(1) +" °C";

    }, err => {
      console.log(`error getting data for YahooWeather : ${err}`);
    });
  }

  ngOnDestroy() {
    // when we inherit the interface "OnDestroy" we need to implement "OnDestroy"
    // just before the component is destroyed
    this._subscribe.unsubscribe();
  }
}
