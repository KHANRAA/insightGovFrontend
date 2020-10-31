import { Injectable, Output } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private snotifyService: SnotifyService) { }


  // tslint:disable-next-line:typedef
  toastError(params: { body: string, title: string }) {
    this.snotifyService.error(params.body, params.title);
  }

  // tslint:disable-next-line:typedef
  toastSuccess(params: { body: string, title: string }) {
    this.snotifyService.success(params.body, params.title);
  }

  // tslint:disable-next-line:typedef
  toastWarn(params: { body: string, title: string }) {
    this.snotifyService.warning(params.body, params.title);
  }

  // tslint:disable-next-line:typedef
  toastInfo(params: { body: string, title: string }) {
    this.snotifyService.info(params.body, params.title);
  }
}
