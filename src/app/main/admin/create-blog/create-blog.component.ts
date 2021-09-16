import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../auth/auth.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '../../auth/auth.model';
import { Router } from '@angular/router';
import 'quill-emoji/dist/quill-emoji.js';
import Quill from 'quill';
import { ToastServiceService } from '../../../services/toast/toast-service.service';
import { CreateBlogService, CreateBlogServiceResponseData } from './createBlogService';


const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = 'DIV';
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */, true);


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateBlogComponent implements OnInit {

  constructor(private http: HttpClient, private createBlogService: CreateBlogService, private router: Router, private store: Store<fromApp.AppState>, private toast: ToastServiceService) {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
  }

  private user: any;
  uploadIds: string[] = [];
  private isLoading = false;
  private focused = false;
  private blurred = false;
  private tempSavedId: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Array<string> = [];

  disableSubmitButton = false;
  private userSub: Subscription;

  @ViewChild('postContent') postContent;
  @ViewChild('myPond') myPond: any;
  editorForm: FormGroup;
  formContent: any;

  pondOptions = {
    multiple: false,
    server: {
      url: 'http://localhost:3000/api/blog/',
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
    maxFileSize: '20MB',
    allowImageFilter: true,
    acceptedFileTypes: 'image/jpeg, image/png, image/jpg'
  };
  pondFiles = [];

  editorStyle = {
    background: 'white',
  };

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

  ngOnInit(): void {

    this.editorForm = new FormGroup({
      editor: new FormControl(null)
    });
  }

  getUserToken() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
    return this.user.token;
  }

  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event);
  }

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

  createBlogForPost(editorFrom: NgForm) {
    this.isLoading = true;
    this.disableSubmitButton = true;
    const formData = editorFrom.value;
    if (!this.myPond.getFile()) {
      this.disableSubmitButton = false;
      return this.toast.toastError({ body: 'Please Upload a cover Image for Blog ', title: '' });
    }
    // const fileId = JSON.parse(this.myPond.getFile().serverId).id;
    this.createBlogService.addBlog(formData, this.tags, this.uploadIds).subscribe(resData => {
      this.isLoading = false;
      this.disableSubmitButton = false;
      this.toast.toastSuccess({ body: 'Successfully Created the blog ...', title: 'Success' });
      this.router.createUrlTree(['/blogs']);
    }, error => {
      this.isLoading = false;
      this.disableSubmitButton = false;
      this.toast.toastError({ body: error.data, title: 'Please Try Again...' });
      if (error.status && error.status === 401) {
        this.store.dispatch(new AuthActions.Logout());
      }
    });
  }


  // // tslint:disable-next-line:typedef
  // onMarkdownChange(markdown: string) {
  //   this.postContent = markdown;
  // }

  // // tslint:disable-next-line:typedef
  // createPostRequest(postData: NgForm) {
  //   console.log(postData.title);
  //   // console.warn(this.postContent);
  //   this.http.post('https://inside-ngo.firebaseio.com/posts.json', postData).subscribe(respData => {
  //     console.log(respData);
  //   });
  // }

}
