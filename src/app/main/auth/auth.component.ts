import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  signUpClicked() {
    console.log('clicked');
    document.getElementById('container').classList.add('right-panel-active');
  }

  // tslint:disable-next-line:typedef
  signInClicked() {
    document.getElementById('container').classList.remove('right-panel-active');
  }
}
