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


const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'list/:listName', component: ListComponent },
    { path: 'movie/:id', component: MovieComponent },
    { path: 'search/:word', component: SearchComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'oscalo', component: OscaloComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
    // { path: '**', component: PageNotFoundComponent, redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class FeatureRoutingModule {}
