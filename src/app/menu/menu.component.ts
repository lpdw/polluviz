//From Angular
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private _url: string = "";
  private _showBtnNavBack: boolean = false;

  constructor(private router: Router) {
    //watch the current url
    router.events.subscribe(this.showNavBackButton.bind(this));
  }

  ngOnInit() {
  }

  showNavBackButton(val) {
    this._url = val.url;
    if(val.url == "/")
      this._showBtnNavBack = false;
    else
      this._showBtnNavBack = true;

    console.log(this._showBtnNavBack);
  }

}
