import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthFormComponent } from "../components/auth-form/auth-form.component";
import { PlayerOptionsFormComponent } from "../components/player-options-form/player-options-form.component";
import { PlayerSurveyChoosingFormComponent } from "../components/player-survey-choosing-form/player-survey-choosing-form.component";
import { ProfileFormComponent } from "../components/profile-form/profile-form.component";
import { CreatingTestFormComponent } from "../components/creating-test-form/creating-test-form.component";
import { TestProcessComponent } from "../components/test-process/test-process.component";
import { RulesFormComponent } from "../components/rules-form/rules-form.component";
import { RouterOutlet } from "@angular/router";
import { changeBG } from "../directives/changeBG";
import { ForgotPasswordFormComponent } from "../components/forgot-password-form/forgot-password-form.component";
import { SettingsChoiceFormComponent } from "../components/settings-choice-form/settings-choice-form.component";
import { SettingsFormComponent } from "../components/settings-form/settings-form.component";
import { BirthdaySettingsFormComponent } from "../components/birthday-settings-form/birthday-settings-form.component";
import {StatsFormComponent} from "../components/stats-form/stats-form.component";
import {Top10FormComponent} from "../components/top10-form/top10-form.component";
import {CreatingQuizOptionFormComponent} from "../components/creating-quiz-option-form/creating-quiz-option-form.component"
import {FormsModule} from "@angular/forms";
import {ChooseFieldFormComponent} from "../components/choose-field-form/choose-field-form.component";
import {ChooseAccountTypeFormComponent} from "../components/choose-account-type-form/choose-account-type-form.component";
import {RegisterFormComponent} from "../components/register-form/register-form.component";
import {AddNewCategoryPopupFormComponent} from "../components/add-new-category-popup-form/add-new-category-popup-form.component";
import {YourQuizzesFormComponent} from "../components/your-quizzes-form/your-quizzes-form.component";
import {ChooseTypeOfQuizFormComponent} from "../components/choose-type-of-quiz-form/choose-type-of-quiz-form.component";
import {NavbarFormComponent} from "../components/navbar-form/navbar-form.component";
import {FooterFormComponent} from "../components/footer-form/footer-form.component";
import {AboutPageFormComponent} from "../components/about-page-form/about-page-form.component";
import {ContactsPageFormComponent} from "../components/contacts-page-form/contacts-page-form.component";
import {ScrollToTopFormComponent} from "../components/scroll-to-top-form/scroll-to-top-form.component";
import {SpecifyNameOfTestComponent} from "../components/specify-name-of-test/specify-name-of-test.component";
import {NotAllowedPageFormComponent} from "../components/not-allowed-page-form/not-allowed-page-form.component";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ContactListFormComponent} from "../components/contact-list-form/contact-list-form.component";
import {ProfileDashboardFormComponent} from "../components/profile-dashboard-form/profile-dashboard-form.component";
import {BarchartFormComponent} from "../components/barchart-form/barchart-form.component";
import {EmailConfirmedFormComponent} from "../components/email-confirmed-form/email-confirmed-form.component";
import {DeleteAccFormComponent} from "../components/delete-acc-form/delete-acc-form.component";
import {DeleteAccPopupFormComponent} from "../components/delete-acc-popup-form/delete-acc-popup-form.component";
import {
  SocialAuthServiceConfig, GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import {FreezeAccPopupFormComponent} from "../components/freeze-acc-popup-form/freeze-acc-popup-form.component";
import {ChooseLevelFormComponent} from "../components/choose-level-form/choose-level-form.component";
import {UpdateQuizFormComponent} from "../components/update-quiz-form/update-quiz-form.component";
import {WatchQuizFormComponent} from "../components/watch-quiz-form/watch-quiz-form.component";
import {AddPhotoPopupFormComponent} from "../components/add-photo-popup-form/add-photo-popup-form.component";
import {AvailableTestsListsFormComponent} from "../components/available-tests-lists-form/available-tests-lists-form.component";
import {ChooseFieldLevelFormComponent} from "../components/choose-field-level-form/choose-field-level-form.component";
import {AvailableTestsStatsFormComponent} from "../components/available-tests-stats-form/available-tests-stats-form.component";
import {AppRoutingModule} from "./app-routing.module";
import {QuestionService} from "../services/question.service";
import {ConfigService} from "../services/config.service";
import {CookiesService} from "../services/cookies.service";
import {DownloadCategoriesSharedService} from "../services/download-categories-shared.service";
import {NgOptimizedImage} from "@angular/common";
import {UserSharedService} from "../services/user-shared.service";
import {SwitchLanguageService} from "../services/switch-language.service";
import {SharedService} from "../services/shared.service";
import {NgxPaginationModule} from "ngx-pagination";
import {DateDifferenceValidatorDirective} from "../directives/date-difference-validator.directive";
import {CheckCredentialsService} from "../services/check-credentials.service";
import {CheckDataService} from "../services/check-data.service";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import {
  ChooseActionPopupFormComponent
} from "../components/choose-action-popup-form/choose-action-popup-form.component";
import {DownloadQuizService} from "../services/download-quiz.service";
import {
  PublicPrivateTypePopupFormComponent
} from "../components/public-private-type-popup-form/public-private-type-popup-form.component";
import {
  EnterPrivateTestCodePopupFormComponent
} from "../components/enter-private-test-code-popup-form/enter-private-test-code-popup-form.component";
import {FilterCollectionsService} from "../services/filter-collections.service";
import {FeedbackPopupFormComponent} from "../components/feedback-popup-form/feedback-popup-form.component";
import {SendFeedbackService} from "../services/send-feedback.service";
import {CreatedQuizStatsFormComponent} from "../components/created-quiz-stats-form/created-quiz-stats-form.component";
import {CommentsFormComponent} from "../components/comments-form/comments-form.component";
import {InteractionService} from "../services/interaction.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NotFoundFormComponent} from "../components/not-found-form/not-found-form.component";

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
    changeBG,
    ForgotPasswordFormComponent,
    SettingsChoiceFormComponent,
    SettingsFormComponent,
    StatsFormComponent,
    Top10FormComponent,
    BirthdaySettingsFormComponent,
    CreatingQuizOptionFormComponent,
    ChooseFieldFormComponent,
    ChooseAccountTypeFormComponent,
    RegisterFormComponent,
    AddNewCategoryPopupFormComponent,
    YourQuizzesFormComponent,
    ChooseTypeOfQuizFormComponent,
    NavbarFormComponent,
    FooterFormComponent,
    AboutPageFormComponent,
    ContactsPageFormComponent,
    ScrollToTopFormComponent,
    SpecifyNameOfTestComponent,
    NotAllowedPageFormComponent,
    ContactListFormComponent,
    ProfileDashboardFormComponent,
    BarchartFormComponent,
    EmailConfirmedFormComponent,
    DeleteAccFormComponent,
    DeleteAccPopupFormComponent,
    FreezeAccPopupFormComponent,
    ChooseLevelFormComponent,
    UpdateQuizFormComponent,
    WatchQuizFormComponent,
    AddPhotoPopupFormComponent,
    AvailableTestsListsFormComponent,
    AvailableTestsStatsFormComponent,
    ChooseFieldLevelFormComponent,
    DateDifferenceValidatorDirective,
    ChooseActionPopupFormComponent,
    PublicPrivateTypePopupFormComponent,
    EnterPrivateTestCodePopupFormComponent,
    FeedbackPopupFormComponent,
    CreatedQuizStatsFormComponent,
    CommentsFormComponent,
    NotFoundFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    GoogleSigninButtonModule,
    NgOptimizedImage,
    NgxPaginationModule,
    RecaptchaV3Module,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [QuestionService, ConfigService, CookiesService, DownloadCategoriesSharedService, DownloadQuizService,
    UserSharedService, SharedService, SwitchLanguageService, CheckCredentialsService, CheckDataService,
    FilterCollectionsService, SendFeedbackService, InteractionService, TestProcessComponent, PlayerOptionsFormComponent,
    RegisterFormComponent, ChooseTypeOfQuizFormComponent, CreatingQuizOptionFormComponent, PlayerSurveyChoosingFormComponent,
    ProfileFormComponent, AvailableTestsStatsFormComponent,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('802998642536-vaupvsiqm0s1jeq8ppme9oblhckam8in.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LeRyH4pAAAAAK2hY5EIVa5UpxZu2SuLyKgn0-T3" } // !
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
