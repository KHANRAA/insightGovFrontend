import { GalleryImagee, ToastMessagee } from './gallery.model';
import * as GalleryActions from './gallery.action';

export interface GalleryImage {
  imageUrl: string;
  imageId: string;
  isActive: boolean;
  tags: string[];
  totalLikes: number;
}

export interface ToastInterface {
  type: string;
  body: string;
  title: string;
}

export interface State {
  galleryImages: GalleryImage[];
  isLoading: boolean;
  toastMessage: ToastMessagee;
}

const initialState = {
  galleryImages: [],
  isLoading: null,
  toastMessage: null,
};

export function galleryReducer(state = initialState, action: GalleryActions.GalleryActions) {
  switch (action.type) {
    case GalleryActions.TOAST_MESSAGE:
      return {
        ...state,
        isLoading: null,
        toastMessage: new ToastMessagee(action.payload.type, action.payload.body, action.payload.title)
      };
    case GalleryActions.ADD_IMAGES:
      return {
        ...state,
        galleryImages: action.payload.galleryImages,
        toastMessage: null,
      };
    case GalleryActions.GET_IMAGES:
      return {
        ...state,
        isLoading: true,
      };
    case GalleryActions.REVERSE_LOADING:
      return {
        ...state,
        isLoading: false,
        toastMessage: null
      };
    default:
      return { ...state };
  }
}
