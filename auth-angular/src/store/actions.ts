// user-token.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserTokenModel } from '../models';

export const setUserToken = createAction(
  '[User] Set Token',
  props<{ userToken: UserTokenModel }>()
);

export const clearUserToken = createAction('[User] Clear Token');
