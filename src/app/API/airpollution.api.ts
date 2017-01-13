import { Api } from './api.class';

export class AirPollution extends Api
{
  public lat: number;
  public long: number;
  public mapStyle: any;

  //le token est optionnel
  constructor(websiteName?: string, token? : string) {
    super();
    this.websiteName = websiteName;
    this.typeApi = "Air pollution";
    this.typePollution = 'air';
    this.token = token;
  }
}
