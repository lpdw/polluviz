import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

//Google Chart => https://www.npmjs.com/package/angular2-google-chart
import { GoogleChart } from 'angular2-google-chart/directives/angular2-google-chart.directive';
// Google Map
import { CommonModule } from '@angular/common';
import { AgmCoreModule, SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { PageAPIComponent } from './page-api/page-api.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { TermsComponent } from './terms/terms.component';



@NgModule({
  declarations: [
    GoogleChart,
    AppComponent,
    MenuComponent,
    HomeComponent,
    PageAPIComponent,
    PageNotFoundComponent,
    FooterComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSqwfOb2E4Elg0kuyK_ZVVgEmfG2UDEMM'
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
