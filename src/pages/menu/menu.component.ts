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

  }

  ngOnInit() {

    // watch the current url
    this.getCurrentLocation();
    this.router.events.subscribe( val => {

      console.log(val.url);
      if(val.url == "/") {
        this.showBtnNavBack = false;
        this.getCurrentLocation();
      }
      else { // we are on the page Api
        this.showBtnNavBack = true;
      }

      // update the city view
      this._geolocationService.searchObservable.subscribe((data) => {
        if(data.length > 0 && this.showBtnNavBack === true) {
          this.city = data[0].city;
        }
      });

    });
  }

  getCurrentLocation() {
    setTimeout(() => {
      this.location = JSON.parse(window.localStorage.getItem('location'));
      this.city = this.location.city;
    }, 1500);
  }

  ngOnDestroy() {
    // when we inherit the interface "OnDestroy" we need to implement "OnDestroy"
    // just before the component is destroyed
    this._subscribe.unsubscribe();
  }
}
