import { GardenState } from './garden.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getGardenState = createFeatureSelector<GardenState>('gardens');
export const getGardens = createSelector(getGardenState, (state) =>
  !!state.gardens ? Object.values(state.gardens) : [],
);
export const getGardenById = (gardenId: string) =>
  createSelector(getGardenState, (state) => state.gardens?.[gardenId]);
