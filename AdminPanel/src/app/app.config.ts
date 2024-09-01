import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GettingDataService } from "../services/getting-data.service";
import { ManipulatingDataService } from "../services/manipulating-data.service";
import { FilteringDataService } from "../services/filtering-data.service";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import {
  TranslateLoader,
  TranslateService,
  TranslateStore,
  TranslateModule,
} from "@ngx-translate/core";
import { ConfigService } from "../services/config.service";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    GettingDataService,
    ManipulatingDataService,
    FilteringDataService,
    ConfigService,
    TranslateService,
    TranslateStore,
    importProvidersFrom(HttpClient, TranslateModule.forRoot({
      loader:  {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    })),
  ],
};

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
