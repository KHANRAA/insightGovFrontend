import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from './main/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './main/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: any;

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  isLoading = false;

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }

}
