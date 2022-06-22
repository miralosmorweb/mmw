import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ListsComponent } from './components/lists/lists.component';
import { ListComponent } from './components/list/list.component';
import { OscaloComponent } from './components/oscalo/oscalo.component';
import { SearchComponent } from './components/search/search.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MovieComponent } from './components/movie/movie.component';
import { PadletComponent } from './components/padlet/padlet.component';
import { BeforeDeathComponent } from './components/before-death/before-death.component';
import { ListsHiddenComponent } from './components/before-death/lists-hidden/lists-hidden.component';


const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'list/:listName', component: ListComponent },
    { path: 'movie/:id', component: MovieComponent },
    { path: 'search', component: SearchComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'oscalo', component: OscaloComponent },
    { path: 'padlet', component: PadletComponent },
    { path: 'beforeDeath', component: BeforeDeathComponent },
    // { path: 'beforeDeath/lists', component: ListsHiddenComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
    // { path: '**', component: PageNotFoundComponent, redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash: true, relativeLinkResolution: 'legacy' });

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class FeatureRoutingModule {}
