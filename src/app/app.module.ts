import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { HighlighCardSliderComponent } from './main/highligh-card-slider/highligh-card-slider.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { BlogsComponent } from './main/blogs/blogs.component';
import { DonateComponent } from './main/donate/donate.component';
import { ContactComponent } from './main/contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './main/error/error.component';
import { AuthComponent } from './main/auth/auth.component';
import { CreateBlogComponent } from './main/create-blog/create-blog.component';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { TeamComponent } from './main/team/team.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TestimonialsComponent } from './main/testimonials/testimonials.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'home', component: MainComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'donate', component: ContactComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'create', component: CreateBlogComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    HighlighCardSliderComponent,
    FooterComponent,
    GalleryComponent,
    BlogsComponent,
    DonateComponent,
    ContactComponent,
    ErrorComponent,
    AuthComponent,
    CreateBlogComponent,
    TeamComponent,
    TestimonialsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    HttpClientModule,
    QuillModule.forRoot(),
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Optional() @SkipSelf() parentModule: AppModule) {
    if (parentModule) {
      throw new Error(`AppModule is already loaded. Import it in the AppModule only.`);
    }
  }
}
