import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as CampaignActions from './campaign-actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ToastServiceService } from '../../services/toast/toast-service.service';
import { CampaignStruct } from '../admin/create-campaign/create-campaign-service';
import { GET_CAMPAIGNS } from './campaign-actions';
import * as AuthActions from '../auth/auth.actions';
import { User } from '../auth/auth.model';
import { BlogImage } from '../blogs/blogs.service';


// export interface CampaignsResultStruct {
//   status: number;
//   data: CampaignResponseStruct[];
// }

export interface CampaignResponseStruct {
  campaignId: string;
  isActive: boolean;
  volunteers: User[];
  title: string;
  daysLeft: number;
  campaignType: string;
  createdBy: User;
  images: BlogImage[];
  content: string;
  campaignDate: Date;
  goalAmount: number;
  createdAt: Date;
  tags?: string[];
}


interface ErrorResponseStruct {
  status: number;
  data: { message: string, type: string, tempToken: string };
}

@Injectable()
export class CampaignEffects {

  @Effect()
  getCampaigns = this.actions$.pipe(
    ofType(CampaignActions.GET_CAMPAIGNS),
    switchMap((checkData: CampaignActions.GetCampaigns) => {
      return this.http.get<CampaignResponseStruct[]>('http://localhost:3000/api/campaign/all', {}).pipe(map(campaignData => {
        console.warn(campaignData);
        return new CampaignActions.SetCampaigns({ campaigns: campaignData });
      }), catchError(errResponse => {
        return of(new CampaignActions.ShowError({ body: errResponse.error.message, title: 'Fetch Error..' }));
      }));
    }),
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>, private toast: ToastServiceService) {
  }
}
