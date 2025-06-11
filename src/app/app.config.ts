import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_SETTINGS, appSettings } from './app.settings';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { ProductsService } from './products.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(),
    { provide: APP_SETTINGS, useValue: appSettings },

  ],
};
