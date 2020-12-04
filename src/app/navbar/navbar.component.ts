import { Component, OnDestroy, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../main/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(take(1), map(authUser => authUser.user)).subscribe(user => {
      this.isAuthenticated = !!user;
    });
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
    $('#switch').on('click', () => {
      if ($('body').hasClass('dark')) {
        $('body').removeClass('dark');
        $('#switch').removeClass('switched');
      } else {
        $('body').addClass('dark');
        $('#switch').addClass('switched');
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
