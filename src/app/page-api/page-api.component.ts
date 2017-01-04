//From angular
import { Component, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//From our project ,
// We only import what we need
import { Api } from '../API/api.class';
import { ApiService } from '../api.service';
import { AirPollution } from '../API/airpollution.api';

@Component({
  selector: 'app-page-api',
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss'],
  providers: [ApiService]
})
export class PageAPIComponent implements OnInit, OnDestroy {

  private _websiteName: string;
  private _sub: any;

  constructor(private _route: ActivatedRoute,private _apiService: ApiService) { }

  ngOnInit()
  {
    // The PageAPI component must read the parameter,
    //  then load the API based on the websiteName given in the parameter.
    this._sub = this._route.params.subscribe(params => {
       this._websiteName = params['websiteName'];
       // we have to dispatch action to load the details here.
       this._apiService.getData(this._websiteName).toPromise().then(data => console.log(data));
    });
  }

  ngOnDestroy() {
    // when we inherit the interface "OnDestroy" we need to implement "OnDestroy"
    // just before the component is destroyed
    this._sub.unsubscribe();
  }

  showData(data: any) {
    console.log("Tous les données que l'on a récup");
    console.log(data);
  }
}
