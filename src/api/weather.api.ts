import { Api } from './api.class';

export class Weather extends Api {
  public lat: number;
  public long: number;

  constructor(websiteName?: string, token? : string) {
    super();
    this.websiteName = websiteName;
    this.typeApi = 'weather';
    this.token = token;
    this.lat = this.location.latitude;
    this.long = this.location.longitude;
  }

}
