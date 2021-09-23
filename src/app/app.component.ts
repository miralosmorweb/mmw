import { Component } from '@angular/core';
import { ListsService } from './services/lists.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
