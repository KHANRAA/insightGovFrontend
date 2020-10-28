import {Component, OnInit} from '@angular/core';
import {Swiper} from 'swiper';

@Component({
  selector: 'app-highligh-card-slider',
  templateUrl: './highligh-card-slider.component.html',
  styleUrls: ['./highligh-card-slider.component.scss', '/node_modules/swiper/swiper-bundle.min.css']
})
export class HighlighCardSliderComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    // tslint:disable-next-line:prefer-const
    let swiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false
      },
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true
      }
    });

  }

}
