import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { MarkdownEditorOptions } from './editor/editor.options';


@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule
  ],
  exports: [EditorComponent]
})
export class MarkdownEditorModule {
  // tslint:disable-next-line:typedef
  static forRoot(config: MarkdownEditorOptions) {
    return {
      ngModule: MarkdownEditorModule,
      providers: [{provide: MarkdownEditorOptions, useValue: config}]
    };
  }
}
