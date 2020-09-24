import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { toDate, parseISO, isToday, startOfDay } from 'date-fns';

const colors: any = {
    red: {
      primary: '#dc143c',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#0000ff',
      secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#ffff00',
        secondary: '#FDF1BA',
    },
  };

@Injectable({
    providedIn: 'root'
})

export class EventsService {

    constructor(private http: HttpClient){}

    private url = 'https://miralosmorserver.pythonanywhere.com/api/calendar/';

    getEvents() {
        return this.http.get(`${ this.url }all`)
            .pipe(
                map( this.createEventsArray )
            );
        }

    postEvent( event: CalendarEvent) {
        return this.http.post<any>(`${ this.url }newcite`, event);
    }

    createEventsArray( eventsObj: object) {
    const events: CalendarEvent[] = [];
    if (eventsObj === null) { return []; }
    Object.keys( eventsObj ).forEach( key => {
      const event: CalendarEvent = eventsObj[key];
      event.start = new Date(event.start);
      event.end = new Date(event.end);
      switch (event.citeClass){
          case 'Discord':
              event.color = colors.blue;
              break;
          case 'Otros':
              event.color = colors.red;
              break;
          case 'Lo Cumpleañito':
              event.color = colors.yellow;
              break;
      }
      event.actions = [];
      events.push( event );
    });
    return events;
   }

   deleteEvent(id: number){
       return this.http.delete( `${ this.url }calendar/delcite/${id}`);
   }

   editEvent(id: number, event: CalendarEvent){
    return this.http.put( `${ this.url }calendar/delcite/${id}`, event);
}

}
