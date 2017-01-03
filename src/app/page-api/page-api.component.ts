import { Component, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-api',
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss']
})
export class PageAPIComponent implements OnInit, OnDestroy {

  private _websiteName: string;
  private _sub: any;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit()
  {
    // The PageAPI component must read the parameter,
    //  then load the API based on the websiteName given in the parameter.

    this._sub = this._route.params.subscribe(params => {
       this._websiteName = params['websiteName'];
       // we have to dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
