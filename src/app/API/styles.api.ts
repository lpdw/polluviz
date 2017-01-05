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
                {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"geometry","stylers":[{"visibility":"simplified"},{"hue":"#0085ff"},{"saturation":"-38"},{"lightness":"22"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"},{"saturation":"98"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ceebf7"},{"visibility":"on"}]}
            ],
            chimical:
            [
                {"featureType":"all","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"featureType":"landscape.natural","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#2ecc71"},{"lightness":-7}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#333739"},{"weight":0.3},{"lightness":10}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-18}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-34}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333739"}]}
            ],
          }

  } 
  // and the loop for administrate color in function of api
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