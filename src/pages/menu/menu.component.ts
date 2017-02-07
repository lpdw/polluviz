//From Angular
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

//Geolocation component
import { GeolocationService } from '../../providers/geolocation/geolocation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: []
})
export class MenuComponent implements OnInit {

  public location: any;
  public city: string;
  public showBtnNavBack: boolean = false;
  public _subscribe: any;

  constructor ( private router: Router, private _route: ActivatedRoute, private _geolocationService: GeolocationService ) {
    // watch the current url
    this.router.events.subscribe( val => {
      if(val.url == "/") {
        this.showBtnNavBack = false;
        this._geolocationService.resetDefaultDataGeolocation();
        setTimeout(() => {
          this.city = this._geolocationService.getData().city;
        }, 2000);
      }
      else { // we are on the page Api
        this.showBtnNavBack = true;
        setTimeout(() => {
          this.city = this._geolocationService.getData().city;
        }, 1500);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // when we inherit the interface "OnDestroy" we need to implement "OnDestroy"
    // just before the component is destroyed
    this._subscribe.unsubscribe();
  }
}
