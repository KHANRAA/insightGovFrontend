import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { GalleryService } from '../admin/gallery-upload/gallery.service';
import * as GalleyActions from './gallery.action';
import { OtpVerificationComponent } from '../auth/otp-verification/otp-verification.component';
import { GalleryImagee, ToastMessagee } from './gallery.model';
import { GalleryImage } from './gallery.reducer';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ImageZoomerComponent } from './image-zoomer/image-zoomer.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  galleryImages: GalleryImage[] = [];
  isLoading = true;
  toastMessage: ToastMessagee = null;

  constructor(private store: Store<fromApp.AppState>, private toast: ToastServiceService, private galleryService: GalleryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getImages();
    this.store.select('galleryImages').subscribe(galleryState => {
      this.isLoading = galleryState.isLoading;
      this.toastMessage = galleryState.toastMessage;
      this.galleryImages = galleryState.galleryImages;
      if (this.toastMessage) {
        // this.toast(this.error);
      }
    });
  }


  openModal(imageUrl) {
    console.log('Indoe sacsasc....');
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
