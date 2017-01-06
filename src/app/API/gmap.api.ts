import { MapTypeStyle } from 'angular2-google-maps/esm/core';
import { Api } from './api.class';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

export class Gmap extends Api
{
  public title: string;
  public lat: number;
  public lng: number;
  public myStyleMap: any = [];

  constructor()
  {
    super();
  }
}
