import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//From Custom Pipes
import { OrderBy } from "../pipes/orderBy";

//Google Chart => https://www.npmjs.com/package/angular2-google-chart
import { GoogleChart } from 'angular2-google-chart/directives/angular2-google-chart.directive';

// Google Map
import { CommonModule } from '@angular/common';
import { AgmCoreModule, SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

// Routing
import { AppRoutingModule } from './routing/app-routing.module';

// Component
import { AppComponent } from './app.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { HomeComponent } from '../pages//home/home.component';
import { PageAPIComponent } from '../pages/page-api/page-api.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { AboutComponent } from '../pages/about/about.component';
import { TermsComponent } from '../pages/terms/terms.component';
import { SitemapComponent } from '../pages/sitemap/sitemap.component';

//Providers
import { GeolocationService } from '../providers/geolocation/geolocation.service';

// Loading Slim => https://github.com/akserg/ng2-slim-loading-bar
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

@NgModule({
  declarations: [
    OrderBy,
    GoogleChart,
    AppComponent,
    MenuComponent,
    HomeComponent,
    PageAPIComponent,
    PageNotFoundComponent,
    FooterComponent,
    AboutComponent,
    TermsComponent,
    SitemapComponent
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
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot()
  ],
  providers: [GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
