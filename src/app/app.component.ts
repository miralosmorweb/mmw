import { Component } from '@angular/core';
import { ListsService } from './services/lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ListsService]
})
export class AppComponent {
  title = 'miralosmorweb';
  lists: any[] = [];

  constructor(protected _listsService: ListsService){  }

  ngOnInit(): void {
    this._listsService.getLists().subscribe( (data) => {
      this.lists = data['results'];
    },
    (error) => {
      console.error(error);
    }
    );
  }
}
