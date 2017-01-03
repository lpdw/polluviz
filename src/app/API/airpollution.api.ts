import { Api } from './api.class';

export class AirPollution extends Api
{
  public lat: string;
  public long: string;
  public key: string;

  constructor()
  {
    super();
    this.type = "Air pollution";
  }
}
