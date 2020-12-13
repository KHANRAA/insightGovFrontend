import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as BlogsActions from './store/blogs.actions';
import { Store } from '@ngrx/store';

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
  constructor(private http: HttpClient, private  store: Store<fromApp.AppState>) {}

  getBlogs() {
    return this.http.get<Array<Blog>>('http://localhost:3000/api/blog/blogs').pipe(tap(blogs => {
      console.warn(blogs);
      this.store.dispatch(new BlogsActions.GetBlogs(blogs));
    }));
  }

  private handleError = (errResponse: HttpErrorResponse) => {
    if (!errResponse.error || !errResponse.error.data) {
      return throwError({ status: 400, data: 'Unknown error occured...' });
    } else {
      return throwError(errResponse.error);
    }
  };

}
