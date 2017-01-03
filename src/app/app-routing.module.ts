import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//all our component
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { PageAPIComponent } from './page-api/page-api.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes : Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'pageAPI', component: PageAPIComponent,
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
