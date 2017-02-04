// From angular
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//From our project
import { MenuComponent } from '../../pages/menu/menu.component';
import { HomeComponent } from '../../pages/home/home.component';
import { PageAPIComponent } from '../../pages/page-api/page-api.component';
import { AboutComponent } from '../../pages/about/about.component';
import { TermsComponent } from '../../pages/terms/terms.component';
import { SitemapComponent } from '../../pages/sitemap/sitemap.component';
import { PageNotFoundComponent } from '../../pages/page-not-found/page-not-found.component';

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
