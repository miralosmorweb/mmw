import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { ListModel } from 'src/app/shared/interfaces';
import { ListsService } from '../../services/lists.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']

})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() searchTerm: string;

  searchedLists: ListModel[] = [];
  word: string;
  isLoading = false;
  unacceptedWords = ['marvel', 'capitan america', 'ironman', 'spiderman', 'superman', 'dc', 'green lantern', 'thanos', 'hulk',
                      'superheroe', 'suar', 'carnevale'];
  faretta = 'faretta';
  isFaretta = false;
  unaccepted = false;
  subscription: Subscription;

  constructor( private activatedRoute: ActivatedRoute,
               private _listsService: ListsService,
               private spinner: NgxSpinnerService,
               private searchService: SearchService) { }

  ngOnInit(): void {
    this.subscription = this.searchService.currentText.subscribe(text => {
      this.word = text;
      this.searchLists(this.word);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.searchService.changeText('');
  }

  searchLists(word) {
    this.isLoading = true;
    this.spinner.show();

    this._listsService.searchList(word).subscribe((resp: ListModel[]) => {
      this.isLoading = false;
      this.searchedLists = resp;
      this.word = word;
      this.spinner.hide();
    });
    if (this.faretta === word.toLowerCase()){
      this.isFaretta = true;
    }
    this.unacceptedWords.forEach(unacceptedWord => {
      if (unacceptedWord === word.toLowerCase()) {
        this.unaccepted = true;
      }
    });
  }

}
