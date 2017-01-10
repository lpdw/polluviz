import { Api } from './api.class';

export class AirPollution extends Api
{
  public lat: number;
  public long: number;
  public mapStyle: any;

  //le token est optionnel
  constructor(token? : string) {
    super();
    this.typeApi = "Air pollution";
    this.typePollution = 'air';
    this.token = token;
  }
}
