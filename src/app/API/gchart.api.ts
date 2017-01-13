import { Api } from './api.class';

export class GChart {

  public type: string;
  public data: any = [];
  public options: any;

  public _listChartType: Array<any> = [
  {
    LineChart: {
      data: [
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
      ],
      options:  {
        title: 'Company Performance',
        curveType: 'function',
        legend: { position: 'bottom' },
      }
    }
  },
  {
    BubbleChart: {
      data: [
             ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
             ['CAN',    80.66,              1.67,      'North America',  33739900],
             ['USA',    78.09,              2.05,      'North America',  307007000],
      ],
      options: {
           title: 'Correlation between life expectancy, fertility rate ' + 'and population of some world countries (2010)',
            hAxis: {title: 'Life Expectancy'},
            vAxis: {title: 'Fertility Rate'},
            bubble: {textStyle: {fontSize: 11} }
      }
    }
  },
  {
    ScatterChart: {
      data: [
        ['Date', 'Sales Percentage'],
        [new Date(2016, 3, 22), 78],
        [new Date(2016, 3, 21,9,30,2),88],
      ],
      options: {
        legend: { position: 'bottom' },
        title: 'Company Sales Percentage',
      }
    }
  },
  {
    CandlestickChart: {
      data: [
        ['Day','Low','Opening value','Closing value','High'],
        ['Mon', 28, 28, 38, 38],
        ['Tue', 38, 38, 55, 55],
      ],
      options: {}
    }
  },
  {
    PieChart: {
      data: [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
      ],
      options: {
        title: 'My Daily Activities',
        width: 900,
        height: 500
      }
    }
  },
  {
    BarChart: {
      data: [
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
      ],
      options: {
        title: 'Population of Largest U.S. Cities',
          chartArea: {width: '50%'},
          hAxis: {
            title: 'Total Population',
            minValue: 0,
            textStyle: {
              bold: true,
              fontSize: 12,
              color: '#4d4d4d'
            },
            titleTextStyle: {
              bold: true,
              fontSize: 18,
              color: '#4d4d4d'
            }
          },
          vAxis: {
            title: 'City',
            textStyle: {
              fontSize: 14,
              bold: true,
              color: '#848484'
            },
            titleTextStyle: {
              fontSize: 14,
              bold: true,
              color: '#848484'
            }
          }
        }
      }
    }
  ];

  constructor() { }

  getExampleChartType(chartType: string) {
    let myChart;
    for (let chart of this._listChartType) {
      if (Object.keys(chart)[0] == chartType) {
          myChart = chart;
      }
    }
    return myChart;
  }

  getChartData(websiteName: string, data: any = [])
  {
    console.log("Your are in Gchart Component - gchart.api.ts - in line 132");
    //console.log(data);
    let dataResults = [];
    if(websiteName == 'openaq') //contruct and return data for openaq
    {
      dataResults = [ ['', 'picto'], ];
      for (let result of data.results) {
          // reset the legend
          dataResults[0][1] = result.measurements[0].lastUpdated;
          dataResults[0][1] = result.measurements[0].unit;
          for (let measurement of result.measurements) {
            let date = new Date(measurement.lastUpdated);
            let fullDate = this.getFullDate(date);
            let fullTime = this.getFullTime(date);
            dataResults.push( [ result.city + " " + fullDate+" "+fullTime, measurement.value ] );
          }
      }
    }
    else if(websiteName == 'safecast') {
      //contrcut and return data for safecast
    }
    else if(websiteName == 'aqicn') {
      dataResults = [ ['', ''], ];
      let datas = data.data.iaqi;
      for (let data in datas) {
        dataResults.push([data, datas[data].v])
          console.log(datas[data]);
      }
    }
    return dataResults;
  }

  getChartOptions(chartType: string, websiteName: string, data: any = [])
  {
    let options = {};
    if(websiteName == 'openaq') //contruct and return options for openaq
    {
      if(chartType == 'LineChart') {
        options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        }
      }
    }
    else if(websiteName == 'safecast') //contruct and return data fior openaq
    {
      //get options
    }

    return options;
  }

  getFullDate(date: Date) {
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();
    return d+"/"+m+"/"+y;
  }

  getFullTime(date: Date) {
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    return hh+":"+mm+":"+ss;
  }
}
