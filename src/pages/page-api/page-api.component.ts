//From angular
import { Component, OnDestroy, OnInit, style, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//From Internal Api
import { Api } from '../../api/api.class';
import { StylesMap } from '../../api/styles.api';
import { AirPollution } from '../../api/airpollution.api';
import { Weather } from '../../api/weather.api'; //TRYHARD
import { Gmap } from '../../api/gmap.api';
import { GChart} from '../../api/gchart.api';

// From providers
import { ApiService } from '../../providers/api/api.service';

@Component({
  selector: 'app-page-api',
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss'],
  providers: [ApiService],
})
export class PageAPIComponent implements OnInit, OnDestroy {

  private _subscribe: any;
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
  private _circleRadius: number = 0 ;
  private _circleColor: string;

  constructor
  (
    private _route: ActivatedRoute,
    private _apiService: ApiService
  )
  {
    this._styleMap = new StylesMap();
    this._gMap = new Gmap();
  }

  ngOnInit()
  {
    // The PageAPI component must read the parameter,
    //  then load the API based on the websiteName given in the parameter.
    this._subscribe = this._route.params.subscribe(params =>
    {
      console.log(params);
      this._showMap = (params['showMap'] === 'true');
      this._showChart = (params['showChart'] === 'true');
      this._websiteName = params['websiteName'];

      //get all params that we need depends api
      if(params['websiteName'] == 'safecast')//options for safecast
        this._options = { websiteName: params['websiteName'], showMap: this._showMap, showChart: this._showChart, lng: +params['lng'], lat: +params['lat'], typePollution: params['typePollution'], distance: params['distance']};
      else if(params['websiteName'] == 'openaq') //options for openaq
        this._options = { websiteName: params['websiteName'], showMap: this._showMap, showChart: this._showChart, lng: +params['lng'], lat: +params['lat'], typePollution: params['typePollution'], country: params['country']};
      else if(params['websiteName'] == 'aqicn')
        this._options = { websiteName: params['websiteName'], showMap: this._showMap, showChart: this._showChart, lng: +params['lng'], lat: +params['lat'], typePollution: params['typePollution']};
      else if(params['websiteName'] == 'airvisual')
        this._options = { websiteName: params['websiteName'], showMap: this._showMap, showChart: this._showChart, lng: +params['lng'], lat: +params['lat'], typePollution: params['typePollution']};
      else if(params['websiteName'] == 'weather') //options for weather TRYHARD
        this._options = { websiteName: params['websiteName'], showMap: this._showMap, showChart: this._showChart, lng: +params['lng'], lat: +params['lat'], typePollution: params['typePollution'], country: params['country']};

       //call the ApiService to fectch all data
       this._apiService.getData(params['websiteName'],this._options)
       .subscribe( result => {
         this.setData(result);
       }, error => {
         console.log('error gettings data from the API ');
       });
    });
  }

  ngOnDestroy() {
    // when we inherit the interface "OnDestroy" we need to implement "OnDestroy"
    // just before the component is destroyed
    this._subscribe.unsubscribe();
  }

  drawGmap(): void {
   this._gMap.title = this._options.websiteName;
   this._myStyleMap = this._gMap.myStyleMap;
   this._gMap.lat = this._options.lat;
   this._gMap.lng = this._options.lng;
   this._gMap.zoom = 14;
  }

  showGmap() {
    if(this._options.showMap == true)
      this.drawGmap();
    else
      console.log("don't need the map");
  }

  showGChart() {
    if(this._showChart == true)
        //for openaq use LineChart
        if (this._websiteName == 'openaq') {
            this.drawGChart('LineChart',this._data);
        }
        else if (this._websiteName == 'aqicn') { //for openaq use PieChart
            this.drawGChart('PieChart',this._data);
        }

  }

  setData(data: any) {
    this._data = data;

    this._noData = (this._data.length === 0 || this._data === 'null') ? true : false;
    this.showGmap();
    this.showGChart();

    switch(this._websiteName) {
      case  'openaq' :
      this._data = data.results;
        console.log(`${this._websiteName}`);
        this._data.websiteName = this._websiteName;
        for(var i = 0; i < this._data.length; i++){
    
          this._circleRadius = this._data[i].measurements[0].value;
          if(this._circleRadius < 15){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "lightgreen";
          }
          if(this._circleRadius >= 15 && this._circleRadius < 25){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "green";
          }
          if(this._circleRadius >= 25 && this._circleRadius < 35){
          this._data[i].circleRadius = this._circleRadius;
          this._data[i].circleColor = "darkgreen";
        }
        if(this._circleRadius >= 35 && this._circleRadius < 45){
        this._data[i].circleRadius = this._circleRadius;
        this._data[i].circleColor = "yellow";
       }
       if(this._circleRadius >= 45 && this._circleRadius < 55){
         this._data[i].circleRadius = this._circleRadius;
         this._data[i].circleColor = "orange";
       }
       if(this._circleRadius >= 55 && this._circleRadius < 65){
         this._data[i].circleRadius = this._circleRadius;
         this._data[i].circleColor = "red";
       }
       if(this._circleRadius >= 65){
         this._data[i].circleRadius = this._circleRadius;
         this._data[i].circleColor = "black";
       }
        }
        break;
      case  'safecast' :
        this._data[0].websiteName = this._websiteName;
        // alert(` ${this._websiteName}`);
        console.log(this._data);
        for(var i=0; i<this._data.length; i++)
        {
          // boucle permettant d'avoir les infos de l'objet _data
          console.log(this._data[i]);
          this._circleRadius = this._data[i].value;  // la value des points pour avoir la taille @TODO --> avec ce code mm taille partt, peut etre faire un array !
         // this._circleColor = "yellow";/
          if(this._circleRadius < 40){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "lightgreen";
          }
          if(this._circleRadius >= 40 && this._circleRadius < 60){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "green";
          }
            if(this._circleRadius >= 60 && this._circleRadius < 80){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "darkgreen";
          }
          if(this._circleRadius >= 80 && this._circleRadius < 90){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "yellow";
          }
          if(this._circleRadius >= 90 && this._circleRadius < 110){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "orange";
          }
          if(this._circleRadius >= 110 && this._circleRadius < 150){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "red";
          }
          if(this._circleRadius >= 150){
            this._data[i].circleRadius = this._circleRadius;
            this._data[i].circleColor = "black";
          }
        };
      break;
      case 'aqicn' :
        console.log(`${this._websiteName}`);
        console.log(this._data[i]);
        break;
    }
  }

  isEmptyData(): boolean {
    return this._noData;
  }

  getStyleMap(style: string) {
    let styleType;
    if(this._options.typePollution == style)
      styleType = this._styleMap.getStyle(style);
    return styleType;
  }

  drawGChart(chartType: string, data: any) {
    // console.log(data);
    let gChart: GChart = new GChart();
    gChart.type = chartType;

    gChart.data = gChart.getChartData(this._websiteName, data);

    if(this._websiteName == 'openaq') {
        //chaque chart a ses propres options
        gChart.options = gChart.getChartOptions(this._websiteName, data);
    }
    else if (this._websiteName == 'aqicn') {
        gChart.options = gChart.getChartOptions(this._websiteName, data);
    }

    this._listGChart.push({data: gChart.data, options: gChart.options, type: gChart.type});
  }
}
