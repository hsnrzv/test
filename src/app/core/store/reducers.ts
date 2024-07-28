import * as fromAppSettings from '@app/core/store/app-setting/app-setting.reducer';
import * as fromUser from './user/user.reducer';
import * as fromGarden from './garden/garden.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  appSetting: fromAppSettings.AppSettingState;
  user: fromUser.UserState;
  gardens: fromGarden.GardenState;
}

export const reducers: ActionReducerMap<State> = {
  appSetting: fromAppSettings.appSettingReducer,
  user: fromUser.userReducer,
  gardens: fromGarden.gardenReducer,
};

// global state
export const getState = (state: State) => state;
