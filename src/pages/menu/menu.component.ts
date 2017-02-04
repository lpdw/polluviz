//From Angular
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
  public showBtnNavBack: boolean = false;

  constructor(private router: Router) {
    this.location = JSON.parse(window.localStorage.getItem('location'));

    // watch the current url
    router.events.subscribe( val => {
      this.showBtnNavBack = (val.url == "/") ? false : true;
    });
  }

  ngOnInit() { }
}
