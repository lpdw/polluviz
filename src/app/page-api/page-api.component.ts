//From angular
import { Component, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//From our project ,
// We only import what we need
import { Api } from '../API/api.class';
import { ApiService } from '../api.service';
import { AirPollution } from '../API/airpollution.api';
import { GMAP } from '../API/gmap.api';

@Component({
  selector: 'app-page-api',
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss'],
  providers: [ApiService]
})
export class PageAPIComponent implements OnInit, OnDestroy {

  private _sub: any;
  private _options: any = {};
  private _showMap: boolean = false;
  private _data: any = null;

  constructor(private _route: ActivatedRoute,private _apiService: ApiService) { }

  ngOnInit()
  {
    // The PageAPI component must read the parameter,
    //  then load the API based on the websiteName given in the parameter.
    this._sub = this._route.params.subscribe(params =>
    {
      //get all params that we need
      this._options = { websiteName: params['websiteName'], showMap: (params['showMap'] === 'true') };

       //call the ApiService to fectch all data
       this._apiService.getData(params['websiteName'],this._options).toPromise().then(data => { this._data = data });
    });

    this.showDataFromApi();
  }

  ngOnDestroy() {
    // when we inherit the interface "OnDestroy" we need to implement "OnDestroy"
    // just before the component is destroyed
    this._sub.unsubscribe();
  }

  showDataFromApi(): void
  {
    if(this._options.showMap == true) {
      console.log('show the map');
      this.showGMap();
    }
    else {
      console.log("don't need the map");
    }
  }

  showGMap(): void {
    //all data => this._data
    //all options => this._options
    let gmap: GMAP = new GMAP();
    gmap.title = this._options.websiteName;
  }
}
