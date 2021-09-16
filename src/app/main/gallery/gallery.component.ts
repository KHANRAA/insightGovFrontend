import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { GalleryService } from '../admin/gallery-upload/gallery.service';
import * as GalleyActions from './gallery.action';
import { ToastMessagee } from './gallery.model';
import { GalleryImage } from './gallery.reducer';
import { MatDialog } from '@angular/material/dialog';
import { ImageZoomerComponent } from './image-zoomer/image-zoomer.component';
import { map, take } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  galleryImages: GalleryImage[] = [];
  isLoading = true;
  toastMessage: ToastMessagee = null;
  private userSub: Subscription;
  user = null;

  constructor(private store: Store<fromApp.AppState>, private toast: ToastServiceService, private galleryService: GalleryService, public dialog: MatDialog) {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.getImages();
    this.store.select('galleryImages').subscribe(galleryState => {
      this.isLoading = galleryState.isLoading;
      this.toastMessage = galleryState.toastMessage;
      this.galleryImages = galleryState.galleryImages;
      if (this.toastMessage) {
        if (this.toastMessage.type === 'info') {
          this.toast.toastInfo({ body: this.toastMessage.body, title: this.toastMessage.title });
        }
        if (this.toastMessage.type === 'warn') {
          this.toast.toastWarn({ body: this.toastMessage.body, title: this.toastMessage.title });
        }
        if (this.toastMessage.type === 'error') {
          this.toast.toastError({ body: this.toastMessage.body, title: this.toastMessage.title });
        }
        this.store.dispatch(new GalleyActions.ClearMessage());
      }
    });
  }


  addLikes(value) {
    this.store.dispatch(new GalleyActions.AddLike({ imageId: value }));
  }

  openModal(imageUrl) {
    this.dialog.open(ImageZoomerComponent, {
      backdropClass: 'bdrop',
      autoFocus: false,
      maxHeight: '60vh',
      maxWidth: '80vw',
      data: imageUrl
    });
  }

  getImages() {
    console.log('add');
    return this.store.dispatch(new GalleyActions.GetImages());
  }

}
