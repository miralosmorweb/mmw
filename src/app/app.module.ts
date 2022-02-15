import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es'

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'swiper/angular';
import { NgxSpinnerModule } from 'ngx-spinner';

//Rutas
import { APP_ROUTING, FeatureRoutingModule } from './app.routes';

//Servicios
import { ListsService } from './services/lists.service';
import { EventsService } from './services/events.service';
import { SearchService } from './services/search.service';
import { OscaloService } from './services/oscalo.service';

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ListsComponent } from './components/lists/lists.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { PosterPipe } from './pipes/poster.pipe';
import { MovieComponent } from './components/movie/movie.component';
import { CastSlideshowComponent } from './components/cast-slideshow/cast-slideshow.component';
import { OscaloComponent } from './components/oscalo/oscalo.component';
import { PadletComponent } from './components/padlet/padlet.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ScrollTopComponent } from './components/shared/scroll-top/scroll-top.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ListsComponent,
    ListComponent,
    SearchComponent,
    OscaloComponent,
    ListCardComponent,
    CalendarComponent,
    SlideshowComponent,
    MoviesGridComponent,
    PosterPipe,
    MovieComponent,
    CastSlideshowComponent,
    PadletComponent,
    FooterComponent,
    ScrollTopComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    CommonModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxSpinnerModule
  ],
  exports: [
    CalendarComponent
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function flatpickrFactory() {
  flatpickr.localize(Spanish);
  flatpickr.defaultConfig.time_24hr = true;
  return flatpickr;
}