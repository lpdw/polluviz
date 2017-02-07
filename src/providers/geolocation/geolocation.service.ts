// From Angular
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';

// From internal
import { Location } from './location.interface';

@Injectable()
export class GeolocationService {

  private _locationBehaviour: BehaviorSubject<any>;
  public locationObservable: Observable<any>;

  private _options: Object;

  constructor(private http: Http) {

    // default location is Paris
    let data = {
      latitude:  48.866667,
      longitude:  2.333333,
      address: 'Paris',
      postalCode: 75000,
      city: 'Paris',
      search: false // if is from a research
    }

    this._locationBehaviour = new BehaviorSubject(data);
    this.locationObservable = this._locationBehaviour.asObservable();

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
      // update lat & long from the browser location
      this._locationBehaviour.getValue().latitude = position.coords.latitude;
      this._locationBehaviour.getValue().longitude = position.coords.longitude;
      this._locationBehaviour.next(this._locationBehaviour.getValue());

      // call the google api to try to get infos from position
      this.callGoogleApi();
    }, error => {
      console.log(`ERROR(${error.code}): ${error.message}`);

      // call the google api to try to get default infos from Paris
      this.callGoogleApi();
    }, this._options);
  }

  searchingDataForCity(city: string) {
    // remove all data from the observable
    this._locationBehaviour.getValue().search = true;
    this._locationBehaviour.getValue().city = city;
    this._locationBehaviour.next(this._locationBehaviour.getValue());

    // and latitude & longitude from googleApi
    this.callGoogleApi();
    return this._locationBehaviour.getValue();
  }

  resetDefaultDataGeolocation() {
    this._locationBehaviour.getValue().latitude = 48.866667,
    this._locationBehaviour.getValue().longitude = 2.333333,
    this._locationBehaviour.getValue().address = 'Paris',
    this._locationBehaviour.getValue().postalCode = 75000,
    this._locationBehaviour.getValue().city = 'Paris',
    this._locationBehaviour.getValue().search = false // if is from a research
    this._locationBehaviour.next(this._locationBehaviour.getValue());
    this.setDefaultLocation();
  }

  callGoogleApi() {
    let link = '';
    if(this._locationBehaviour.getValue().search === true) {
      let city = this._locationBehaviour.getValue().city;
      link = 'http://maps.googleapis.com/maps/api/geocode/json?address='+ this._locationBehaviour.getValue().city + '&sensor=true';
    }
    else
      link = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + this._locationBehaviour.getValue().latitude + ','+ this._locationBehaviour.getValue().longitude + '&sensor=true';

    this.http.get(link).subscribe( response => {
      if(response.status == 200)
        this.getDataFromGoogleApi(response.json());
    }, error => {
      console.log('error from getting data from gmaps');
    });
  }

  getDataFromGoogleApi(data: any) {
    this._locationBehaviour.getValue().address = data.results[0].formatted_address;

    //if is a reseach city
    if(this._locationBehaviour.getValue().search === true) {
      this._locationBehaviour.getValue().latitude = data.results[0].geometry.location.lat;
      this._locationBehaviour.getValue().longitude = data.results[0].geometry.location.lng;
    }
    else {
      data.results[0].address_components.reduce((city, value) => {
       if (value.types[0] == "locality")
         this._locationBehaviour.getValue().city = value.long_name;
       if (value.types[0] == "postal_code")
            this._locationBehaviour.getValue().postalCode = value.long_name;
      }, '');

      // update value
      this._locationBehaviour.next(this._locationBehaviour.getValue());
    }
  }

  getData() {
    this.setDefaultLocation();
    return this._locationBehaviour.getValue();
  }

  getDataLocation(): Observable<any> {
    return this.locationObservable;
  }

}
