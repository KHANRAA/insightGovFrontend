import { User } from './auth.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState = {
  user: null
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
        user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
