import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Swiper } from 'swiper';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Blog, BlogsService } from '../blogs/blogs.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-highligh-card-slider',
  templateUrl: './highligh-card-slider.component.html',
  styleUrls: ['/node_modules/swiper/swiper-bundle.min.css', './highligh-card-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HighlighCardSliderComponent implements OnInit {

  blogs: Array<Blog> = [];

  constructor(private store: Store<fromApp.AppState>, private blogService: BlogsService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(() => {
      this.store.select('blogs').pipe(map(blogData => blogData.blogs)).subscribe((blogs: Array<Blog>) => {
        blogs.map(blog => {
          if (blog.isHighlight) {
            this.blogs.push(blog);
          }
        });
      });
    });
    // tslint:disable-next-line:prefer-const
    let swiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      observer: true,
      observeParents: true,
      mousewheel: {
        invert: false,
      },
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      }
    });

  }

  bypassHtML(html: string) {
    const p = document.createElement('p');
    p.innerHTML = html;
    return this.sanitizer.bypassSecurityTrustHtml(p.textContent.substr(0, 150));
  }

}
