import { flatten } from '@angular/router/src/utils/collection';
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
  private _noData: boolean = false;
  private _myStyleMap: any = [];
  private _gmap: GMAP;

  constructor(private _route: ActivatedRoute,private _apiService: ApiService) { }

  ngOnInit()
  {
    // The PageAPI component must read the parameter,
    //  then load the API based on the websiteName given in the parameter.
    this._sub = this._route.params.subscribe(params =>
    {
      //get all params that we need
      this._options = { websiteName: params['websiteName'], showMap: (params['showMap'] === 'true'), lng: +params['lng'], lat: +params['lat']  };

       //call the ApiService to fectch all data
       this._apiService.getData(params['websiteName'],this._options).toPromise().then(this.setData.bind(this));
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
    // if data is not empty
    if(this.isEmptyData() === false)
    {
      //if we want use Gmap
      if(this._options.showMap == true)
        this.showGMap();
      else
        console.log("don't need the map");
    }
  }

  showGMap(): void {
    //all data => this._data
    //all options => this._options
    this._gmap = new GMAP();
    this._gmap.title = this._options.websiteName;
   this._myStyleMap = this._gmap.myStyleMap;
   this._gmap.lat = this._options.lat;
   this._gmap.lng = this._options.lng;
  }

  setData(data) {
    console.log(this._data);
    this._data = data;
    this._noData = (this._data.length === 0 || this._data === 'null') ? true : false;
  }

  isEmptyData(): boolean {
    return this._noData;
  }
}
