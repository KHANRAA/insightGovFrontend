import { User } from './auth.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
  message: string;
  showPasswordInput: boolean;
  showOtpInput: boolean;
  showSignUpForm: boolean;
  showSignInForm: boolean;
  email: string;
  tempToken: string;
}

const initialState = {
  user: null,
  email: null,
  authError: null,
  message: null,
  loading: false,
  showPasswordInput: false,
  showOtpInput: false,
  showSignUpForm: false,
  showSignInForm: false,
  tempToken: null,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(action.payload.email,
        action.payload.id,
        action.payload.role,
        action.payload.dewsToken,
        action.payload.expirationDate,
      );
      return {
        ...state,
        authError: null,
        message: null,
        user,
        email: action.payload.email,
        loading: null,
        tempToken: null,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        tempToken: null,
        email: null,
        showOtpInput: false,
        showSignUpForm: false,
        showSignInForm: true,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        showSignInForm: true,
        showSignUpForm: false,
        authError: action.payload,
        loading: null
      };
    case AuthActions.AUTH_MESSAGES:
      return {
        ...state,
        loading: null,
        message: action.payload,
        authError: null,
      };
    case AuthActions.LOGIN_REDIRECT:
      return {
        ...state,
        loading: null,
      };
    case AuthActions.SUBMIT_OTP:
      return {
        ...state,
        authError: null,
        otp: action.payload.otp,
        email: action.payload.email,
        tempToken: action.payload.tempToken,
        showSignInForm: false,
        showOtpInput: false,
        showSignUpForm: false,
      };
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        showSignInForm: false,
        loading: true
      };
    case AuthActions.CHECK_EMAIL:
      return {
        ...state,
        user: null,
        loading: null,
        showOtpInput: false,
        email: action.payload.email
      };
    case AuthActions.SIGNUP:
      return {
        ...state,
        user: null,
        authError: null,
        showOtpInput: false,
        message: null,
        loading: null,
      };

    case AuthActions.SHOW_OTP_INPUT:
      return {
        ...state,
        authError: null,
        message: null,
        loading: null,
        showOtpInput: true,
        email: action.payload.email,
        tempToken: action.payload.tempToken,
        otp: null,
        showSignUpForm: false,
        showSignInForm: false,
      };
    case AuthActions.SHOW_SIGN_UP_FORM:
      return {
        ...state,
        authError: null,
        message: null,
        loading: null,
        email: action.payload.email,
        showOtpInput: false,
        tempToken: null,
        otp: null,
        showSignUpForm: true,
        showSignInForm: false,
      };
    case AuthActions.SHOW_SIGN_IN_FORM:
      return {
        ...state,
        authError: null,
        message: null,
        loading: null,
        email: action.payload.email,
        showOtpInput: false,
        tempToken: null,
        otp: null,
        showSignUpForm: false,
        showSignInForm: true,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
        message: null,
        loading: null,
      };
    default:
      return { ...state };
  }
}
