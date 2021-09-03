import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FormControl, NgForm } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import { default as _rollupMoment } from 'moment';
import { CreateCampaignService } from './create-campaign-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { ToastServiceService } from '../../../services/toast/toast-service.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import 'quill-emoji/dist/quill-emoji.js';
import Quill from 'quill';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Donation {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CreateCampaignComponent implements OnInit {
  date = new FormControl(moment());
  minDate: Date;
  maxDate: Date;
  private donationType: string;
  private userSub: Subscription;
  private user: any;
  private isLoading = false;
  private focused = false;
  private blurred = false;
  @ViewChild('myPond') myPond: any;

  constructor(private createCampaignSerice: CreateCampaignService, private router: Router, private store: Store<fromApp.AppState>, private toast: ToastServiceService) {
    const currentYear = new Date().getFullYear();
    const donations = [];
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
  }

  availableDonationTypes = [
    { name: 'Donation', id: 'donation' },
    { name: 'Free', id: 'free' }
  ];
  selectedDonation = this.availableDonationTypes[0].name;

  // selectCar(event: Event) {
  //   this.selectedCar = (event.target as HTMLSelectElement).value;
  // }


  editorStyle = {
    background: 'white',
  };

  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event);
  }

  config = {
    'emoji-toolbar': true,
    'emoji-textarea': true,
    'emoji-shortname': true,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
      [{ direction: 'rtl' }],                         // text direction

      [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['emoji'],

      ['clean'],                                         // remove formatting button

      ['link', 'image']                         // link and image, video
    ],
  };

  pondOptions = {
    multiple: false,
    server: {
      url: 'http://localhost:3000/api/campaign/',
      timeout: 20000,
      process: {
        url: 'upload',
        method: 'POST',
        headers: {
          'x-dews-token': this.getUserToken(),
        },
        onerror: (error) => this.toast.toastError({ body: error.data, title: 'Upload Error...' }),
        withCredentials: false,
      },
      revert: {
        url: 'upload',
        timeout: 7000,
        method: 'DELETE',
        headers: {
          'x-dews-token': this.getUserToken(),
          'Content-type': 'application/json'
        },
      },
    },
    allowFileSizeValidation: true,
    allowImageCrop: true,
    imageCropAspectRatio: '1:1',
    allowImagePreview: true,
    maxFileSize: '20MB',
    allowImageFilter: true,
    acceptedFileTypes: 'image/jpeg, image/png, image/jpg'
  };
  pondFiles = [];

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blurred = false;
  }

  blur($event) {
    console.log('blur', $event);
    this.focused = false;
    this.blurred = true;
  }

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  getUserToken() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
    return this.user.token;
  }

  createNewCampaign(campaignFrom: NgForm) {
    console.log(campaignFrom);
    return;
    this.createCampaignSerice.addCampaign(campaignFrom, this.selectedDonation,).subscribe(res => {
      console.warn(res.data);
    });
  }

  ngOnInit(): void {
  }

}
