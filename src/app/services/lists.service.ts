import { Injectable } from '@angular/core';
import { ListsComponent } from '../components/lists/lists.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ListsService {

    constructor(private http: HttpClient){}

    private lists: ListModel[] = [];
    private list: ListModel;

    getLists() {
      return this.http.get('http://miralosmorserver.pythonanywhere.com/api/movielists')
        .pipe(
          map( this.createArray )
        );
    }

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

    getList(listName: string){
      listName = listName.replace(' ', '_');
      // Recupero la Lista clickeada por nombre
      return this.http.get(`http://miralosmorserver.pythonanywhere.com/api/movielists/${listName}`)
    }

     searchList( word: string){

       let listsArray:ListModel[]=[];
       word = word.toLowerCase();
       for (let list of this.lists){
         let name = list.words.toLowerCase();
         if (name.indexOf(word) >= 0) {
           listsArray.push(list);
         }
       }
       return listsArray;
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
// export interface Movies{
//   name: string;
//   url: string;
// }
// export interface List{
//     name: string;
//     description: string;
//     img: string;
//     by: string;
//     words: string;
//     movies: Movies[];
// }