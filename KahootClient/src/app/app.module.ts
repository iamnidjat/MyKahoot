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
import { changeBG } from "../changeBG";
import { ForgotPasswordFormComponent } from "../forgot-password-form/forgot-password-form.component";
import { SettingsChoiceFormComponent } from "../settings-choice-form/settings-choice-form.component";
import { SettingsFormComponent } from "../settings-form/settings-form.component";
import { BirthdaySettingsFormComponent } from "../birthday-settings-form/birthday-settings-form.component";
import {StatsFormComponent} from "../stats-form/stats-form.component";
import {Top10FormComponent} from "../top10-form/top10-form.component";
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";

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
        path: 'app/stats-form',
        component: StatsFormComponent
      },
      {
        path: 'app/top10-form',
        component: Top10FormComponent
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
        path: 'app/birthday-settings-form',
        component: BirthdaySettingsFormComponent
      },
      {
        path: 'app/creating-quiz-option-form',
        component: CreatingQuizOptionFormComponent
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
    SettingsChoiceFormComponent,
    SettingsFormComponent,
    StatsFormComponent,
    Top10FormComponent,
    BirthdaySettingsFormComponent,
    CreatingQuizOptionFormComponent
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
