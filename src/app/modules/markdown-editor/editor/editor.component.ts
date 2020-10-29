import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import * as SimpleMDE from 'simplemde';
import { MarkdownEditorOptions } from './editor.options';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
  @Input() markdown: any;
  @Output() markdownChange = new EventEmitter<string>();
  @ViewChild('simplemde') textarea: ElementRef;
  private simplemde: SimpleMDE;

  constructor(
    private editorOptions: MarkdownEditorOptions, // injected by ng; constructor injection
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.initializeEditor();
  }

  // tslint:disable-next-line:typedef
  initializeEditor() {
    // verify that the editor options are valid;
    if (typeof this.editorOptions !== 'object' || typeof this.editorOptions !== 'object') {
      throw new Error('The [MarkdownEditorOptions] is not an object.');
    }
    this.editorOptions.initialValue = this.markdown;
    this.simplemde = new SimpleMDE(this.editorOptions);
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    this.simplemde = null;
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    if (this.simplemde != null) {
      this.simplemde.codemirror.on('change', () => {
        this.markdownChange.emit(this.simplemde.value());
      });
    }
  }

}
