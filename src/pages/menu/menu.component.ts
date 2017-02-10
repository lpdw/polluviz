//From Angular
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Weather } from '../../api/weather.api'; //TRYHARD
import { Api } from '../../api/api.class';
import { ApiService } from '../../providers/api/api.service';
//Geolocation component
import { GeolocationService } from '../../providers/geolocation/geolocation.service';

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
  private _apiService: ApiService;

  constructor ( private router: Router, private _route: ActivatedRoute, private _geolocationService: GeolocationService ) {

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
  }

  ngOnDestroy() {
    // when we inherit the interface "OnDestroy" we need to implement "OnDestroy"
    // just before the component is destroyed
    this._subscribe.unsubscribe();
  }
}
