import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../auth/auth.model';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../auth/auth.actions';
import { ProfileResponseData, ProfileService } from './profile.service';
import { Router } from '@angular/router';

interface Gender {
  value: string;
  viewValue: string;
}


@Component({
  moduleId: 'profile-page',
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  profileUser: ProfileResponseData = {
    name: 'Your Name Here',
    email: '',
    mobile: '',
    address: '',
    avatarImageUrl: 'https://storage.googleapis.com/dews_avatars/avatars/men.png',
    testimonial: '',
    gender: 'male',
    role: 'user',
  };

  selectedGender: string;

  genders: Gender[] = [
    { value: 'm', viewValue: 'Male' },
    { value: 'f', viewValue: 'Female' },
    { value: 'o', viewValue: 'Other' }
  ];

  isLoading = false;
  private userSub: Subscription;

  constructor(private toast: ToastServiceService, private router: Router, private profileService: ProfileService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
        this.fetchProfile(user.id);
      }
    });
  }

  fetchProfile(id: string) {
    this.profileService.getProfile(id).subscribe(resData => {
      Object.keys(resData.data).map((key) => {
        this.profileUser[key] = resData.data[key];
      });
      this.isLoading = false;
    }, error => {
      this.toast.toastError({ body: error.data, title: 'Please Try Again...' });
      if (error.status === 401) {
        this.store.dispatch(new AuthActions.Logout());
      }
      this.isLoading = false;
    });

  }

//   this.authService.signInByPassword(email, password).subscribe(resData => {
//   this.isLoading = false;
//   console.log(resData);
//   this.router.navigate(['/profile']);
// }, errorMessage => {
//   this.isLoading = false;
//   this.toast.toastError({ body: errorMessage, title: '' });
// });

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


  readURL(input) {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileUser.avatarImageUrl = (e.target.result as string);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  }


}
