import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const SUBMIT_OTP = '[Auth] Submit Otp';
export const OTP_VERIFIED = '[Auth] OTP VERIFIED';
export const CHECK_EMAIL = '[Auth] Check Email';
export const AUTH_MESSAGES = '[Auth] Auth Messages';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const DELETE_OTP = '[Auth] Delete OTP';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP = '[Auth] SignUp';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGOUT = '[Auth] Logout';
export const SHOW_OTP_INPUT = '[Auth] Show Otp Input';
export const SHOW_SIGN_UP_FORM = '[Auth] Show Sign Up form';
export const SHOW_SIGN_IN_FORM = '[Auth] Show Sign In form';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: {
    email: string,
    id: string,
    role: string;
    dewsToken: string,
    expirationDate: Date
  }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ShowOtpInput implements Action {
  readonly type = SHOW_OTP_INPUT;

  constructor(public payload: { tempToken: string, email: string }) {}
}

export class OtpVerified implements Action {
  readonly type = OTP_VERIFIED;

  constructor(public payload: { email: string }) {}
}

export class ShowSignUpForm implements Action {
  readonly type = SHOW_SIGN_UP_FORM;

  constructor(public payload: { email: string }) {}
}

export class ShowSignInForm implements Action {
  readonly type = SHOW_SIGN_IN_FORM;

  constructor(public payload: { email: string }) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {}
}


export class SubmitOtp implements Action {
  readonly type = SUBMIT_OTP;

  constructor(public payload: { email: string, tempToken: string, otp: string }) {}
}

export class CheckEmail implements Action {
  readonly type = CHECK_EMAIL;

  constructor(public payload: { email: string }) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}

export class DeleteOTP implements Action {
  readonly type = DELETE_OTP;

  constructor(public payload: { tempToken: string }) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: object) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class AuthMessages implements Action {
  readonly type = AUTH_MESSAGES;

  constructor(public payload: object) {}

}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { name: string, email: string, password: string }) {}
}

export class SignUp implements Action {
  readonly type = SIGNUP;

  constructor(public payload: { email: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  Login
  | Logout
  | SubmitOtp
  | DeleteOTP
  | CheckEmail
  | ShowOtpInput
  | ShowSignUpForm
  | ShowSignInForm
  | LoginStart
  | LoginRedirect
  | LoginFail
  | AuthMessages
  | SignUpStart
  | SignUp
  | AutoLogin
  | ClearError;
