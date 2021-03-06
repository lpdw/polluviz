import { MapTypeStyle } from 'angular2-google-maps/esm/core';
import { Api } from './api.class';

export class Gmap extends Api {
  public title: string;
  public myStyleMap: any = [];
  public circleColor: string;
  public circleRadius: number;
  public type: string;
  public data: any = [];
  public options: any;
  public zoom: number = 15;

  constructor() { super(); }

}
