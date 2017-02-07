import { Api } from './api.class';

export class ChimicalPollution extends Api {
  public mapStyle: any;

  constructor(websiteName?: string, token? : string) {
    super();
    this.websiteName = websiteName;
    this.typeApi = 'Chimical Pollution';
    this.typePollution= 'chimical';
    this.token = token;
  }

}
