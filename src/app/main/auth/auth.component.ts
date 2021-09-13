import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './auth.actions';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { data } from 'jquery';

declare const FB: any;
declare const gapi: any;

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: string = null;
  message: string = null;
  showPasswordInput = false;
  showOtpInput = false;
  showSignUpForm = false;
  showSignInForm = false;
  email = '';
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

  constructor(private toast: ToastServiceService, private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      this.message = authState.message;
      if (this.error) {
        this.showError(this.error);
      }
      if (this.message) {
        this.showMessage(this.message);
      }
      this.showOtpInput = authState.showOtpInput;
      this.showPasswordInput = authState.showSignInForm;
      this.email = authState.email;
      if (authState.showSignInForm) {
        this.signInClicked();
      }
      if (authState.showSignUpForm) {
        this.signUpClicked();
      }
      if (authState.showOtpInput) {
        console.warn('here...');
        this.dialog.open(OtpVerificationComponent, {
          disableClose: true,
          data: { email: authState.email, tempToken: authState.tempToken}
        });
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

  // signInByOtp(form: NgForm) {
  //   if (!form.valid) {
  //     return this.toast.toastError({ body: 'Mobile Number is not valid', title: 'Unknown Mobile Number' });
  //   }
  //   const mobileNumber: string = form.value.number.toString();
  //   if (mobileNumber.length < 10 || mobileNumber.length > 15) {
  //     return this.toast.toastError({ body: 'Mobile Number is not valid.', title: 'please recheck' });
  //   }
  //   this.store.dispatch(new AuthActions.SendOtp({ mobileNumber }));
  // }

  signUpByPassword(form: NgForm) {
    if (!form.valid) {
      this.toast.toastError({ body: 'Sign Up form is not valid ...', title: 'SignIn Error' });
      return;
    }
    const email = form.value.email;
    const name = form.value.name;
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

  checkEmail(emailValue) {
    // console.log(emailValue);
    let callEmailCheckApi = false;
    this.showPasswordInput = false;
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    (emailValue !== '' && !EMAIL_REGEXP.test(emailValue)) ? callEmailCheckApi = false : callEmailCheckApi = true;
    if (callEmailCheckApi && emailValue.length) {
      console.log('Calling email API...');
      this.store.dispatch(new AuthActions.CheckEmail({ email: emailValue }));
    }
  }


  showError(error) {
    this.toast.toastError({ body: error.body, title: error.title });
    this.store.dispatch(new AuthActions.ClearError());
  }

  showMessage(message) {
    this.toast.toastInfo({ body: message.body, title: message.title });
    this.store.dispatch(new AuthActions.ClearError());
  }

  signUpClicked() {
    document.getElementById('container').classList.add('right-panel-active');
  }

  openDialog() {
    this.dialog.open(OtpVerificationComponent, { disableClose: true, backdropClass: 'bdrop' });
  }

  signInClicked() {
    document.getElementById('container').classList.remove('right-panel-active');
  }

}

