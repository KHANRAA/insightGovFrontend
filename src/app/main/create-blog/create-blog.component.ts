import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateBlogComponent implements OnInit {


  constructor(private http: HttpClient) {
  }

  @ViewChild('postContent') postContent;
  @ViewChild('myPond') myPond: any;
  editorForm: FormGroup;
  formContent: any;

  pondOptions = {
    multiple: false,
    labelIdle: 'Upload an image....',
    acceptedFileTypes: 'image/jpeg, image/png, image/jpg'
  };
  pondFiles = [];

  editorStyle = {
    minHeight: '200px',
  };

  config = {
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

      [{ color: ['red'] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  // tslint:disable-next-line:typedef
  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  // tslint:disable-next-line:typedef
  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null)
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
