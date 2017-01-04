import { Api } from './api.class';

export class ChimicalPollution extends Api
{
  public lat: string;
  public long: string;

  constructor()
  {
    super();
    this.type = 'Chimical Pollution';
  }

}
