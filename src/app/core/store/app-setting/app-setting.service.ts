import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppSettingState, hydrated,} from '@app/core/store/app-setting/app-setting.selectors';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppSettingService {
  constructor(
    private store$: Store<AppSettingState>,
  ) {}

  public isHydrationCompleted(): Observable<boolean> {
    return this.store$.select(hydrated).pipe(filter((isHydrated) => isHydrated));
  }
}
