import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Blog, BlogsService, Comment } from '../blogs.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import * as AuthActions from '../../auth/auth.actions';
import { ToastServiceService } from '../../../services/toast/toast-service.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
})
export class BlogViewComponent implements OnInit {
  id: string;
  blog: Blog;
  showCommentBox: boolean;

  constructor(private toast: ToastServiceService, private route: ActivatedRoute, private store: Store<fromApp.AppState>, private blogService: BlogsService, private sanitize: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.blogService.getBlog(this.id).subscribe(() => {
        this.store.select('blogs').pipe(map(blogData => blogData.blog)).subscribe((blog: Blog) => {
          this.blog = blog;
          console.log(this.blog);
        });
      });
    });
    this.showCommentBox = true;
  }

  postComment(form: NgForm) {
    this.showCommentBox = false;
    if (!form.valid) {
      this.toast.toastError({ body: 'Comment is not valid ...', title: 'Comment Error ' });
      return;
    }
    const comment = form.value.commentBox;
    this.blogService.postComment(this.id, comment).subscribe((commentReturned: Comment) => {
      console.log(commentReturned);
      this.blog.comments.push(commentReturned);
    });
    form.reset();
    this.showCommentBox = true;
  }
  deleteComment(commentId){
    this.blogService.deleteComment(this.id, commentId).subscribe();
  }

  bypassHTML(html: string) {
    return this.sanitize.bypassSecurityTrustHtml(html);
  }

}
