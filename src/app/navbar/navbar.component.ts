import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../main/auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../main/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isAdmin = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        if (!!user && user.role === 'admin') {
          this.isAdmin = true;
        }
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

    // $(document).ready(() => {
    //   $('body.hero-anime').removeClass('hero-anime');
    // });
    $('body').on('mouseenter mouseleave', '.nav-item', (e) => {
      if ($(window).width() > 750) {
        const _d = $(e.target).closest('.¸');
        _d.addClass('show');
        setTimeout(() => {
          _d[$('_d:hover') ? 'addClass' : 'removeClass']('show');
        }, 1);
      }
    });
    // $('#switch').on('click', () => {
    //   if ($('body').hasClass('dark')) {
    //     $('body').removeClass('dark');
    //     $('#switch').removeClass('switched');
    //   } else {
    //     $('body').addClass('dark');
    //     $('#switch').addClass('switched');
    //   }
    // });
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
