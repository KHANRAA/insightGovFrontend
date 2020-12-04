import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './auth.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './auth.actions';

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

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(public http: HttpClient, private route: Router, private store: Store<fromApp.AppState>) {}

  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  signUpByPassword(name: string, email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:3000/api/auth/register/password', {
      name,
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(this.handleError));
  }

  signInByPassword(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:3000/api/auth/login', {
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(this.handleError), tap(resData => {
      console.log('resData :' + JSON.stringify(resData));
      this.handleAuthentication(resData.data.email, resData.data._id, resData.data.role, resData.data.dewsToken, +resData.data.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      role: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData.role, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.store.dispatch(new AuthActions.Login({
        email: loadedUser.email,
        id: loadedUser.id,
        role: loadedUser.role,
        dewsToken: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }));
      // this.user.next(loadedUser);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    // this.user.next(null);
    localStorage.removeItem('userData');
    this.route.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(email: string, userId: string, role: string, dewsToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(email, userId, role, dewsToken, expirationDate);
    // this.user.next(user);
    this.store.dispatch(new AuthActions.Login({
      email,
      id: userId,
      role,
      dewsToken,
      expirationDate
    }));
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errResponse: HttpErrorResponse) {
    if (!errResponse.error || !errResponse.error.data) {
      return throwError('Unknown error happened...');
    } else {
      return throwError(errResponse.error.data);
    }
  }
}
