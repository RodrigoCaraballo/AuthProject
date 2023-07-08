import { createReducer, on } from '@ngrx/store';
import { UserTokenModel } from '../models';
import { setUserToken, clearUserToken } from './actions';
import { AppState } from './app.state';
import { getAuthUser } from './helper';

export interface UserTokenState {
  userToken: UserTokenModel | null;
}

export const initialState: UserTokenState = {
  userToken: getAuthUser()
};

export const userTokenReducer = createReducer(
  initialState,
  on(setUserToken, (state, { userToken }) => ({ ...state, userToken: userToken })),
  on(clearUserToken, (state) => ({ ...state, userToken: null }))
);
