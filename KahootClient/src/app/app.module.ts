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
import { changeBG } from "../changeBG";
import { ForgotPasswordFormComponent } from "../forgot-password-form/forgot-password-form.component";
import { SettingsChoiceFormComponent } from "../settings-choice-form/settings-choice-form.component";
import { SettingsFormComponent } from "../settings-form/settings-form.component";
import { BirthdaySettingsFormComponent } from "../birthday-settings-form/birthday-settings-form.component";
import {StatsFormComponent} from "../stats-form/stats-form.component";
import {Top10FormComponent} from "../top10-form/top10-form.component";
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component"
import {FormsModule} from "@angular/forms";
import {ChooseFieldFormComponent} from "../choose-field-form/choose-field-form.component";
import {ChooseAccountTypeFormComponent} from "../choose-account-type-form/choose-account-type-form.component";
import {RegisterFormComponent} from "../register-form/register-form.component";
import {AddNewCategoryPopupFormComponent} from "../add-new-category-popup-form/add-new-category-popup-form.component";
import {YourQuizzesFormComponent} from "../your-quizzes-form/your-quizzes-form.component";
import {ChooseTypeOfQuizFormComponent} from "../choose-type-of-quiz-form/choose-type-of-quiz-form.component";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {AboutPageFormComponent} from "../about-page-form/about-page-form.component";
import {ContactsPageFormComponent} from "../contacts-page-form/contacts-page-form.component";
import {CookiesServiceComponent} from "../cookies-service/cookies-service.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {SpecifyNameOfTestComponent} from "../specify-name-of-test/specify-name-of-test.component";
import {AuthGuard} from "./_service/auth-guard.service";
import {Novisitguard} from "./_service/novisitguard.service";
import {Studentsguard} from "./_service/studentsguard.service";
import {NotAllowedPageFormComponent} from "../not-allowed-page-form/not-allowed-page-form.component";
import {Specialguard} from "./_service/specialguard.service";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from "angular-datatables";
import {Specialguard2} from "./_service/specialguard2.guard";
import {ContactListFormComponent} from "../contact-list-form/contact-list-form.component";
import {ProfileDashboardFormComponent} from "../profile-dashboard-form/profile-dashboard-form.component";
import {BarchartFormComponent} from "../barchart-form/barchart-form.component";
import {EmailConfirmedFormComponent} from "../email-confirmed-form/email-confirmed-form.component";
import {DeleteAccFormComponent} from "../delete-acc-form/delete-acc-form.component";
import {DeleteAccPopupFormComponent} from "../delete-acc-popup-form/delete-acc-popup-form.component";

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
        component: PlayerOptionsFormComponent,
        canActivate: [Specialguard2]
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
        canActivate: [Specialguard, Novisitguard]
      },
      {
        path: 'app/creating-test-form',
        component: CreatingTestFormComponent,
        canActivate: [AuthGuard, Studentsguard]
      },
      {
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
        canActivate: [AuthGuard, Studentsguard]
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
        component: ProfileDashboardFormComponent
      },
      {
        path: 'app/barchart-form',
        component: BarchartFormComponent
      },
      {
        path: 'app/email-confirmed-form/:id',
        component: EmailConfirmedFormComponent
      },
      {
        path: 'app/delete-acc-form',
        component: DeleteAccFormComponent
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
    CookiesServiceComponent,
    ScrollToTopFormComponent,
    SpecifyNameOfTestComponent,
    NotAllowedPageFormComponent,
    ContactListFormComponent,
    ProfileDashboardFormComponent,
    BarchartFormComponent,
    EmailConfirmedFormComponent,
    DeleteAccFormComponent,
    DeleteAccPopupFormComponent
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
    DataTablesModule
  ],
  providers: [AddNewCategoryPopupFormComponent, PlayerOptionsFormComponent, ChooseTypeOfQuizFormComponent, AddNewCategoryPopupFormComponent,
    CreatingQuizOptionFormComponent, SpecifyNameOfTestComponent, RegisterFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
