import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastServiceService } from '../../services/toast/toast-service.service';

declare const FB: any;
declare const gapi: any;


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private clientId = '333391506365-4o6pf758o1qk9lmie299n0iiovvoescp.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
  ].join(' ');

  auth2: any;

  // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:typedef
  attachSignin(element: HTMLAnchorElement) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        // ...
        // tslint:disable-next-line:only-arrow-functions typedef
      }, function(error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private toast: ToastServiceService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions typedef
    ( window as any ).fbAsyncInit = function() {
      FB.init({
        appId: '351976062541258',
        cookie: true,
        xfbml: true,
        version: 'v8.0'
      });
      FB.AppEvents.logPageView();
    };

    // tslint:disable-next-line:only-arrow-functions typedef
    ( function(d, s, id) {
      // tslint:disable-next-line:one-variable-per-declaration prefer-const
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return; }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk') );

  }

  // tslint:disable-next-line:typedef
  googleLogin(element: HTMLAnchorElement) {
    this.googleInit(element);
  }

  // tslint:disable-next-line:typedef
  facebookLogin() {
    console.log('submit login to facebook');
    FB.login((response) => {
      if (response.authResponse) {
        console.warn(response);
        this.checkFbLoginState();
        // login success
        // login success code here
        // redirect to home page
      } else {
        console.log('User login failed');
      }
    });

  }


  // tslint:disable-next-line:typedef
  checkFbLoginState() {
    // tslint:disable-next-line:only-arrow-functions typedef
    FB.getLoginStatus(function(response) {
      // @ts-ignore
      console.warn(response);
    });
  }

  // tslint:disable-next-line:typedef
  signUp(form: NgForm) {
    console.warn(form.value);

  }

  // tslint:disable-next-line:typedef
  signIn(form: NgForm) {
    console.warn(form.value);

  }

  // tslint:disable-next-line:typedef
  signUpClicked() {
    this.toast.toastSuccess({ body: 'Hello there from success', title: '' });
    document.getElementById('container').classList.add('right-panel-active');
  }

  // tslint:disable-next-line:typedef
  signInClicked() {
    this.toast.toastError({ body: 'Hello there from error', title: '' });
    document.getElementById('container').classList.remove('right-panel-active');
  }
}
