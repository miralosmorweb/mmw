import { Injectable } from '@angular/core';
import { ListsComponent } from '../components/lists/lists.component';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie, MovieDetail, MovieCast, ListModel } from '../shared/interfaces'

@Injectable({
    providedIn: 'root'
})
export class ListsService {

    constructor(private http: HttpClient){}
    private url = 'https://miralosmorserver.pythonanywhere.com/api/';
    private apiKey = '19d19425f792c26307b9a39737f86892';

    // Recupero las listas solo de telegram
    getLists(): Observable<ListModel[]> {
      return this.http.get<ListModel[]>(`${ this.url }movielists-morvip`)
        .pipe(
          map( this.createArray )
        );
    }

    getMMLists(): Observable<ListModel[]> {
      return this.http.get<ListModel[]>(`${ this.url }movielists-mm`)
        .pipe(
          map( this.createArray )
        );
    }

    // Creación del arreglo de listas recuperadas de la API
    private createArray( listsObj: object){
      const lists: ListModel[] = [];
      if (listsObj === null) { return []; }
      Object.keys( listsObj ).forEach( key => {
        const list: ListModel = listsObj[key];
        list.id = key;
        lists.push( list );
      });
      return lists;
    }

    // Get a una lista específica por el nombre de la misma con guiones bajos en lugar de espacios
    getList(listName: string): Observable<ListModel>{
      listName = listName.replace(' ', '_');
      // Recupero la Lista clickeada por nombre
      return this.http.get<ListModel>(`${ this.url }movielists/${listName}`);
    }

    // Get a tmdb para traer cada película por el id de imdb
    getMovie(imbdID: string): Observable<Movie> {
      return this.http.get<Movie>(`https://api.themoviedb.org/3/find/${imbdID}?api_key=${this.apiKey}&language=es-MX&external_source=imdb_id`);
    }

    getMovieDetail(id: string): Observable<MovieDetail>{
      return this.http.get<MovieDetail>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=es-MX&external_source=imdb_id`);
    }

    getCast(id:string) {
      return this.http.get<MovieCast>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}&language=es-MX&external_source=imdb_id`)
        .pipe( 
          map( resp => resp.cast ));
    }

    // GET a http://miralosmorserver.pythonanywhere.com/api/movieliststag/<tag>

    // Busqueda de lista con una palabra incluida en los tags de la misma
     searchList(word: string){
      return this.http.get(`${ this.url }movieliststag/${word}`).pipe(delay(1500));
     }

     addList(list: ListModel){
       return this.http.post(`${ this.url }movielists`, list);
     }

}
