import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';
import { StorageKeys } from './core/providers/storage/storage.enum';
import { environment } from '../environments/environment';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideEnvironmentNgxMask(),
    importProvidersFrom([
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem(StorageKeys.token),
          allowedDomains: [environment.apiUrl, 'localhost:3000'],

          disallowedRoutes: [
            environment.apiUrl + 'login',
            environment.apiUrl + 'register',
          ],
        },
      }),
    ]),
  ],
};
