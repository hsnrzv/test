import { createAction, props } from '@ngrx/store';
import { User } from '@app/domain/api-response/user-response.model';

export enum UserActionTypes {
  SignIn = '[User] Signing User in',
  SignUp = '[User] Signing User up',
  UpdateProfile = '[User] Updating User',
  SignOut = '[User] Signing User out',
}

export const signIn = createAction(
  UserActionTypes.SignIn,
  props<{ user: User }>(),
);
export const signUp = createAction(
  UserActionTypes.SignUp,
  props<{ user: User }>(),
);
export const updateProfile = createAction(
  UserActionTypes.UpdateProfile,
  props<{ user: User }>(),
);
export const signOut = createAction(UserActionTypes.SignOut);
