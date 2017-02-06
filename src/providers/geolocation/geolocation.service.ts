// From Angular
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';

// From internal
import { Location } from './location.interface';

@Injectable()
export class GeolocationService implements Location {

  public latitude : number;
  public longitude : number;
  public address: string;
  public postalCode: number;
  public city: string;

  private _search: BehaviorSubject<Array<any>>;
  public searchObservable: Observable<Array<any>>;

  private _options: Object;

  constructor(private http: Http) {

    // initialize properties
    // default location is Paris
    this.latitude  =  48.866667;
    this.longitude  =  2.333333;
    this.address =  'Paris';
    this.postalCode =  75000;
    this.city =  'Paris';

    this._search = new BehaviorSubject(Array<any>());
    this.searchObservable = this._search.asObservable();

    // set default options for the Geolocation
    this._options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    // set the default location
    this.setDefaultLocation();
  }

  setDefaultLocation() {
    navigator.geolocation.getCurrentPosition( position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      // console.log('success gettings lat & lng');
      // call the google api to try to get infos (postcode,cityName...)
      this.callGoogleApi('latlng');
    }, error => {
      alert(`ERROR(${error.code}): ${error.message}`);

      // call the google api to try to get infos (postcode,cityName...)
      this.callGoogleApi('latlng');
    }, this._options);
  }

  searchingDataForCity(city: string) {
    // remove all data from the observable
    this.clearSearchData();

    // add the city
    this._search.getValue().push({city: city});
    this._search.next(this._search.getValue());
    // and latitude & longitude from googleApi
    this.callGoogleApi('address');
    return this._search.getValue();
  }

  clearSearchData() {
    if(this._search.getValue().length > 0) {
      while (this._search.getValue().length > 0) {
        for (let item of this._search.getValue())
          this._search.getValue().splice(item, 1);
      }
      this._search.next(this._search.getValue());
    }
  }

  callGoogleApi(parameter: string) {
    let link: string = '';

    if(parameter == 'address')
      link = 'http://maps.googleapis.com/maps/api/geocode/json?' + parameter +'='+ this._search.getValue()[0].city + '&sensor=true';
    else
      link = 'http://maps.googleapis.com/maps/api/geocode/json?' + parameter + '=' + this.latitude + ','+ this.longitude + '&sensor=true';

    this.http.get(link).subscribe( response => {
      if(response.status == 200)
        this.getDataFromGoogleApi(response.json(), parameter);
    }, error => {
      console.log('error from getting data from gmaps');
    });
  }

  getDataFromGoogleApi(data: any, parameter: string) {
    console.log(data.results[0]);
    this.address = data.results[0].formatted_address;

    //if is a reseach city
    if(parameter == 'address') {
      this._search.getValue().push({latitude: data.results[0].geometry.location.lat});
      this._search.getValue().push({longitude: data.results[0].geometry.location.lng});
      this._search.next(this._search.getValue());
    }
    else {
      data.results[0].address_components.reduce((city, value) => {
       if (value.types[0] == "locality")
         this.city = value.long_name;
       if (value.types[0] == "postal_code")
            this.postalCode = value.long_name;
      }, '');

      //set persistence of the location
      let infos = {
        latitude: this.latitude,
        longitude : this.longitude,
        address: this.address,
        postalCode: this.postalCode,
        city: this.city
      };
      window.localStorage.setItem('location', JSON.stringify(infos));
    }
  }

}
