import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Author {
  name: string;
  id: string;
}

export interface Blog {
  blogId: string;
  title: string;
  likedBy: number;
  author: Author;
  isHighlight: boolean;
  imageUrl: string;
  createdAt: Date;
  tags?: Array<string>;
}

export interface Blogs {
  status?: number;
  data: Array<Blog>;

}

@Injectable({ providedIn: 'root' })
export class BlogsService {
  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<Array<Blog>>('http://localhost:3000/api/blog/blogs').pipe(catchError(this.handleError));
  }

  private handleError = (errResponse: HttpErrorResponse) => {
    if (!errResponse.error || !errResponse.error.data) {
      return throwError({ status: 400, data: 'Unknown error occured...' });
    } else {
      return throwError(errResponse.error);
    }
  };

}
