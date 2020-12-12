import { Component, OnInit } from '@angular/core';
import { BlogModel } from './blog.model';
import { BlogsService, Blogs, Author, Blog } from './blogs-service';
import { User } from '../auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { CreateBlogService } from '../admin/create-blog/createBlogService';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import * as AuthActions from '../auth/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  private user: User;
  private isLoading = false;
  // blogs: BlogModel[] = [
  //   new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
  //     Date.now().toString(), 30, 'Akash Khanra', true),
  //   new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
  //     Date.now().toString(), 30, 'Akash Khanra', true),
  //   new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
  //     Date.now().toString(), 30, 'Akash Khanra', true),
  //   new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
  //     Date.now().toString(), 30, 'Akash Khanra', true),
  //   new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
  //     Date.now().toString(), 30, 'Akash Khanra', true),
  //   new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
  //     Date.now().toString(), 30, 'Akash Khanra', true),
  //   new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
  //     Date.now().toString(), 30, 'Akash Khanra', true),
  // ];
  blogs: Array<Blog> = [];

  constructor(private blogService: BlogsService, private router: Router, private store: Store<fromApp.AppState>,
              private _snackBar: MatSnackBar, private toast: ToastServiceService) {
  }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(resData => {
      this.blogs = [...resData];
      this.isLoading = false;
    }, error => {
      this.toast.toastError({ body: error.data, title: 'Please Try Again...' });
      if (error.status === 401) {
        console.log('hi...');
        // this.store.dispatch(new AuthActions.Logout());
      }
    });
  }

  openSnackBar() {
    this._snackBar.open('Please Log in to perform this action', 'Log In', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}

