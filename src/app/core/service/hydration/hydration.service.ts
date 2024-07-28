import { Injectable } from '@angular/core';
import { from, of, ReplaySubject } from 'rxjs';
import { State } from '../../store/reducers';
import * as localForage from 'localforage';
import { deepMergeObjects, prepareIndexedDbData } from '../../helper/util';
import { Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import {
  cleanup,
  hydrationCompleted,
  rehydrate,
  startRehydration,
} from '../../store/global.actions';
import {
  auditTime,
  catchError,
  distinctUntilChanged,
  map,
  mergeMap,
} from 'rxjs/operators';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { AppConstants } from '@app/app.constants';
import { LoggerService } from '../logging/logger.service';

@Injectable({
  providedIn: 'root',
})
export class HydrationService implements OnInitEffects {
  // hydration effect - because reduce function does not support async loading of state
  hydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startRehydration),
      map(() =>
        localForage.createInstance({
          name: AppConstants.INDEXEDDB_STATE_NAME,
        }),
      ),
      mergeMap((db) =>
        from(db.getItem<State>(AppConstants.INDEXEDDB_STATE_CURRENT)),
      ),
      mergeMap((loadedState) => {
        return [
          rehydrate({ loadedState: loadedState ?? ({} as State) }),
          cleanup(),
        ];
      }),
      catchError((e) => {
        console.error(e);
        return of(rehydrate({ loadedState: {} as State }));
      }),
    ),
  );

  hydrationCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rehydrate),
      map(() => hydrationCompleted()),
    ),
  );

  private readonly db: LocalForage;
  private saveSubject = new ReplaySubject<State>();
  private hydrated = false;
  private ignoreActionTypes: string[] = [INIT, UPDATE];
  private immediateSaveActionTypes: string[] = [];

  constructor(
    private loggerService: LoggerService,
    private actions$: Actions,
  ) {
    this.loggerService.info(
      `[Hydration Service] Initializing snapshot database`,
    );
    this.db = localForage.createInstance({
      name: AppConstants.INDEXEDDB_STATE_NAME,
    });
    this.saveSubject
      .pipe(auditTime(2000), distinctUntilChanged())
      .subscribe((state) => this.handleSave(state));
  }

  ngrxOnInitEffects(): Action {
    return startRehydration();
  }

  public reduce(
    state: State | undefined,
    action: Action,
    reducer: ActionReducer<any>,
  ) {
    if (action.type === rehydrate.type) {
      try {
        const loadedState: Partial<State> = (action as any).loadedState;
        state = deepMergeObjects(state, loadedState);
      } catch (error) {
        console.error(error);
      }
      this.hydrated = true;
    }
    const nextStage = reducer(state, action);

    if (this.ignoreActionTypes.indexOf(action.type) === -1 && this.hydrated) {
      if (this.immediateSaveActionTypes.indexOf(action.type) === -1) {
        this.saveSubject.next(nextStage);
      } else {
        this.handleSave(nextStage);
      }
    }

    return nextStage;
  }

  private async handleSave(state: State) {
    const savedState = await this.db.setItem(
      AppConstants.INDEXEDDB_STATE_CURRENT,
      prepareIndexedDbData(state),
    );
    this.loggerService.info(`[Hydration Service] Persisted snapshot`);
    return savedState;
  }
}
