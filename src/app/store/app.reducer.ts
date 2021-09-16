import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../main/auth/auth.reducer';
import * as fromBlogs from '../main/blogs/store/blogs.reducer';
import * as fromGallery from '../main/gallery/gallery.reducer';
import * as fromCampaign from '../main/campaign/campaign-reducer';

export interface AppState {
  auth: fromAuth.State;
  blogs: fromBlogs.State;
  galleryImages: fromGallery.State;
  campaigns: fromCampaign.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  blogs: fromBlogs.blogsReducer,
  galleryImages: fromGallery.galleryReducer,
  campaigns: fromCampaign.campaignReducer,

};
