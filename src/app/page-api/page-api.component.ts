//From angular
import { Component, OnDestroy, OnInit, style, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//From our project ,
// We only import what we need
import { Api } from '../API/api.class';
import { StylesMap } from '../API/styles.api';
import { ApiService } from '../api.service';
import { AirPollution } from '../API/airpollution.api';
import { Gmap } from '../API/gmap.api';
import { GChart} from '../API/gchart.api';

@Component({
  selector: 'app-page-api',
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss'],
  providers: [ApiService],
})
export class PageAPIComponent implements OnInit, OnDestroy {

  private _sub: any;
  private _options: any = {};
  private _showMap: boolean = false;
  private _showChart: boolean = false;
  private _listGChart: Array<any> = [];
  private _data: any = null;
  private _noData: boolean = false;
  private _myStyleMap: any = [];
  private _gMap: Gmap;
  private _styleMap: StylesMap;
  private _websiteName: string;

  constructor( private _route: ActivatedRoute, private _apiService: ApiService)
  {
    this._styleMap = new StylesMap();
    this._gMap = new Gmap();
  }

  ngOnInit()
  {
    // The PageAPI component must read the parameter,
    //  then load the API based on the websiteName given in the parameter.
    this._sub = this._route.params.subscribe(params =>
    {
      this._showMap = (params['showMap'] === 'true');
      this._showChart = (params['showChart'] === 'true');
      this._websiteName = params['websiteName'];
      //get all params that we need depends api
      if(params['websiteName'] == 'safecast') //options for safecast
        this._options = { websiteName: params['websiteName'], showMap: this._showMap, showChart: this._showChart, lng: +params['lng'], lat: +params['lat'], typePollution: params['typePollution'], distance: params['distance']};
      else if(params['websiteName'] == 'openaq') //options for openaq
        this._options = { websiteName: params['websiteName'], showMap: this._showMap, showChart: this._showChart, lng: +params['lng'], lat: +params['lat'], typePollution: params['typePollution'], country: params['country']};

       //call the ApiService to fectch all data
       this._apiService.getData(params['websiteName'],this._options).toPromise().then(this.setData.bind(this));
    });
  }

  ngOnDestroy() {
    // when we inherit the interface "OnDestroy" we need to implement "OnDestroy"
    // just before the component is destroyed
    this._sub.unsubscribe();
  }

  drawGmap(): void {
   this._gMap.title = this._options.websiteName;
   this._myStyleMap = this._gMap.myStyleMap;
   this._gMap.lat = this._options.lat;
   this._gMap.lng = this._options.lng;
  }

  showGmap() {
    if(this._options.showMap == true)
      this.drawGmap();
    else
      console.log("don't need the map");
  }

  showGChart() {
    if(this._showChart == true)
        this.drawGChart('LineChart',this._data);
  }

  setData(data: any) {
    this._data = data;
    this._noData = (this._data.length === 0 || this._data === 'null') ? true : false;
    this.showGmap();
    this.showGChart();
  }

  isEmptyData(): boolean {
    return this._noData;
  }

  getStyleMap(style: string){
    let styleType;
    if(this._options.typePollution == style)
      styleType = this._styleMap.getStyle(style);
    return styleType;
  }

  drawGChart(type: string, data: any) {
    console.log(data);
    //Example line chart
    let gChart: GChart = new GChart();
    gChart.type = type;

    if(this._websiteName == 'openaq') {
      gChart.data = gChart.getChart('LineChart',this._websiteName, data.results).data;
    }

    gChart.options = gChart.getChart('LineChart',this._websiteName).options;
    this._listGChart.push({data: gChart.data, type: gChart.type});
  }
}
