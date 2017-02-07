export class Api {
    public typeApi: string;
    public server: string;
    public api: string;
    public serverWithApiUrl: string;
    public websiteName: string;
    public typePollution: string;
    public token: string;

    public data:any = {};
    public options: any = {};

    public latitude: string;
    public longitude: string;

    constructor() {
      this.typeApi = '';
      this.server = '';
      this.api = '';
      this.serverWithApiUrl = '';
      this.websiteName = '';
      this.typePollution = '';
      this.token = '';
      this.latitude = '';
      this.longitude = '';
    }

    setOptions(options: any) { this.options = options }

    setData(data: any) { this.data = data; }
}
