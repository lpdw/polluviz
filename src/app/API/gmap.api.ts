import { MapTypeStyle } from 'angular2-google-maps/esm/core';
import { Api } from './api.class';

export class GMAP extends Api
{
  public title: string;
  public lat: number;
  public lng: number;
  public MapTypeStyle: string;



  constructor()
  {
    super();
    this.type = "GMAP";
  }
} 
