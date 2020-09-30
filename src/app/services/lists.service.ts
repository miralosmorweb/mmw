import { Injectable } from '@angular/core';
import { ListsComponent } from '../components/lists/lists.component';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ListsService {

    constructor(private http: HttpClient){}
    private url = 'https://miralosmorserver.pythonanywhere.com/api/';

    // Recupero las listas solo de telegram
    getLists(): Observable<ListModel[]> {
      return this.http.get<ListModel[]>(`${ this.url }movielists-morvip`)
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
      return this.http.get<Movie>(`https://api.themoviedb.org/3/find/${imbdID}?api_key=19d19425f792c26307b9a39737f86892&language=es-MX&external_source=imdb_id`);
    }

    getMovieDetail(id: string): Observable<MovieDetail>{
      return this.http.get<MovieDetail>(`https://api.themoviedb.org/3/movie/${id}?api_key=19d19425f792c26307b9a39737f86892&language=es-MX&external_source=imdb_id`);
    }

    getCast(id:string) {
      return this.http.get<MovieCast>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=19d19425f792c26307b9a39737f86892&language=es-MX&external_source=imdb_id`)
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

export class ListModel {
  id: string;
  name: string;
  description: string;
  link: string;
  img: string;
  by: string;
  words: string;
  movies: Movies[];
}
export class Movies{
  id: number;
  name: string;
  year: string;
  link: string;
  words: string;
  cast: string;
  imdb_id: string;
  director: string
}

export interface Movie {
  movie_results:      MovieResult[];
  person_results:     any[];
  tv_results:         any[];
  tv_episode_results: any[];
  tv_season_results:  any[];
}

export interface MovieResult {
  id:                number;
  video:             boolean;
  vote_count:        number;
  vote_average:      number;
  title:             string;
  release_date:      Date;
  original_language: string;
  original_title:    string;
  genre_ids:         number[];
  backdrop_path:     string;
  adult:             boolean;
  overview:          string;
  poster_path:       string;
  popularity:        number;
}

export interface MovieDetail {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection: null;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  original_language:     string;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           string;
  production_companies:  ProductionCompany[];
  production_countries:  ProductionCountry[];
  release_date:          Date;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguage[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
}

export interface Genre {
  id:   number;
  name: string;
}

export interface ProductionCompany {
  id:             number;
  logo_path:      null | string;
  name:           string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name:       string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name:      string;
}


export interface MovieCast {
  id:   number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  cast_id:      number;
  character:    string;
  credit_id:    string;
  gender:       number;
  id:           number;
  name:         string;
  order:        number;
  profile_path: string;
}

export interface Crew {
  credit_id:    string;
  department:   Department;
  gender:       number;
  id:           number;
  job:          string;
  name:         string;
  profile_path: null | string;
}

export enum Department {
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Lighting = "Lighting",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}
