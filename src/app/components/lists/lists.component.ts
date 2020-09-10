import { Component, OnInit } from '@angular/core';
import { ListsService, ListModel } from '../../services/lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit {

  lists: ListModel[] = [];
  constructor(private _listsService: ListsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this._listsService.getLists()
      .subscribe( (resp) => this.lists = resp);
  }

  showList(idx:number){
    this.router.navigate(['/list', idx]);
  }
}
