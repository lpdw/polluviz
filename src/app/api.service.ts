import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions , URLSearchParams, Jsonp } from '@angular/http';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService
{
  private _listApi : Array<any> = [];

  constructor(private _http: Http, private _jsonp: Jsonp)
  {
    //we add all API that we need
    //CHEMICAL
    let type = "Air";
    let server = "http://api.waqi.info/";
    let api = "feed/shanghai/?token=demo";
    let serverWithApiUrl = server + api;
    let air = {type: type, server: server, api: api, serverWithApiUrl: serverWithApiUrl};
    this._listApi.push(air);
  }

  public getData(serverName: string): Observable<any>
  {
    let apiUrlToGet = "";
    for (let api of this._listApi) {
      if(api.server == serverName) {
        apiUrlToGet = api.serverWithApiUrl;
      }
    }
    console.log(serverName+" ==> "+apiUrlToGet);
    return this._http.get(apiUrlToGet).map(this.extractData).catch(this.handleError);

    //Wikipedia Search test
    // var search = new URLSearchParams()
    // search.set('action', 'opensearch');
    // search.set('search', term);
    // search.set('format', 'json');
    // return this._jsonp.get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
    //             .map((response: Response) => response.json()[1])
    //             .catch(this.handleError);
  }

  private extractData(response: Response)
  {
    let body = response.json();
    return body || {};
  }
  private handleError(error: any)
  {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
