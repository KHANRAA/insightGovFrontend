import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface CreateBlogServiceResponseData {
  data: any;
  id: string;
}


@Injectable({ providedIn: 'root' })
export class CreateBlogService {
  constructor(private http: HttpClient) {}

  private handleError = (errResponse: HttpErrorResponse) => {
    if (!errResponse.error || !errResponse.error.data) {
      return throwError({ status: 400, data: 'Unknown error occured...' });
    } else {
      return throwError(errResponse.error);
    }
  };

  addBlog(blogData: any, tags: Array<string>, coverRef: string) {
    console.log(blogData);
    return this.http.post<CreateBlogServiceResponseData>('http://localhost:3000/api/blog/add', {
      title: blogData.title,
      content: blogData.content,
      isHighlight: blogData.isHighlight,
      imageUrl: coverRef,
      tags,
    }).pipe(catchError(this.handleError));
  }
}
