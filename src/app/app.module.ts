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
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './main/error/error.component';
import { AuthComponent } from './main/auth/auth.component';
import { CreateBlogComponent } from './main/create-blog/create-blog.component';
import { CampaignComponent } from './main/campaign/campaign.component';
import { UserComponent } from './main/user/user.component';
import { ProfileComponent } from './main/profile/profile.component';
import { GalleryUploadComponent } from './main/admin/gallery-upload/gallery-upload.component';
import { UserManagementComponent } from './main/admin/user-management/user-management.component';
import { ContactRequestsComponent } from './main/admin/contact-requests/contact-requests.component';
import { CreateCampaignComponent } from './main/admin/create-campaign/create-campaign.component';
import { UnderConstructionComponent } from './main/under-construction/under-construction.component';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { TeamComponent } from './main/team/team.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TestimonialsComponent } from './main/testimonials/testimonials.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation
);

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
  { path: 'campaign', component: CampaignComponent },
  { path: 'create/blog', component: CreateBlogComponent },
  { path: 'upload/gallery', component: GalleryUploadComponent },
  { path: 'requests/contact', component: UnderConstructionComponent },
  { path: 'view/users', component: UnderConstructionComponent },
  { path: 'create/campaign', component: UnderConstructionComponent },
  { path: 'profile', component: UnderConstructionComponent },
  { path: 'error', component: ErrorComponent },
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
    LoadingSpinnerComponent,
    CampaignComponent,
    UserComponent,
    GalleryUploadComponent,
    UserManagementComponent,
    ContactRequestsComponent,
    ProfileComponent,
    CreateCampaignComponent,
    UnderConstructionComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    QuillModule.forRoot(),
    SwiperModule,
    FormsModule,
    SnotifyModule,
    FilePondModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
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
