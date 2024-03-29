import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { HighlighCardSliderComponent } from './main/highligh-card-slider/highligh-card-slider.component';
import { FooterComponent } from './shared/footer/footer.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { BlogsComponent } from './main/blogs/blogs.component';
import { DonateComponent } from './main/donate/donate.component';
import { ContactComponent } from './main/contact/contact.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './store/app.routes';
import { ErrorComponent } from './main/error/error.component';
import { AuthComponent } from './main/auth/auth.component';
import { CreateBlogComponent } from './main/admin/create-blog/create-blog.component';
import { CampaignComponent } from './main/campaign/campaign.component';
import { UserComponent } from './main/user/user.component';
import { ProfileComponent } from './main/profile/profile.component';
import { GalleryUploadComponent } from './main/admin/gallery-upload/gallery-upload.component';
import { UserManagementComponent } from './main/admin/user-management/user-management.component';
import { ContactRequestsComponent } from './main/admin/contact-requests/contact-requests.component';
import { CreateCampaignComponent } from './main/admin/create-campaign/create-campaign.component';
import { UnderConstructionComponent } from './main/under-construction/under-construction.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { TeamComponent } from './main/team/team.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { TestimonialsComponent } from './main/testimonials/testimonials.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { FilePondModule } from 'ngx-filepond';
import filePondPlugins from './store/file-pond.plugin';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import * as  fromApp from './store/app.reducer';
import { DEFAULT_SWIPER_CONFIG } from './store/swiper.config';
import { AuthInterceptorService } from './services/auth.interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './main/auth/auth.effects';
import { GalleryEffects } from './main/gallery/gallery.effects';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BlogViewComponent } from './main/blogs/blog-view/blog-view.component';
import { MatSelectModule } from '@angular/material/select';
import { A11yModule } from '@angular/cdk/a11y';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OtpVerificationModule } from './main/auth/otp-verification/otp-verification.module';
import { ImageZoomerComponent } from './main/gallery/image-zoomer/image-zoomer.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CampaignEffects } from './main/campaign/campaign-effects';
import { MatGridListModule } from '@angular/material/grid-list';


filePondPlugins();

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
    BlogViewComponent,
    ImageZoomerComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(fromApp.appReducer),
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    EffectsModule.forRoot([AuthEffects, GalleryEffects, CampaignEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    HttpClientModule,
    QuillModule.forRoot({
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
    SwiperModule,
    FormsModule,
    SnotifyModule,
    FilePondModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    A11yModule,
    MatCardModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    OtpVerificationModule,
    MatBadgeModule,
    MatGridListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
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
