import { Action, createReducer, on } from '@ngrx/store';
import { Garden } from '@app/domain/garden';
import {
  addGarden,
  removeGarden,
  resetGardens,
  updateGarden,
} from '@app/core/store/garden/garden.actions';

export interface GardenState {
  gardens?: { [key: string]: Garden };
}

export const initialGardenState: GardenState = {
  gardens: undefined,
};

const reducer = createReducer(
  initialGardenState,

  on(addGarden, (state, { garden: garden }) => {
    if (!garden?.id) {
      return state;
    }

    const cloneState = { ...state, gardens: { ...state.gardens } };
    cloneState.gardens[garden.id] = garden;

    return cloneState;
  }),

  on(updateGarden, (state, { garden: garden }) => {
    if (!garden?.id) {
      return state;
    }

    const id = garden.id;
    const cloneState = { ...state, gardens: { ...state.gardens } };

    cloneState.gardens[id] = garden;

    return cloneState;
  }),

  on(removeGarden, (state, { garden: garden }) => {
    if (!garden?.id) {
      return state;
    }

    const id = garden.id;
    const clonedState = { ...state, gardens: { ...state.gardens } };
    delete clonedState.gardens[id];

    return clonedState;
  }),

  on(resetGardens, () => initialGardenState),
);

export function gardenReducer(state: GardenState | undefined, action: Action) {
  return reducer(state, action);
}
