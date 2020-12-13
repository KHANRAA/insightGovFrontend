import { Component, OnInit } from '@angular/core';
import { BlogModel } from './blog.model';
import { BlogsService, Blogs, Author, Blog } from './blogs.service';
import { User } from '../auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { CreateBlogService } from '../admin/create-blog/createBlogService';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import * as AuthActions from '../auth/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  private user: User;
  private isLoading = false;
  blogs: Array<Blog> = [];

  constructor(private blogService: BlogsService,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private _snackBar: MatSnackBar,
              private toast: ToastServiceService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(() => {
      this.store.select('blogs').pipe(map(blogData => blogData.blogs)).subscribe((blogs: Array<Blog>) => {
        this.blogs = blogs;
      });
    });

    this.isLoading = false;

  }

  openSnackBar() {
    this._snackBar.open('Please Log in to perform this action', 'Log In', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}

