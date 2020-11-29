import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryUploadComponent implements OnInit {
  constructor() { }

  @ViewChild('myPond') myPond: any;

  function;

  pondOptions = {
    multiple: true,
    allowDrop: true,
    allowReorder: true,
    labelFileLoading: 'Wohoooo........',
    labelButtonProcessItem: 'Upload...',
    maxParallelUploads: 3,
    maxFiles: 10,
    labelIdle: 'Upload images...',
    acceptedFileTypes: 'image/jpeg, image/png, image/jpg'
  };
  pondFiles = [];

  ngOnInit(): void {
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
