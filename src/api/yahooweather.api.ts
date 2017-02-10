import { Api }  from './api.class';

//Yahoo weather use many parameters, but we only need a city param. Token isn't required.
export class YahooWeather extends Api {

  constructor(websiteName?: string){
    super();
    this.websiteName = websiteName;
    this.typeApi = 'Weathers';
  }
}
