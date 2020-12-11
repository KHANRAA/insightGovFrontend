import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private user: any;
  private focused = false;
  private blurred = false;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
  }

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
      timeout: 10000,
      process: {
        url: 'upload',
        method: 'POST',
        headers: {
          'x-dews-token': this.getUserToken(),
        },
        withCredentials: false,
      },
      revert: {
        url: '/upload',
        timeout: 7000,
        method: 'DELETE',
        headers: {
          'x-dews-token': this.getUserToken(),
          'Content-type': 'application/json'
        },
      },
    },
    labelIdle: 'Upload an image....',
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

      ['link', 'image', 'video']                         // link and image, video
    ],
  };

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
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blurred = true;
  }

  // tslint:disable-next-line:typedef
  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  // tslint:disable-next-line:typedef
  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  createBlogForPost(editorFrom: NgForm) {
    console.warn(editorFrom);
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
