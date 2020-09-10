import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../services/lists.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',

})
export class SearchComponent implements OnInit {

  lists:any[] = [];
  word:string;

  constructor( private activatedRoute: ActivatedRoute,
                private _listsService: ListsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.word = params['word'];
      this.lists = this._listsService.searchList(params['word']);
    });
  }

}
