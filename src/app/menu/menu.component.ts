//From Angular
import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router'

//Geolocation component
import { EmitterService } from '../ng2-location/browser-location'
import { nglocationService } from '../ng2-location/browser-location-service';
import {EventEmitter} from '@angular/core';
import { Location } from '../ng2-location/location-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [nglocationService]
})
export class MenuComponent implements OnInit {
  private _showBtnNavBack: boolean = false;
  public selectedCity: string;

  constructor(private router: Router, private _ngLocation: nglocationService) {
    //See manual function for more details.//watch the current url
    router.events.subscribe(this.showNavBackButton.bind(this));
    _ngLocation.getCitydata();

    //Emitter is used for retrieve city information / Exist or not
   EmitterService.get("selectedCity").subscribe(data => {
     this.selectedCity = data;
     localStorage.setItem('city', this.selectedCity);
   });
  }

  ngOnInit() {
    this.selectedCity = localStorage.getItem('city');
  }

  showNavBackButton(val) {
    this._showBtnNavBack = (val.url == "/") ? false : true;
  }

}
