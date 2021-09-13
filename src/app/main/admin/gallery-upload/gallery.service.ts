import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastServiceService } from '../../../services/toast/toast-service.service';


interface SubmitImageResultStruct {
  status: number;
  data: { type: string, message: string };
}


@Injectable({ providedIn: 'root' })
export class GalleryService {
  constructor(private http: HttpClient, private toast: ToastServiceService) {}

  submitImages(ids: string[], tags: string[]) {
    return this.http.post<SubmitImageResultStruct>('http://localhost:3000/api/gallery/uploadAll', {
      ids,
      tags,
    }).pipe(map(() => {
      return;
    }), catchError(errResponse => {
      if (!errResponse.error || !errResponse.error.data) {
        return throwError({ status: 400, data: 'Unknown error occured...' });
      } else {
        return throwError(errResponse.error);
      }
    }));


  }
}
