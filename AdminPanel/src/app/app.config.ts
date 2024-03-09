import {ApplicationConfig, NgModule} from '@angular/core';
import {provideRouter, RouterModule, RouterOutlet} from '@angular/router';
import {HttpLoaderFactory, routes} from './app.routes';
import {AppComponent} from "./app.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BrowserModule} from "@angular/platform-browser";
import {AuthFormComponent} from "../auth-form/auth-form.component";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ]
};

@NgModule({
  declarations: [
    AuthFormComponent,
    NavbarFormComponent,
    FooterFormComponent,
    ScrollToTopFormComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class AppModule { }

// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http);
// }
