import { Api } from './api.class';

export class GMAP extends Api
{
  public title: string;
  public lat: number;
  public lng: number;

  constructor()
  {
    super();
    this.type = "GMAP";
  }
}
