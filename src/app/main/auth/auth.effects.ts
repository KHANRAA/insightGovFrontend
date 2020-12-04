import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

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

export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>('http://localhost:3000/api/auth/login', {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true,
      }).pipe(catchError(error=>{
        // ...
        of();
      }),map(resData=>{
        of();
      }));
    }),

  );

  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
