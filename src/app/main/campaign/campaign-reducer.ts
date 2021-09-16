import { User } from '../auth/auth.model';
import * as CampaignActions from './campaign-actions';
import { CampaignStruct } from '../admin/create-campaign/create-campaign-service';
import { CampaignResponseStruct } from './campaign-effects';

export interface ToastStruct {
  body: string;
  title: string;
}

export interface State {
  campaigns: CampaignResponseStruct[];
  loading: boolean;
  showError: ToastStruct;
  showMessage: ToastStruct;

}

const initialState = {
  campaigns: [],
  loading: null,
  showError: null,
  showMessage: null,
};

export function campaignReducer(state = initialState, action: CampaignActions.CampaignActions) {
  switch (action.type) {
    case CampaignActions.CLEAR_MESSAGES:
      return {
        ...state,
        showError: null,
        loading: null,
        showMessage: null,
      };
    case CampaignActions.SHOW_ERROR:
      return {
        ...state,
        showError: action.payload,
        loading: null,
        showMessage: null,
      };
    case CampaignActions.SHOW_MESSAGE:
      return {
        ...state,
        showError: null,
        loading: null,
        showMessage: action.payload,
      };
    case CampaignActions.SET_CAMPAIGNS:
      console.log(action.payload);
      return {
        ...state,
        loading: null,
        campaigns: action.payload.campaigns
      };
    case CampaignActions.GET_CAMPAIGNS:
      return {
        ...state,
        loading: true,
        campaigns: null,
      };
    default:
      return { ...state };
  }
}
