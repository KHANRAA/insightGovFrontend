import { Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-highligh-card-slider',
  templateUrl: './highligh-card-slider.component.html',
  styleUrls: ['/node_modules/swiper/swiper-bundle.min.css', './highligh-card-slider.component.scss']
})
export class HighlighCardSliderComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    // tslint:disable-next-line:prefer-const
    let swiper = new Swiper('.blog-slider', {
      spaceBetween: 500,
      effect: 'fade',
      preloadImages: false,
      loop: true,
      mousewheel: {
        invert: false,
      },
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      }
    });

  }

}
