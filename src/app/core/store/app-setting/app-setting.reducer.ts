import {Action, createReducer, on} from '@ngrx/store';
import {hydrationCompleted} from '@app/core/store/global.actions';

export interface AppSettingState {
  hydrated?: boolean;
}

export const initialAppSettingsState: AppSettingState = {
  hydrated: false,
};

const reducer = createReducer(
  initialAppSettingsState,
  on(hydrationCompleted, (state) => {
    return {
      ...state,
      hydrated: true,
    };
  }),
);

export function appSettingReducer(state: AppSettingState | undefined, action: Action) {
  return reducer(state, action);
}
