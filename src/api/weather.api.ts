import { Api } from './api.class';

export class Weather extends Api {

  constructor(websiteName?: string, token? : string) {
    super();
    this.websiteName = websiteName;
    this.typeApi = 'weather';
    this.token = token;
  }

}
