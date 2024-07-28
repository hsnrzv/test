import { UserState } from './user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const userFeatureState = createFeatureSelector<UserState>('user');

export const getRegisteredUsers = createSelector(
  userFeatureState,
  (state) => state.registeredUsers,
);
export const getSignedInUser = createSelector(
  userFeatureState,
  (state) => state.signedInUser,
);
