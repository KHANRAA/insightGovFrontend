import { Action } from '@ngrx/store';
import { GalleryImage, ToastInterface } from './gallery.reducer';
import { LOGIN } from '../auth/auth.actions';

export const GET_IMAGES = '[Gallery] Get Images';
export const ADD_IMAGES = '[Gallery] Add Images';
export const TOAST_MESSAGE = '[Gallery] Toast Message';
export const SUBMIT_OTP = '[Gallery] Submit Otp';
export const REVERSE_LOADING = '[Gallery] Reverse Loading';

export class GetImages implements Action {
  readonly type = GET_IMAGES;
}

export class AddImages implements Action {
  readonly type = ADD_IMAGES;

  constructor(public payload: { galleryImages: GalleryImage[] }) {}
}

export class SubmitOtp implements Action {
  readonly type = SUBMIT_OTP;

  constructor(public payload: { email: string, tempToken: string, otp: string }) {}
}

export class ToastMessage implements Action {
  readonly type = TOAST_MESSAGE;

  constructor(public payload: {
    type: string, body: string, title: string,
  }) {}
}


export class ReverseLoading implements Action {
  readonly type = REVERSE_LOADING;
}

export type GalleryActions =
  | GetImages
  | AddImages
  | ToastMessage
  | SubmitOtp
  | ReverseLoading;
