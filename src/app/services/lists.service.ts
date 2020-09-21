import { Injectable } from '@angular/core';
import { ListsComponent } from '../components/lists/lists.component';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ListsService {

    constructor(private http: HttpClient){}
    private url = 'https://miralosmorserver.pythonanywhere.com/api/';

    // Recupero las listas solo de telegram
    getLists() {
      return this.http.get(`${ this.url }movielists-morvip`)
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
    getList(listName: string){
      listName = listName.replace(' ', '_');
      // Recupero la Lista clickeada por nombre
      return this.http.get(`${ this.url }movielists/${listName}`);
    }


    // GET a http://miralosmorserver.pythonanywhere.com/api/movieliststag/<tag>

    // Busqueda de lista con una palabra incluida en los tags de la misma
     searchList(word: string){
      return this.http.get(`${ this.url }movieliststag/${word}`).pipe(delay(1500));
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
}
