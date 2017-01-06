import { Api } from './api.class';

export class ChimicalPollution extends Api
{
  public lat: number;
  public long: number;
  public mapStyle: any;

  constructor()
  {
    super();
    this.typeApi = 'Chimical Pollution';
    this.typePollution= 'chimical';
  }

}
