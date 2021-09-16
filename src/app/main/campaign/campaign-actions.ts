import { Action } from '@ngrx/store';
import { CampaignStruct } from '../admin/create-campaign/create-campaign-service';
import { CampaignResponseStruct } from './campaign-effects';

export const GET_CAMPAIGNS = '[Campaign] Get Campaigns';
export const SET_CAMPAIGNS = '[Campaign] Set Campaigns';
export const SHOW_ERROR = '[Campaign] Show Error';
export const SHOW_MESSAGE = '[Campaign] Show Message';
export const CLEAR_MESSAGES = '[Campaign] Clear Messages';


export class GetCampaigns implements Action {
  readonly type = GET_CAMPAIGNS;
}


export class ClearMessages implements Action {
  readonly type = CLEAR_MESSAGES;
}

export class SetCampaigns implements Action {
  readonly type = SET_CAMPAIGNS;

  constructor(public payload: { campaigns: CampaignResponseStruct[] }) {}
}


export class ShowError implements Action {
  readonly type = SHOW_ERROR;

  constructor(public payload: { body: string, title: string }) {}
}


export class ShowMessage implements Action {
  readonly type = SHOW_MESSAGE;

  constructor(public payload: { body: string, title: string }) {}
}

export type CampaignActions =
  | GetCampaigns
  | SetCampaigns
  | ShowMessage
  | ShowError
  | ClearMessages;
