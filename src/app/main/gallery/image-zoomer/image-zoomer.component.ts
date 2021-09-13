import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as AuthActions from '../../auth/auth.actions';


@Component({
  selector: 'app-image-zoomer',
  templateUrl: './image-zoomer.component.html',
  styleUrls: ['./image-zoomer.component.css']
})
export class ImageZoomerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImageZoomerComponent>, @Inject(MAT_DIALOG_DATA) public imageUrl: string) { }

  ngOnInit(): void {
  }


  onCancel(): void {

    this.dialogRef.close();
  }

}
