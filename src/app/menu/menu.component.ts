//From Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private _onPage: boolean = false;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this._route);
  }

  showButtonNavBack(): boolean {
    return this._onPage;
  }

}
