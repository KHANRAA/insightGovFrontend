import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './auth.actions';

declare const FB: any;
declare const gapi: any;


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: string = null;

  private clientId = '333391506365-4o6pf758o1qk9lmie299n0iiovvoescp.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
  ].join(' ');

  auth2: any;

  googleInit(element: HTMLAnchorElement) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(element);
    });
  }

  attachSignin(element: HTMLAnchorElement) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        this.toast.toastSuccess({ body: 'Google Login Successful', title: '' });
        // ...
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private toast: ToastServiceService, private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showError(this.error);
      }
    });
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '351976062541258',
        cookie: true,
        xfbml: true,
        version: 'v8.0'
      });
      FB.AppEvents.logPageView();
    };

    // tslint:disable-next-line:only-arrow-functions typedef
    (function(d, s, id) {
      // tslint:disable-next-line:one-variable-per-declaration prefer-const
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  googleLogin(element: HTMLAnchorElement) {
    this.googleInit(element);
  }

  facebookLogin() {
    console.log('submit login to facebook');
    FB.login((response) => {
      if (response.authResponse) {
        console.warn(response);
        this.checkFbLoginState();
        this.toast.toastSuccess({ body: 'Facebook login success', title: '' });
        // login success
        // login success code here
        // redirect to home page
      } else {
        console.log('User login failed');
      }
    });

  }


  checkFbLoginState() {

    FB.getLoginStatus((response) => {
      // @ts-ignore
      console.warn(response);
    });
  }

  signInByPassword(form: NgForm) {
    if (!form.valid) {
      this.toast.toastError({ body: 'Sign In form is not valid ...', title: '' });
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    form.reset();
  }

  signUpByPassword(form: NgForm) {
    if (!form.valid) {
      this.toast.toastError({ body: 'Sign Up form is not valid ...', title: 'SignIn Error' });
      return;
    }
    const email = form.value.email;
    const name = form.value.password;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.SignUpStart({ name, email, password }));
    // this.authService.signUpByPassword(name, email, password).subscribe(resData => {
    //   this.isLoading = false;
    //   console.log(resData);
    // }, errorMessage => {
    //   this.isLoading = false;
    //   this.toast.toastError({ body: errorMessage, title: 'SignUp Error' });
    // });
    form.reset();
  }


  showError(error) {
    this.toast.toastError({ body: error.body, title: error.title });
    this.store.dispatch(new AuthActions.ClearError());
  }

  signUpClicked() {
    document.getElementById('container').classList.add('right-panel-active');
  }

  signInClicked() {
    document.getElementById('container').classList.remove('right-panel-active');
  }

}
