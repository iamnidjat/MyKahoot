import {provideRouter, Routes} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "./app.component";
import {AuthFormComponent} from "../auth-form/auth-form.component";
import {bootstrapApplication} from "@angular/platform-browser";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
    {
      path: 'app/auth-form',
      component: AuthFormComponent
    },
    {
      path: '',
      redirectTo: 'app/auth-form',
      pathMatch: 'full',
    }
    ]}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
