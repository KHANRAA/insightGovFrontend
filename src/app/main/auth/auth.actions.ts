import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const SEND_OTP = '[Auth] Send Otp';
export const OTP_SEND = '[Auth] Send Otp';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP = '[Auth] SignUp';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGOUT = '[Auth] Logout';

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

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {}
}

export class SendOtp implements Action {
  readonly type = SEND_OTP;

  constructor(public payload: { mobileNumber: string }) {}
}

export class OtpSend implements Action {
  readonly type = OTP_SEND;

  constructor(public payload: { status: boolean }) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: object) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
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

export type AuthActions = Login | Logout | SendOtp | OtpSend | LoginStart | LoginFail | SignUpStart | SignUp | AutoLogin | ClearError;
