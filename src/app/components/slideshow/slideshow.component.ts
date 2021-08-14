import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import SwiperCore, { EffectFade, Swiper } from 'swiper/core';
import { ListModel } from '../../services/lists.service';
import { Router } from '@angular/router';

SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() lists: ListModel[];

  public mySwiper: Swiper;

  constructor( private router: Router) { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 5000
    });
  }

  onSlideNext() {
    this.mySwiper.slideNext();
  }

  onSlidePrev() {
    this.mySwiper.slidePrev();
  }

  showList(listName: string) {
    this.router.navigate(['/list', listName]);
  }

  ngOnInit(): void {
  }

}
