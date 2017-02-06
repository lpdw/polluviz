import { Api } from './api.class';

export class ChimicalPollution extends Api {
  public lat: number;
  public long: number;
  public mapStyle: any;

  constructor(websiteName?: string, token? : string) {
    super();
    this.websiteName = websiteName;
    this.typeApi = 'Chimical Pollution';
    this.typePollution= 'chimical';
    this.token = token;

    setTimeout(() => {
      this.lat = this.location.latitude;
      this.long = this.location.longitude;
    }, 1500);
  }

}
