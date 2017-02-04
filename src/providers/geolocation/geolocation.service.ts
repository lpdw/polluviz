// From Angular
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// From internal
import { Location } from './location.interface';

@Injectable()
export class GeolocationService implements Location {

  public latitude : number;
  public longitude : number;
  public address: string;
  public postalCode: number;
  public city: string;

  public searchCity: string;
  public searchResult: any = { };

  private _options: Object;

  constructor(private http: Http) {
    
    // initialize properties
    // default location is Paris
    this.latitude  =  48.866667;
    this.longitude  =  2.333333;
    this.address =  'Paris';
    this.postalCode =  75000;
    this.city =  'Paris';

    this.searchCity = '';
    this.searchResult = { latitude: 0, longitude: 0 };

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
      // alert('error gettings lat & lng');
      console.log(error.code);

      // call the google api to try to get infos (postcode,cityName...)
      this.callGoogleApi('latlng');
    }, this._options);
  }

  searchingDataForCity(city: string) {
    // history from all city research
    this.searchCity = city;
    this.callGoogleApi('address');
    return this.searchResult;
  }

  callGoogleApi(parameter: string) {
    let link: string = '';

    if(parameter == 'address')
      link = 'http://maps.googleapis.com/maps/api/geocode/json?' + parameter +'='+ this.searchCity + '&sensor=true';
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
    this.address = data.results[0].formatted_address;

    //if is a reseach city
    if(parameter == 'address') {
      this.searchResult.latitude = data.results[0].geometry.location.lat;
      this.searchResult.longitude = data.results[0].geometry.location.lng;
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
