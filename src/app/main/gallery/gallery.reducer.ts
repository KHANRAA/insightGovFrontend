import { GalleryImagee, ToastMessagee } from './gallery.model';
import * as GalleryActions from './gallery.action';

export interface GalleryImage {
  imageUrl: string;
  imageId: string;
  isLiked: boolean;
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
    case GalleryActions.INCREASE_LIKE:
      const imageData = JSON.parse(JSON.stringify(state.galleryImages));
      imageData.map(image => {
        if (image.imageId === action.payload.imageId) {
          image.isLiked = true;
          image.totalLikes = image.totalLikes + 1;
        }
      });
      return {
        ...state,
        galleryImages: imageData,
      };
    case GalleryActions.GET_IMAGES:
      return {
        ...state,
        isLoading: true,
      };
    case GalleryActions.ADD_LIKE:
      return {
        ...state,
      };
    case GalleryActions.CLEAR_MESSAGES:
      return {
        ...state,
        toastMessage: null,
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
