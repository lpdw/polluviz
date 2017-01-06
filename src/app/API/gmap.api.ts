import { MapTypeStyle } from 'angular2-google-maps/esm/core';
import { Api } from './api.class';



export class Gmap extends Api
{
  public title: string;
  public lat: number;
  public lng: number;
  public myStyleMap: any = [];
  public circleColor: string;
  public circleRadius: number;


 
  constructor()
  {
    super();

  }
} 
