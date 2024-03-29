import { Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { BlogsComponent } from '../main/blogs/blogs.component';
import { BlogViewComponent } from '../main/blogs/blog-view/blog-view.component';
import { ContactComponent } from '../main/contact/contact.component';
import { GalleryComponent } from '../main/gallery/gallery.component';
import { AuthComponent } from '../main/auth/auth.component';
import { CampaignComponent } from '../main/campaign/campaign.component';
import { CreateBlogComponent } from '../main/admin/create-blog/create-blog.component';
import { GalleryUploadComponent } from '../main/admin/gallery-upload/gallery-upload.component';
import { UnderConstructionComponent } from '../main/under-construction/under-construction.component';
import { ErrorComponent } from '../main/error/error.component';
import { ProfileComponent } from '../main/profile/profile.component';
import { AuthGuard } from '../main/auth/auth.guard';
import { AdminGuard } from '../main/auth/admin.guard';
import { AuthenticateGuard } from '../main/auth/authenticate.guard';
import { CreateCampaignComponent } from '../main/admin/create-campaign/create-campaign.component';
import { UserManagementComponent } from '../main/admin/user-management/user-management.component';
import { OtpVerificationComponent } from '../main/auth/otp-verification/otp-verification.component';

export const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'home', component: MainComponent },
    {
      path: 'blogs', component: BlogsComponent
    },
    { path: 'blogs/:id', component: BlogViewComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'donate', component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'gallery', component: GalleryComponent },
    { path: 'auth', component: AuthComponent, canActivate: [AuthenticateGuard] },
    { path: 'campaign', component: CampaignComponent },
    { path: 'create/blog', component: CreateBlogComponent, canActivate: [AdminGuard] },
    { path: 'upload/gallery', component: GalleryUploadComponent, canActivate: [AdminGuard] },
    { path: 'requests/contact', component: UnderConstructionComponent, canActivate: [AdminGuard] },
    { path: 'view/users', component: UserManagementComponent, canActivate: [AdminGuard] },
    { path: 'create/campaign', component: CreateCampaignComponent, canActivate: [AdminGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'error', component: ErrorComponent },
    { path: 'verifyotp', component: OtpVerificationComponent },
  ]
;
