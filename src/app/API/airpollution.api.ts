import { Api } from './api.class';

export class AirPollution extends Api
{
  public lat: string;
  public long: string;
  public key: string;
  public mapStyle: any;

  constructor()
  {
    super();
    this.typeApi = "Air pollution";
    this.typePollution = 'air';
    
  }
}
