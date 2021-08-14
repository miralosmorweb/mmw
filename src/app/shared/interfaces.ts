import { EventColor } from 'calendar-utils';
import { Department } from './enums';

export interface CalendarEvent<MetaType = any>{
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    discord: boolean;
    citeClass: string;
    description?: string;
    color?: EventColor;
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
};

export interface CalendarEventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent, }: {
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }): any;
};


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
