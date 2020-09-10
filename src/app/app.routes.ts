import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ListsComponent } from './components/lists/lists.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';


// import { Name2Component } from './';
// import { Name3Component } from './';
// import { Name4Component } from './';
//import { PageNotFoundComponent } from './';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'list/:listName', component: ListComponent },
    { path: 'search/:word', component: SearchComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
    //{ path: '**', component: PageNotFoundComponent, redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class FeatureRoutingModule {}
