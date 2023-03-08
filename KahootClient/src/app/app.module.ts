import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthFormComponent } from "../auth-form/auth-form.component";
import { PlayerOptionsFormComponent } from "../player-options-form/player-options-form.component";
import { PlayerSurveyChoosingFormComponent } from "../player-survey-choosing-form/player-survey-choosing-form.component";
import { RouterModule, RouterOutlet, Route } from "@angular/router";

let routes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'app/player-options-form',
        component: PlayerOptionsFormComponent
      },
      {
        path: 'app/auth-form',
        component: AuthFormComponent
      },
      {
        path: 'app/player-survey-choosing-form',
        component: PlayerSurveyChoosingFormComponent
      },
      {
        path: '',
        redirectTo: 'app/auth-form',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    PlayerOptionsFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
