import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService, ListModel } from '../../services/lists.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',

})
export class SearchComponent implements OnInit {

  searchedLists: ListModel[] = [];
  word: string;
  isLoading = false;

  // checkArray(searchedLists: ListModel[]): boolean{
  //   if (searchedLists.length > 0){
  //     console.log(searchedLists.length);
  //     return true;
  //   }
  //   else { return false; }
  // }

  constructor( private activatedRoute: ActivatedRoute,
               private _listsService: ListsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // desde la activated route traigo el string que se ingresó en el buscador
    const word = this.activatedRoute.snapshot.paramMap.get('word');
    // Con un subscribe al servicio recupero el arreglo de listas con alguna coincidencia en los tags
    this._listsService.searchList(word).subscribe((resp: ListModel[]) => {
      this.isLoading = false;
      this.searchedLists = resp;
      this.word = word;
    });

  }

}
