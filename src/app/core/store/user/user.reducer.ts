import { signIn, signOut, signUp, updateProfile } from './user.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@app/domain/api-response/user-response.model';

export interface UserState {
  signedInUser?: User;
  registeredUsers?: User[];
}

export const initialUserState: UserState = {
  signedInUser: undefined,
  registeredUsers: [],
};

const reducer = createReducer(
  initialUserState,

  on(signIn, (state, { user: user }) => {
    if (!user) {
      return state;
    }
    return {
      ...state,
      signedInUser: user,
    };
  }),

  on(signUp, (state, { user: user }) => {
    if (!user) {
      return state;
    }
    let registeredUsers = state.registeredUsers;
    if (!registeredUsers?.length) {
      registeredUsers = [];
    }

    registeredUsers?.push(user);

    return {
      ...state,
      registeredUsers,
    };
  }),

  on(updateProfile, (state, { user: user }) => {
    if (!user) {
      return state;
    }
    let registeredUsers = state.registeredUsers;

    const updatedUsers = registeredUsers?.map((registeredUser) => {
      if (registeredUser.id === user.id) {
        return user;
      }
      return registeredUser;
    });

    return {
      ...state,
      registeredUsers: updatedUsers,
      signedInUser: user,
    };
  }),

  on(signOut, (state) => ({
    ...state,
    signedInUser: undefined,
  })),
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
