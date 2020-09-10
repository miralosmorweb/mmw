import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService, ListModel } from '../../services/lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{

  list: ListModel = new ListModel();
  listName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private _listsService: ListsService) {
    // this.activatedRoute.params.subscribe( resp => {
    //   this.list = this._listsService.getList(resp['name']);
    // });
   }

   ngOnInit(){
     const listName = this.activatedRoute.snapshot.paramMap.get('listName');

     this._listsService.getList(listName).subscribe((resp: ListModel) =>{
       this.list = resp;
       this.listName = listName;
       console.log(this.list);
     });
    // this.activatedRoute.params.subscribe( params => {
    //   this.list = this._listsService.getList(params['listName']);
    // });
   }


}
