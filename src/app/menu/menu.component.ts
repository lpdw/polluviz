//From Angular
import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router'

//Geolocation component
import { GeolocationService } from '../../providers/geolocation/geolocation.service';

// import { EmitterService } from '../ng2-location/browser-location'
// import { nglocationService } from '../ng2-location/browser-location-service';
// import {EventEmitter} from '@angular/core';
// import { Location } from '../ng2-location/location-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: []
})
export class MenuComponent implements OnInit {

  public location: any;
  private _showBtnNavBack: boolean = false;

  constructor(private router: Router) {
    this.location = JSON.parse(window.localStorage.getItem('location'));
  }

  ngOnInit() { }

  showNavBackButton(val) {
    this._showBtnNavBack = (val.url == "/") ? false : true;
  }

}
