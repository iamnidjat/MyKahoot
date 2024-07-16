import {Route, RouterModule} from "@angular/router";
import {AuthFormComponent} from "../components/auth-form/auth-form.component";
import {PlayerOptionsFormComponent} from "../components/player-options-form/player-options-form.component";
import {PlayerSurveyChoosingFormComponent} from "../components/player-survey-choosing-form/player-survey-choosing-form.component";
import {Specialguard} from "../guards/specialguard.service";
import {ProfileFormComponent} from "../components/profile-form/profile-form.component";
import {AuthGuard} from "../guards/auth-guard.service";
import {TestProcessComponent} from "../components/test-process/test-process.component";
import {Novisitguard} from "../guards/novisitguard.service";
import {CreatingTestFormComponent} from "../components/creating-test-form/creating-test-form.component";
import {StudentProhibitionGuard} from "../guards/studentprohibitionguard.service";
import {RulesFormComponent} from "../components/rules-form/rules-form.component";
import {ForgotPasswordFormComponent} from "../components/forgot-password-form/forgot-password-form.component";
import {StatsFormComponent} from "../components/stats-form/stats-form.component";
import {Top10FormComponent} from "../components/top10-form/top10-form.component";
import {SettingsChoiceFormComponent} from "../components/settings-choice-form/settings-choice-form.component";
import {SettingsFormComponent} from "../components/settings-form/settings-form.component";
import {BirthdaySettingsFormComponent} from "../components/birthday-settings-form/birthday-settings-form.component";
import {CreatingQuizOptionFormComponent} from "../components/creating-quiz-option-form/creating-quiz-option-form.component";
import {ChooseFieldFormComponent} from "../components/choose-field-form/choose-field-form.component";
import {ChooseAccountTypeFormComponent} from "../components/choose-account-type-form/choose-account-type-form.component";
import {RegisterFormComponent} from "../components/register-form/register-form.component";
import {AboutPageFormComponent} from "../components/about-page-form/about-page-form.component";
import {ContactsPageFormComponent} from "../components/contacts-page-form/contacts-page-form.component";
import {YourQuizzesFormComponent} from "../components/your-quizzes-form/your-quizzes-form.component";
import {NotAllowedPageFormComponent} from "../components/not-allowed-page-form/not-allowed-page-form.component";
import {ContactListFormComponent} from "../components/contact-list-form/contact-list-form.component";
import {ProfileDashboardFormComponent} from "../components/profile-dashboard-form/profile-dashboard-form.component";
import {BarchartFormComponent} from "../components/barchart-form/barchart-form.component";
import {EmailConfirmedFormComponent} from "../components/email-confirmed-form/email-confirmed-form.component";
import {DeleteAccFormComponent} from "../components/delete-acc-form/delete-acc-form.component";
import {ChooseLevelFormComponent} from "../components/choose-level-form/choose-level-form.component";
import {WatchQuizFormComponent} from "../components/watch-quiz-form/watch-quiz-form.component";
import {UpdateQuizFormComponent} from "../components/update-quiz-form/update-quiz-form.component";
import {AvailableTestsListsFormComponent} from "../components/available-tests-lists-form/available-tests-lists-form.component";
import {AvailableTestsStatsFormComponent} from "../components/available-tests-stats-form/available-tests-stats-form.component";
import {ChooseFieldLevelFormComponent} from "../components/choose-field-level-form/choose-field-level-form.component";
import {NgModule} from "@angular/core";
import {exitTestProcessGuard} from "../guards/exit-test-process.guard";
import {CreatedQuizStatsFormComponent} from "../components/created-quiz-stats-form/created-quiz-stats-form.component";
import {CommentsFormComponent} from "../components/comments-form/comments-form.component";
import {NotFoundFormComponent} from "../components/not-found-form/not-found-form.component";
import {QuizHistoryFormComponent} from "../components/quiz-history-form/quiz-history-form.component";
import {SendMessageFormComponent} from "../components/send-message-form/send-message-form.component";
import {GetMessagesFormComponent} from "../components/get-messages-form/get-messages-form.component";
import {LeadeboardFormComponent} from "../components/leadeboard-form/leadeboard-form.component";
import {PointsHistoryFormComponent} from "../components/points-history-form/points-history-form.component";
import {WelcomePageComponent} from "../components/welcome-page/welcome-page.component";
import {MykahootStoreFormComponent} from "../components/mykahoot-store-form/mykahoot-store-form.component";

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'app/welcome-page',
    pathMatch: 'full',
  },
  {
    path: 'app/welcome-page',
    component: WelcomePageComponent
  },
  {
    path: 'app/auth-form',
    component: AuthFormComponent
  },
  {
    path: 'app/player-options-form',
    component: PlayerOptionsFormComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'app/player-survey-choosing-form',
    component: PlayerSurveyChoosingFormComponent,
    canActivate: [Specialguard]
  },
  {
    path: 'app/profile-form',
    component: ProfileFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/test-process-form',
    component: TestProcessComponent,
    canActivate: [Specialguard, Novisitguard],
    canDeactivate: [exitTestProcessGuard]
  },
  {
    path: 'app/creating-test-form',
    component: CreatingTestFormComponent,
    canActivate: [AuthGuard, StudentProhibitionGuard],
    canDeactivate: [exitTestProcessGuard]
  },
  {
    // path: 'app/rules-form/:action/:mode/:categoryName/:testName/:level',
    path: 'app/rules-form',
    component: RulesFormComponent,
    canActivate: [Specialguard, Novisitguard]
  },
  {
    path: 'app/forgot-password-form',
    component: ForgotPasswordFormComponent
  },
  {
    path: 'app/stats-form',
    component: StatsFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/top10-form',
    component: Top10FormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/settings-choice-form',
    component: SettingsChoiceFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/settings-form',
    component: SettingsFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/birthday-settings-form',
    component: BirthdaySettingsFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/creating-quiz-option-form',
    component: CreatingQuizOptionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/choose-field-form',
    component: ChooseFieldFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/choose-account-type-form',
    component: ChooseAccountTypeFormComponent
  },
  {
    path: 'app/register-form',
    component: RegisterFormComponent
  },
  {
    path: 'app/about-form',
    component: AboutPageFormComponent
  },
  {
    path: 'app/contacts-form',
    component: ContactsPageFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/my-quizzes-form',
    component: YourQuizzesFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/404-page-form',
    component: NotAllowedPageFormComponent
  },
  {
    path: 'app/contact-list-form',
    component: ContactListFormComponent
  },
  {
    path: 'app/my-profile-form',
    component: ProfileDashboardFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/barchart-form',
    component: BarchartFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/email-confirmed-form/:id',
    component: EmailConfirmedFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/delete-acc-form',
    component: DeleteAccFormComponent,
    canActivate: [AuthGuard]
  },
  {
    // path: 'app/choose-level-form/:action/:mode/:categoryName/:testName',
    path: 'app/choose-level-form',
    component: ChooseLevelFormComponent,
    canActivate: [Specialguard]
  },
  {
    path: 'app/watch-quiz-form',
    component: WatchQuizFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/update-quiz-form',
    component: UpdateQuizFormComponent,
    canActivate: [AuthGuard],
    canDeactivate: [exitTestProcessGuard]
  },
  {
    path: 'app/tests-list-form',
    component: AvailableTestsListsFormComponent,
    canActivate: [Specialguard]
  },
  {
    path: 'app/tests-list-stats-form',
    component: AvailableTestsStatsFormComponent,
    canActivate: [Specialguard]
  },
  {
    path: 'app/choose-field-level-form',
    component: ChooseFieldLevelFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/created-quiz-stats-form',
    component: CreatedQuizStatsFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/comments/:id/:categoryName/:quizName',
    component: CommentsFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/quizHistory',
    component: QuizHistoryFormComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'app/sendMessage/:receiver',
    component: SendMessageFormComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'app/getMessages',
    component: GetMessagesFormComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'app/leaderboard',
    component: LeadeboardFormComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'app/pointsHistory/:user',
    component: PointsHistoryFormComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'app/mykahoot-store',
    component: MykahootStoreFormComponent,
    // canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
