import { Component, OnInit } from '@angular/core';
import Parallax from 'parallax-js';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.css']
})
export class UnderConstructionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    new Parallax(document.getElementById('scene'));
  }

}
