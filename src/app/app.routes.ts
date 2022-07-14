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
import { LoginComponent } from './components/login/login.component';

import { AuthGuardService } from './services/auth-guard.service';
const ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuardService] },
    { path: 'lists', component: ListsComponent, canActivate: [AuthGuardService] },
    { path: 'list/:listName', component: ListComponent, canActivate: [AuthGuardService] },
    { path: 'movie/:id', component: MovieComponent, canActivate: [AuthGuardService] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuardService] },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuardService] },
    { path: 'oscalo', component: OscaloComponent, canActivate: [AuthGuardService] },
    { path: 'padlet', component: PadletComponent, canActivate: [AuthGuardService] },
    { path: 'beforeDeath', component: BeforeDeathComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
    // { path: '**', component: PageNotFoundComponent, redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash: true, relativeLinkResolution: 'legacy' });

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class FeatureRoutingModule {}
