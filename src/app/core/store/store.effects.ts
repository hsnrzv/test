import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as localForage from 'localforage';
import { AppConstants } from '@app/app.constants';
import { resetIndexedDbState } from '@app/core/store/app-setting/app-setting.actions';

@Injectable()
export class StoreEffects {
  private readonly db: LocalForage;

  constructor(private actions$: Actions) {
    this.db = localForage.createInstance({
      name: AppConstants.INDEXEDDB_STATE_NAME,
    });
  }

  resetIndexedDbState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetIndexedDbState),
        tap(async () => {
          await this.db.dropInstance({
            name: AppConstants.INDEXEDDB_STATE_NAME,
          });
        }),
      ),
    { dispatch: false },
  );
}
