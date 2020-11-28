import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const header = $('.start-style');
    $(window).scroll(() => {
      const scroll = $(window).scrollTop();

      if (scroll >= 10) {
        header.removeClass('start-style').addClass('scroll-on');
      } else {
        header.removeClass('scroll-on').addClass('start-style');
      }
    });

    $(document).ready(() => {
      $('body.hero-anime').removeClass('hero-anime');
    });
    $('body').on('mouseenter mouseleave', '.nav-item', (e) => {
      if ($(window).width() > 750) {
        const _d = $(e.target).closest('.nav-item');
        _d.addClass('show');
        setTimeout(() => {
          _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
        }, 1);
      }
    });
  }

}
