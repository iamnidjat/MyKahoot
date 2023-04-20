import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthFormComponent } from "../auth-form/auth-form.component";
import { PlayerOptionsFormComponent } from "../player-options-form/player-options-form.component";
import { PlayerSurveyChoosingFormComponent } from "../player-survey-choosing-form/player-survey-choosing-form.component";
import { ProfileFormComponent } from "../profile-form/profile-form.component";
import { CreatingTestFormComponent } from "../creating-test-form/creating-test-form.component";
import { TestProcessComponent } from "../test-process/test-process.component";
import { RulesFormComponent } from "../rules-form/rules-form.component";
import { RouterModule, RouterOutlet, Route } from "@angular/router";
import { ServiceComponent } from "../service/service.component";
import { HttpClientModule } from '@angular/common/http';
import {changeBG} from "../changeBG";
import {ForgotPasswordFormComponent} from "../forgot-password-form/forgot-password-form.component";
import {ChoiceForCreatingFormComponent} from "../choice-for-creating-form/choice-for-creating-form.component";
import {SettingsChoiceFormComponent} from "../settings-choice-form/settings-choice-form.component";
import {SettingsFormComponent} from "../settings-form/settings-form.component";
import {
  StatsAndTop10ResultsFormComponent
} from "../stats-and-top10-results-form/stats-and-top10-results-form.component";

let routes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'app/auth-form',
        component: AuthFormComponent
      },
      {
        path: 'app/player-options-form',
        component: PlayerOptionsFormComponent
      },
      {
        path: 'app/player-survey-choosing-form',
        component: PlayerSurveyChoosingFormComponent
      },
      {
        path: 'app/profile-form',
        component: ProfileFormComponent
      },
      {
        path: 'app/test-process-form',
        component: TestProcessComponent
      },
      {
        path: 'app/creating-test-form',
        component: CreatingTestFormComponent
      },
      {
        path: 'app/rules-form',
        component: RulesFormComponent
      },
      {
        path: 'app/forgot-password-form',
        component: ForgotPasswordFormComponent
      },
      {
        path: 'app/stats-and-top10-results-form',
        component: StatsAndTop10ResultsFormComponent
      },
      {
        path: 'app/settings-choice-form',
        component: SettingsChoiceFormComponent
      },
      {
        path: 'app/settings-form',
        component: SettingsFormComponent
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
    PlayerOptionsFormComponent,
    PlayerSurveyChoosingFormComponent,
    TestProcessComponent,
    ProfileFormComponent,
    CreatingTestFormComponent,
    RulesFormComponent,
    ServiceComponent,
    changeBG,
    ForgotPasswordFormComponent,
    ChoiceForCreatingFormComponent,
    SettingsChoiceFormComponent,
    SettingsFormComponent,
    StatsAndTop10ResultsFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
