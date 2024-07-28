import {createAction} from '@ngrx/store';

export enum AppSettingActionTypes {
  ResetIndexedDbState = '[AppSettings] Reset Indexdb State',
}

export const resetIndexedDbState = createAction(AppSettingActionTypes.ResetIndexedDbState);
