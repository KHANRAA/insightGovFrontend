import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../main/auth/auth.service';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(take(1), map(authState => {
      return authState.user;
    }), exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      }
      const modifiedRequest = req.clone({ setHeaders: { 'x-dews-token': user.token } });
      return next.handle(modifiedRequest);
    }));

  }
}
