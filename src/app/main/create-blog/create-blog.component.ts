import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  postContent: string;
  editorForm: FormGroup;

  editorStyle = {
    minHeight: '200px',
  };
   config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null)
    });
  }

  // tslint:disable-next-line:typedef
  onMarkdownChange(markdown: string) {
    this.postContent = markdown;
  }

  // tslint:disable-next-line:typedef
  createPost(data) {
    this.createPostRequest({ title: data.value, desc: this.postContent, author: 'Akash Khanra', time: Date.now().toString() });
  }

  // tslint:disable-next-line:typedef
  createPostRequest(postData: { title: string, desc: string, author: string, time: string, }) {
    console.log('Post Creating ...');
    this.http.post('https://inside-ngo.firebaseio.com/posts.json', postData).subscribe(respData => {
      console.log(respData);
    });
  }

}
