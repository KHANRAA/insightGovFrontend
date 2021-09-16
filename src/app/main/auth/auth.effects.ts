import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './auth.model';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { SubmitOtp } from './auth.actions';


interface AuthResponseData {
  data: any;
  _id: string;
  isActive: boolean;
  email: string;
  role: string;
  avatarImageUrl: string;
  dewsToken?: string;
  expiresIn?: string;
}

interface OtpSubmitResponseData {
  status: number;
  data: { type: string, message: string };
}

interface CheckEmailDataStructure {
  status: number;
  userExists: boolean;
  message: string;
}

interface CheckEmailResponseData {
  status: number;
  data: CheckEmailDataStructure;
}

interface ErrorResponseStruct {
  status: number;
  data: { message: string, type: string, tempToken: string };
}

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponseData>('http://localhost:3000/api/auth/register/password', {
        name: signupAction.payload.name,
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true,
      }).pipe(map(resData => {
        return new AuthActions.SignUp({
          email: resData.data.email,
        });
      }), catchError(errResponse => {
        return of(new AuthActions.LoginFail({ body: errResponse.error.message, title: 'Sign Up Error' }));
      }));
    }));


  @Effect()
  authSubmitOtp = this.actions$.pipe(ofType(AuthActions.SUBMIT_OTP),
    switchMap((otpData: AuthActions.SubmitOtp) => {
      return this.http.post<OtpSubmitResponseData>('http://localhost:3000/api/auth/validateOtp', {
        email: otpData.payload.email,
        tempToken: otpData.payload.tempToken,
        otp: otpData.payload.otp,
      }).pipe(map(resData => {
        console.log('called here ... success');
        this.store.dispatch(new AuthActions.AuthMessages({ body: resData.data.message, title: 'OTP Verified' }));
        console.log('called here ...after success');
        return new AuthActions.ShowSignInForm({ email: otpData.payload.email });
      }), catchError(errResponse => {
        const errorData: ErrorResponseStruct = errResponse.error;
        switch (errorData.data.type) {
          case 'wrong':
            return of(new AuthActions.AuthMessages({ body: errorData.data.message, title: 'Wrong OTP' }));
          case 'expired':
            return of(new AuthActions.LoginFail({ body: errorData.data.message, title: 'OTP Expired' }));
          case 'notFound':
            return of(new AuthActions.LoginFail({ body: errorData.data.message, title: 'OTP Expired' }));
          default:
            return of(new AuthActions.LoginFail({ body: errorData.data.message, title: 'Error' }));
        }
      }));
    }));


  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>('http://localhost:3000/api/auth/login', {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true,
      }).pipe(tap(resData => {
        this.authService.setLogoutTimer(+resData.data.expiresIn);
      }), map(resData => {
        const expirationDate = new Date(new Date().getTime() + +resData.data.expiresIn);
        const user = new User(resData.data.email, resData.data.id, resData.data.role, resData.data.dewsToken, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        return new AuthActions.Login({
          email: resData.data.email,
          id: resData.data.id,
          role: resData.data.role,
          dewsToken: resData.data.dewsToken,
          expirationDate
        });
      }), catchError((errResponse) => {
        const errorData: ErrorResponseStruct = errResponse.error;
        console.log(errorData);
        switch (errorData.data.type) {
          case 'signup':
            this.store.dispatch(new AuthActions.AuthMessages({ body: errorData.data.message, title: 'New User' }));
            return of(new AuthActions.ShowSignUpForm({ email: authData.payload.email }));
          case 'spam':
            this.store.dispatch(new AuthActions.LoginFail({ body: errorData.data.message, title: 'Spam' }));
            return of(new AuthActions.ShowSignInForm({ email: authData.payload.email }));
          case 'active':
            this.store.dispatch(new AuthActions.AuthMessages({ body: errorData.data.message, title: 'Verify Email' }));
            return of(new AuthActions.ShowOtpInput({ email: authData.payload.email, tempToken: errorData.data.tempToken }));

        }
        return of(new AuthActions.LoginFail({ body: errorData.data.message, title: 'Log In Error' }));
      }));
    }),
  );

  @Effect()
  checkEmail = this.actions$.pipe(
    ofType(AuthActions.CHECK_EMAIL),
    switchMap((checkData: AuthActions.CheckEmail) => {
      return this.http.post<CheckEmailResponseData>('http://localhost:3000/api/auth/checkemail', {
        email: checkData.payload.email
      }).pipe(map(resData => {
        const userExists = resData.data.userExists;
        this.store.dispatch(new AuthActions.AuthMessages({ body: resData.data.message, title: '' }));
        if (userExists) {
          return new AuthActions.ShowSignInForm({
            email: checkData.payload.email
          });
        }
        return new AuthActions.ShowSignUpForm({ email: checkData.payload.email });
      }), catchError(errResponse => {
        return of(new AuthActions.ShowSignUpForm({ email: checkData.payload.email }));
      }));
    }),
  );


  @Effect()
  deleteOtp = this.actions$.pipe(
    ofType(AuthActions.DELETE_OTP),
    switchMap((deleteData: AuthActions.DeleteOTP) => {
      return this.http.delete<CheckEmailResponseData>(`http://localhost:3000/api/auth/deleteotp/${deleteData.payload.tempToken}`, {});
    }),
  );


  @Effect({ dispatch: false })
  redirectProfile = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(() => {
    // to-do change later
    this.router.navigate(['/campaign']);
  }));

  // @Effect({ dispatch: false })
  // redirectHome = this.actions$.pipe(ofType(AuthActions.LOGIN_REDIRECT), tap(() => {
  //   // to-do change later
  //   this.router.navigate(['/auth']);
  // }));

  @Effect()
  autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
    const userData: {
      email: string,
      id: string,
      role: string,
      _dewsToken: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return { type: 'DUMMY' };
    }
    const loadedUser: User = new User(userData.email, userData.id, userData.role, userData._dewsToken, new Date(userData._tokenExpirationDate));
    console.log(loadedUser);
    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log(expirationDuration);
      this.authService.setLogoutTimer(expirationDuration);
      // this.autoLogout(expirationDuration);
      const newUser = new AuthActions.Login({
        email: loadedUser.email,
        id: loadedUser.id,
        role: loadedUser.role,
        dewsToken: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      });
      console.warn(newUser);
      return new AuthActions.Login({
        email: loadedUser.email,
        id: loadedUser.id,
        role: loadedUser.role,
        dewsToken: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      });
      // this.user.next(loadedUser);
    }
    return { type: 'DUMMY' };
  }));

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
    localStorage.removeItem('userData');
    this.authService.clearLogoutTimer();
    this.router.navigate(['/home']);
  }));


  constructor(private actions$: Actions, private http: HttpClient, private router: Router,
              private authService: AuthService, private store: Store<fromApp.AppState>, private toast: ToastServiceService) {
  }
}
