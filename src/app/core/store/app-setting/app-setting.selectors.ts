import * as fromAppSetting from './app-setting.reducer';
import {createSelector} from '@ngrx/store';

export interface AppSettingState {
  appSetting: fromAppSetting.AppSettingState;
}

export const getAppSetting = (appSettingState: AppSettingState) => appSettingState.appSetting;
export const hydrated = createSelector(getAppSetting, (state) => state.hydrated!);
