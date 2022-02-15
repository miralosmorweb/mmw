import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { of, fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('searchText', { static: true }) searchText: ElementRef;

  isSearching: boolean;
  subscription: Subscription;
  text: string;

  constructor( 
    private router: Router,
    private searchService: SearchService
    ) { 
    this.isSearching = false;
   }

  ngOnInit(): void {  

    this.subscription = this.searchService.currentText.subscribe(text => this.text = text)
    fromEvent(this.searchText.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      ,filter( res => res.length > 2)
      ,debounceTime(1000)
      ,distinctUntilChanged()
    ).subscribe((text: string) => {
      console.log('text');
      console.log(text);
      
      if (!this.router.url.includes('search')) this.router.navigate(['/search']);
      
      this.searchService.changeText(text);

    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitText(text: string) {
    this.searchService.changeText(text);

  }

}
