import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateBlogServiceResponseData } from '../create-blog/createBlogService';
import { Injectable } from '@angular/core';

export interface CreateCampaignServiceResponseData {
  data: any;
  id: string;
}


@Injectable({ providedIn: 'root' })
export class CreateCampaignService {
  constructor(private http: HttpClient) {}

  private handleError = (errResponse: HttpErrorResponse) => {
    if (!errResponse.error || !errResponse.error.data) {
      return throwError({ status: 400, data: 'Unknown error occured...' });
    } else {
      return throwError(errResponse.error);
    }
  };

  addCampaign(campaignData: any, campaignType: string) {
    return this.http.post<CreateCampaignServiceResponseData>('http://localhost:3000/api/campaign/create', {
      title: campaignData.title,
      campaignType,
      content: campaignData.subheader,
      subheader: campaignData.subheader,
      goalAmount: campaignData.goalAmount,
      campaignDate: campaignData.campaignDate
    }).pipe(catchError(this.handleError));
  }
}
