import { createAction, props } from '@ngrx/store';
import { Garden } from '@app/domain/garden';

export enum GardenActionTypes {
  AddGarden = '[Garden] Add a new Garden',
  UpdateGarden = '[Garden] Update an existing Garden',
  RemoveGarden = '[Garden] Remove an existing Garden',
  ResetGardens = '[Garden] Reset the Garden state',
}

export const addGarden = createAction(
  GardenActionTypes.AddGarden,
  props<{ garden: Garden }>(),
);

export const updateGarden = createAction(
  GardenActionTypes.UpdateGarden,
  props<{ garden: Garden }>(),
);

export const removeGarden = createAction(
  GardenActionTypes.RemoveGarden,
  props<{ garden: Garden }>(),
);

export const resetGardens = createAction(GardenActionTypes.ResetGardens);
