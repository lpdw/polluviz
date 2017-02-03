import { Api } from './api.class';

export class Weather extends Api {
  public lat: number;
  public long: number;

  constructor(websiteName?: string, token? : string) {
    super();
    this.websiteName = websiteName;
    this.typeApi = 'Weather';
    this.typePollution= 'none';
    this.token = token;
  }

}
