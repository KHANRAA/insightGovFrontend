import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { MatDialog } from '@angular/material/dialog';
import * as CampaignActions from './campaign-actions';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { map } from 'rxjs/operators';
import { CampaignStruct } from '../admin/create-campaign/create-campaign-service';
import { CampaignResponseStruct } from './campaign-effects';


@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  isLoading = true;
  campaigns: CampaignResponseStruct[] = [];
  user: User;
  private userSub: Subscription;

  constructor(private toast: ToastServiceService, private router: Router, private store: Store<fromApp.AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCampaigns();
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
    this.store.select('campaigns').subscribe(campaignState => {
      if (campaignState.showError) {
        this.showError(campaignState.showError);
      }
      if (campaignState.showMessage) {
        this.showMessage(campaignState.showMessage);
      }
      this.campaigns = campaignState.campaigns;
    });
  }


  getCampaigns() {
    return this.store.dispatch(new CampaignActions.GetCampaigns());

  }

  showError(error) {
    this.toast.toastError({ body: error.body, title: error.title });
    return this.store.dispatch(new CampaignActions.ClearMessages());
  }


  showMessage(message) {
    this.toast.toastInfo({ body: message.body, title: message.title });
    return this.store.dispatch(new CampaignActions.ClearMessages());
  }


}
