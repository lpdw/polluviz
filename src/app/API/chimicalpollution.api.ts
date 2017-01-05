import { Api } from './api.class';

export class ChimicalPollution extends Api
{
  public lat: string;
  public long: string;
  public mapStyle: any;

  constructor()
  {
    super();
    this.typeApi = 'Chimical Pollution';
    this.typePollution= 'chimical';
  }

}
