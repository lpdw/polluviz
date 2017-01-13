// From angular
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//From our project
import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { PageAPIComponent } from '../page-api/page-api.component';
import { AboutComponent } from '../about/about.component';
import { TermsComponent } from '../terms/terms.component';
import { SitemapComponent } from '../sitemap/sitemap.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes : Routes = [
  { path: '', component: HomeComponent, },
  { path: 'pageApi', component: PageAPIComponent},
  { path: 'about', component: AboutComponent},
  { path : 'terms', component: TermsComponent},
  { path : 'sitemap', component: SitemapComponent},
  { path: '**', component: PageNotFoundComponent }
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
