import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { ListModel } from '../../services/lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() lists: ListModel[];

  public mySwiper: Swiper;

  constructor( private router: Router) { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
    loop: true,
    });
  }

  onSlideNext(){
    this.mySwiper.slideNext();
  }

  onSlidePrev(){
    this.mySwiper.slidePrev();
  }

  showList(listName: string){
    this.router.navigate(['/list', listName]);
    // this.selectedList.emit(this.index);
  }

  ngOnInit(): void {
  }

}
