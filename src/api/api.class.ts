

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

    constructor() { }

    setOptions(options: any) { this.options = options }

    setData(data: any) { this.data = data; }
}
