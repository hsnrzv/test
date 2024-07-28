import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from '@environments/environment';
import { HydrationService } from '@app/core/service/hydration/hydration.service';
import { reducers, State } from '@app/core/store/reducers';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { StoreEffects } from '@app/core/store/store.effects';
import {
  ActionReducer,
  META_REDUCERS,
  MetaReducer,
  provideStore,
  RuntimeChecks,
} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from '@app/app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppSettingEffects } from '@app/core/store/app-setting/app-setting.effects';
import { UserEffects } from '@app/core/store/user/user.effects';
import { GardenEffects } from '@app/core/store/garden/garden.effects';

export const isProductionMode = environment.production;

function hydrationReducerFactory(
  hydrationService: HydrationService,
): MetaReducer<State> {
  return (reducer: ActionReducer<any>) => (state, action) => {
    return hydrationService.reduce(state!, action, reducer);
  };
}

let storeDevTools = [
  StoreDevtoolsModule.instrument({
    maxAge: 50, // Retains last 50 states
    logOnly: isProductionMode, // Restrict extension to log-only mode
  }),
];
let runtimeChecks: Partial<RuntimeChecks> = {
  strictStateImmutability: true,
  strictActionImmutability: true,
};

if (isProductionMode) {
  enableProdMode();
  storeDevTools = [];
  runtimeChecks = {
    strictStateImmutability: false,
    strictActionImmutability: false,
    strictStateSerializability: false,
    strictActionSerializability: false,
    strictActionWithinNgZone: false,
    strictActionTypeUniqueness: false,
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: META_REDUCERS,
      deps: [HydrationService],
      useFactory: hydrationReducerFactory,
      multi: true,
    },
    provideIonicAngular(),
    provideRouter(routes),
    provideStore(reducers, {
      runtimeChecks,
    }),
    provideEffects([
      HydrationService,
      StoreEffects,
      AppSettingEffects,
      UserEffects,
      GardenEffects,
    ]),
    importProvidersFrom([storeDevTools]),
  ],
});
