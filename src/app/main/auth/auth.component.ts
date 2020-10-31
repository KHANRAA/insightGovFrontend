import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastServiceService } from '../../services/toast/toast-service.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private toast: ToastServiceService) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  signUp(form: NgForm) {
    console.warn(form.value);

  }

  // tslint:disable-next-line:typedef
  signIn(form: NgForm) {
    console.warn(form.value);

  }

  // tslint:disable-next-line:typedef
  signUpClicked() {
    console.log('clicked');
    this.toast.toastSuccess({ body: 'Hello there from success', title: '' });
    document.getElementById('container').classList.add('right-panel-active');
  }

  // tslint:disable-next-line:typedef
  signInClicked() {
    this.toast.toastError({ body: 'Hello there from error', title: '' });
    document.getElementById('container').classList.remove('right-panel-active');
  }
}
