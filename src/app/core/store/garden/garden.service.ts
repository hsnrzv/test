import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getGardenById,
  getGardens,
} from '@app/core/store/garden/garden.selectors';
import { Garden } from '@app/domain/garden';
import { GardenState } from '@app/core/store/garden/garden.reducer';
import { addGarden, updateGarden } from '@app/core/store/garden/garden.actions';

@Injectable({
  providedIn: 'root',
})
export class GardenService {
  constructor(private store$: Store<GardenState>) {}

  public getGardens(): Observable<Garden[]> {
    return this.store$.select(getGardens);
  }

  public getGardenById(id: string): Observable<Garden | undefined> {
    return this.store$.select(getGardenById(id));
  }

  public addGarden(garden: Garden): void {
    this.store$.dispatch(addGarden({ garden }));
  }

  public updateGarden(garden: Garden): void {
    this.store$.dispatch(updateGarden({ garden }));
  }
}
