import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ToastServiceService } from '../../../services/toast/toast-service.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../auth.actions';
import { DeleteOTP } from '../auth.actions';

interface OtpStruct {
  otp: string;
  tempToken: string;
  email: string;
  expiry: number;
}

@Component({
  moduleId: 'otp-module',
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent implements OnInit {
  otp = '';
  email = '';
  tempToken = '';
  expiry = null;

  constructor(public dialogRef: MatDialogRef<OtpVerificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OtpStruct, private toast: ToastServiceService, private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.email = this.data.email;
    this.tempToken = this.data.tempToken;
    this.store.select('auth').subscribe(authState => {
      if (authState.showSignInForm) {
        this.dialogRef.close();
      }
    });
    let startNum;
    let currentNum;

    function addClassDelayed(jqObj, c, to) {
      setTimeout(() => { jqObj.addClass(c); }, to);
    }

    function anim() {
      addClassDelayed($('#countdown'), 'puffer', 600);
      if (currentNum === 0) {
        currentNum = startNum - 1;
      } else {
        currentNum--;
      }
      $('#countdown').html(currentNum + 1);
      $('#countdown').removeClass('puffer');
    }

    $(() => {
      startNum = 300;
      currentNum = startNum;
      $('#countdown').html(currentNum); // init first time based on n
      self.setInterval(() => {anim(); }, 1325);
    });
  }

  submitOtp(otpValues: NgForm): void {
    // to-do
    console.log('Submitting otp ...');
    this.store.dispatch(new AuthActions.SubmitOtp({ email: this.email, otp: otpValues.value.otp, tempToken: this.tempToken }));
  }

  onCancel(): void {
    this.store.dispatch(new AuthActions.DeleteOTP({ tempToken: this.tempToken }));
    this.store.dispatch(new AuthActions.ShowSignInForm({ email: this.email }));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.store.dispatch(new AuthActions.DeleteOTP({ tempToken: this.tempToken }));
    this.store.dispatch(new AuthActions.ShowSignInForm({ email: this.email }));
    this.dialogRef.close();
  }

}
