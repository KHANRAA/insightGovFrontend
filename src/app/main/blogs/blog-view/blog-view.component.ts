import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Blog, BlogsService } from '../blogs.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
})
export class BlogViewComponent implements OnInit {
  id: string;
  blog: Blog;

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>, private blogService: BlogsService, private sanitize: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.blogService.getBlog(this.id).subscribe(() => {
        this.store.select('blogs').pipe(map(blogData => blogData.blog)).subscribe((blog: Blog) => {
          console.log(this.blog);
          this.blog = blog;
        });
      });
    });
  }

  bypassHTML(html: string) {
    return this.sanitize.bypassSecurityTrustHtml(html);
  }

}
