import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as GalleryActions from './gallery.action';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { GalleryImage } from './gallery.reducer';
import * as AuthActions from '../auth/auth.actions';

// import { GalleryImage } from './gallery.reducer';


export interface ImageResultStruct {
  status: number;
  data: GalleryImage[];
}

export interface ImageResultDefaultStruct {
  status: number;
  data: { type: string, message: string };
}

interface ErrorResponseStruct {
  status: number;
  data: { message: string, type: string, tempToken: string };
}

@Injectable()
export class GalleryEffects {

  @Effect()
  getImages = this.actions$.pipe(
    ofType(GalleryActions.GET_IMAGES),
    switchMap((checkData: GalleryActions.GetImages) => {
      console.warn('here....');
      return this.http.get<ImageResultStruct>('http://localhost:3000/api/gallery/all', {}).pipe(map(resData => {
        return new GalleryActions.AddImages({ galleryImages: resData.data });
      }), catchError((errResponse) => {
        const errorData: ErrorResponseStruct = errResponse.error;
        return of(new GalleryActions.ToastMessage({ type: 'error', body: errorData.data.message, title: 'Image Fetch Error' }));
      }));
    }),
  );

  @Effect()
  addLike = this.actions$.pipe(
    ofType(GalleryActions.ADD_LIKE),
    switchMap((likeData: GalleryActions.AddLike) => {
      return this.http.post<ImageResultDefaultStruct>('http://localhost:3000/api/gallery/like', {
        imageId: likeData.payload.imageId
      }).pipe(map(() => {
        return new GalleryActions.IncreaseLike({ imageId: likeData.payload.imageId });
      }), catchError((errResponse) => {
        const errorData: ErrorResponseStruct = errResponse.error;
        return of(new GalleryActions.ToastMessage({ type: 'error', body: errorData.data.message, title: 'Image Fetch Error' }));
      }));
    }),
  );


  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>, private toast: ToastServiceService) {
  }
}
