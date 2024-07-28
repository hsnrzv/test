import { createAction, props } from '@ngrx/store';
import { State } from '@app/core/store/reducers';

export enum GlobalActionTypes {
  StartRestoreApplicationState = '[GlobalAction] Start Restoring',
  Hydrate = '[GlobalAction] Start Restoring - Hydrate',
  HydrationCompleted = '[GlobalAction] End Restoring - Hydration completed',
  Cleanup = '[GlobalAction] Start Cleanup outdated data after hydration',
}

export const startRehydration = createAction(GlobalActionTypes.StartRestoreApplicationState);

export const rehydrate = createAction(GlobalActionTypes.Hydrate, props<{ loadedState: State }>());

export const hydrationCompleted = createAction(GlobalActionTypes.HydrationCompleted);

export const cleanup = createAction(GlobalActionTypes.Cleanup);
