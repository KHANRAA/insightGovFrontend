import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateBlogServiceResponseData } from '../create-blog/createBlogService';
import { Injectable } from '@angular/core';
import { BlogImage } from '../../blogs/blogs.service';

export interface CreateCampaignServiceResponseData {
  data: any;
  id: string;
}

export interface CampaignStruct {
  _id?: string;
  title: string;
  campaignType: string;
  content: string;
  imageIds: any[];
  campaignDate: Date;
  goalAmount: number;
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

  addCampaign(campaignData: CampaignStruct) {
    if (!campaignData.goalAmount) {
      campaignData.goalAmount = 100;
    }
    return this.http.post<CreateCampaignServiceResponseData>('http://localhost:3000/api/campaign/create', {
      title: campaignData.title,
      campaignType: campaignData.campaignType,
      content: campaignData.content,
      imageIds: campaignData.imageIds,
      goalAmount: campaignData.goalAmount,
      campaignDate: campaignData.campaignDate
    }).pipe(catchError(this.handleError));
  }
}
