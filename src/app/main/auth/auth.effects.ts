import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './auth.model';
import { AuthService } from './auth.service';


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
        if (!errResponse.error || !errResponse.error.data) {
          return of(new AuthActions.LoginFail({ body: 'Unknown Error Occured', title: 'Unknown Error' }));
        }
        return of(new AuthActions.LoginFail({ body: errResponse.error.data, title: 'Sign Up Error' }));
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
      }), catchError(errResponse => {
        if (!errResponse.error || !errResponse.error.data) {
          return of(new AuthActions.LoginFail({ body: 'Unknown Error Occured', title: 'Unknown Error' }));
        }
        return of(new AuthActions.LoginFail({ body: errResponse.error.data, title: 'Log In Error' }));
      }));
    }),
  );

  @Effect({ dispatch: false })
  redirectHome = this.actions$.pipe(ofType(AuthActions.LOGIN, AuthActions.SIGNUP), tap(() => {
    this.router.navigate(['/home']);
  }));


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
    this.router.createUrlTree(['/home']);
  }));


  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {
  }
}
