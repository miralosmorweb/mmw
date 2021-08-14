import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListModel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public lists: ListModel[] = [];

  events = [
    {title: 'titulo 1'},
    {title: 'titulo 2'},
    {title: 'titulo 3'},
  ];

  constructor(
    private _listsService: ListsService,
    private spinner: NgxSpinnerService
    ) {
  }

  ngOnInit(){
    this.spinner.show();
    this._listsService.getLists()
      .subscribe( (resp) => {
        this.lists = resp;
        this.spinner.hide();
      });
  }
}

