import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ListModel } from '../../services/lists.service';



@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html'
})
export class ListCardComponent implements OnInit {

  @Input() list: ListModel;
  @Input() index: number;

  @Output() selectedList: EventEmitter<number>;

  constructor(private router: Router) {
    this.selectedList = new EventEmitter();
  }

  ngOnInit(): void {
  }

  showList(listName: string){
    this.router.navigate(['/list', listName]);
    //this.selectedList.emit(this.index);
  }

}
