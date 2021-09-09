import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface ProfileResponseData {
  data?: any;
  email: string;
  name: string;
  role: string;
  avatarImageUrl: string;
  mobile: string;
  gender: string;
  testimonial: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}

  private static handleError(errResponse: HttpErrorResponse) {
    if (!errResponse.error || !errResponse.error.data) {
      return throwError({ status: 400, data: 'Unknown error occured...' });
    } else {
      return throwError(errResponse.error);
    }
  }

  getProfile(id: string) {
    return this.http.post<ProfileResponseData>('http://localhost:3000/api/auth/profile', {
      id
    }).pipe(catchError(ProfileService.handleError));


  }
}
