import { StyleCompiler } from '@angular/compiler';
import { PairsObservable } from 'rxjs/observable/PairsObservable';
import { pairwise } from 'rxjs/operator/pairwise';
import { pairs } from 'rxjs/observable/pairs';
// take style for difernt api
export class StylesMap
{
public style: any = {};

  constructor()
  {   // there are different style
      this.style = 
          {
            air:
            [
                {"featureType":"all","elementType":"geometry","stylers":[{"color":"#fd9b54"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"color":"#e95b00"},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"lightness":"100"}]},{"featureType":"poi","elementType":"all","stylers":[{"lightness":"86"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"lightness":"-60"},{"visibility":"on"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":"89"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#fedcc3"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"46"},{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"simplified"},{"hue":"#ff2800"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"81"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"49"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"75"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"lightness":"-46"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"51"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#ff2200"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#fd9b54"},{"visibility":"on"}]}
            ],
            chimical:
            [
                {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"geometry.stroke","stylers":[{"lightness":"35"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#e6e6e6"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"weight":"2.16"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#ededed"},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"lightness":"-72"},{"color":"#888888"},{"weight":"0.33"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"weight":"0.81"},{"lightness":"22"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#e9eaea"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"gamma":"3.88"},{"lightness":"-28"},{"weight":"0.62"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"gamma":"2.82"},{"lightness":"-49"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"lightness":"-5"},{"gamma":"4.36"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"gamma":"0.23"},{"weight":"1.77"}]},{"featureType":"transit.station.airport","elementType":"geometry.stroke","stylers":[{"weight":"1.00"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"saturation":"-47"},{"lightness":"24"},{"weight":"1.48"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"saturation":"-30"}]}
            ],
          }

  } 
  // and the loop of colors used for api
  getStyle(typePollution: string){ 
      let style;
      switch(typePollution){
          case 'air': 
            style = this.style.air;
            break;
          case 'chimical':
            style = this.style.chimical;
            break;
      }
      return style;
  }
} 