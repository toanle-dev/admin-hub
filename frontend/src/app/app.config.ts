import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';

import { JwtModule } from '@auth0/angular-jwt';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { environment } from '../environments/environment';
import { StorageKeys } from './core/providers/storage/storage.enum';

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
            environment.apiUrl + 'auth/login',
            environment.apiUrl + 'auth/register',
            environment.apiUrl + 'auth-delivery/verify-code',
            environment.apiUrl + 'auth-delivery/generate-code',
          ],
        },
      }),
    ]),
  ],
};
