import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as BlogsActions from './store/blogs.actions';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth.actions';

export interface Author {
  name: string;
  id: string;
}

export interface Comment {
  _id: string;
  user: Author;
  comment: string;
  commentBy: any;
}

export interface BlogImage {
  imageUrl: string;
}

export interface Blog {
  blogId: string;
  title: string;
  subtitle: string;
  likedBy: number;
  author: Author;
  isHighlight: boolean;
  content?: string;
  images: BlogImage[];
  createdAt: Date;
  comments: Array<Comment>;
  tags?: Array<string>;
}

export interface Blogs {
  status?: number;
  data: Array<Blog>;

}

@Injectable({ providedIn: 'root' })
export class BlogsService {
  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {}

  getBlogs() {
    return this.http.get<Array<Blog>>('http://localhost:3000/api/blog/blogs').pipe(tap(blogs => {
      console.warn(blogs);
      this.store.dispatch(new BlogsActions.GetBlogs(blogs));
    }), catchError(errResponse => {
      if (!errResponse.error || !errResponse.error.data) {
        return of(new AuthActions.LoginFail({ body: 'Unknown Error Occured', title: 'Unknown Error' }));
      }
      return of(new AuthActions.LoginFail({ body: errResponse.error.data, title: 'Log In Error' }));
    }));
  }

  getBlog(id) {
    return this.http.get<Blog>(`http://localhost:3000/api/blog/${id}`, {}).pipe(tap(blog => {
      // console.log(blog);
      this.store.dispatch(new BlogsActions.GetBlog(blog[0]));
    }), catchError(errResponse => {
      if (!errResponse.error || !errResponse.error.data) {
        return of(new AuthActions.LoginFail({ body: 'Unknown Error Occured', title: 'Unknown Error' }));
      }
      return of(new AuthActions.LoginFail({ body: errResponse.error.data, title: 'Sign Up Error' }));
    }));
  }

  postComment(id, comment) {
    return this.http.put<Comment>('http://localhost:3000/api/blog/comment', {
      id, comment
    }).pipe(tap(commentObj => {
      // console.log(blog);
      this.store.dispatch(new BlogsActions.AddComment(commentObj));
    }), catchError(errResponse => {
      if (!errResponse.error || !errResponse.error.data) {
        return of(new AuthActions.LoginFail({ body: 'Unknown Error Occured', title: 'Unknown Error' }));
      }
      return of(new AuthActions.LoginFail({ body: errResponse.error.data, title: 'Sign Up Error' }));
    }));
  }

  deleteComment(blogId, commentId) {
    return this.http.post<Comment>('http://localhost:3000/api/blog/deleteComment', {
      blogId, commentId
    }).pipe(tap(commentObj => {
      // console.log(blog);
      this.store.dispatch(new BlogsActions.DeleteComment(commentObj));
    }), catchError(errResponse => {
      if (!errResponse.error || !errResponse.error.data) {
        return of(new AuthActions.LoginFail({ body: 'Unknown Error Occured', title: 'Unknown Error' }));
      }
      return of(new AuthActions.LoginFail({ body: errResponse.error.data, title: 'Sign Up Error' }));
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
