import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { ToastServiceService } from '../../../services/toast/toast-service.service';
import { of, Subscription, throwError } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as AuthActions from '../../auth/auth.actions';
import { GalleryService } from '../gallery-upload/gallery.service';
import * as url from 'url';


@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryUploadComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, private toast: ToastServiceService, private galleryService: GalleryService) { }

  @ViewChild('myPond') myPond: any;

  uploadIds: string[] = [];
  selectable = false;
  tags: string[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;

  pondOptions = {
    multiple: true,
    server: {
      url: 'http://localhost:3000/api/gallery/',
      timeout: 20000,
      process: {
        url: 'upload',
        method: 'POST',
        headers: {
          'x-dews-token': this.getUserToken(),
        },
        onerror: (error) => this.toast.toastError({ body: error.data, title: 'Upload Error...' }),
        withCredentials: true,
        onload: (data) => {
          this.uploadIds.push(data);
          return data;
        },
      },
      revert: {
        url: 'upload',
        timeout: 7000,
        method: 'DELETE',
        headers: {
          'x-dews-token': this.getUserToken(),
        },
        withCredentials: true,
        onerror: (error) => this.toast.toastError({ body: error.data, title: 'Upload Error...' }),
        onload: (data) => {
          this.uploadIds = this.uploadIds.filter((item) => {
            return item !== data.id;
          });
        },
      },
    },
    allowFileSizeValidation: true,
    allowImageCrop: true,
    imageCropAspectRatio: '1:1',
    allowImagePreview: true,
    maxFileSize: '50MB',
    allowImageFilter: true,
    maxFiles: 5,
    acceptedFileTypes: 'image/jpeg, image/png, image/jpg'
  };
  pondFiles = [];
  private user: any;
  private userSub: Subscription;

  getUserToken() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
    return this.user.token;
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && (value || value.trim()).length > 2) {
      this.tags.push(value.trim());
    } else {
      if (value !== '') {
        this.toast.toastError({ body: 'Please add minimum 2 characters... ', title: 'Tag error' });
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  finalUploadImages() {
    console.log('clicked...');
    this.galleryService.submitImages(this.uploadIds, this.tags).subscribe(resData => {
      this.toast.toastSuccess({ body: 'Submitted... ', title: 'Uplaod Done ...' });
    }, error => {
      this.toast.toastError({ body: error.data.message, title: 'Something went wrong...' });
    });
  }

  // tslint:disable-next-line:one-variable-per-declaration
  // tslint:disable-next-line:typedef
  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  // tslint:disable-next-line:typedef
  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

}
