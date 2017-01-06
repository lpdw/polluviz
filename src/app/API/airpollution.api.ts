import { Api } from './api.class';

export class AirPollution extends Api
{
  public lat: number;
  public long: number;
  public key: string;
  public mapStyle: any;

  constructor()
  {
    super();
    this.typeApi = "Air pollution";
    this.typePollution = 'air';

  }
}
