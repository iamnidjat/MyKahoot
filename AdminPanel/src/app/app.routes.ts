import { Routes } from '@angular/router';
import {MenuFormComponent} from "../components/menu-form/menu-form.component";
import {SendMessageFormComponent} from "../components/send-message-form/send-message-form.component";
import {UsersListFormComponent} from "../components/users-list-form/users-list-form.component";
import {QuizzesListFormComponent} from "../components/quizzes-list-form/quizzes-list-form.component";
import {SendNewsFormComponent} from "../components/send-news-form/send-news-form.component";
import {AuthFormComponent} from "../components/auth-form/auth-form.component";
import {MessagesMenuFormComponent} from "../components/messages-menu-form/messages-menu-form.component";
import {GetMessagesFormComponent} from "../components/get-messages-form/get-messages-form.component";
import {WatchQuizFormComponent} from "../components/watch-quiz-form/watch-quiz-form.component";
import {AddItemToStoreFormComponent} from "../components/add-item-to-store-form/add-item-to-store-form.component";
import {GetItemsFormComponent} from "../components/get-items-form/get-items-form.component";
import {authGuardGuard} from "../guards/auth-guard.guard";
import {NotFoundFormComponent} from "../components/not-found-form/not-found-form.component";
import {NotAllowedPageFormComponent} from "../components/not-allowed-page-form/not-allowed-page-form.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/auth-page',
    pathMatch: 'full',
  },
  {
    path: 'app/auth-page',
    component: AuthFormComponent,
  },
  {
    path: 'app/menu-page',
    component: MenuFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/messages-menu-page',
    component: MessagesMenuFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/send-message',
    component: SendMessageFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/get-messages',
    component: GetMessagesFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/users-list',
    component: UsersListFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/quizzes-list',
    component: QuizzesListFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/send-news',
    component: SendNewsFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/watching-quiz/:catType/:quizName',
    component: WatchQuizFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/add-item-to-store',
    component: AddItemToStoreFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/mykahoot-store',
    component: GetItemsFormComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'app/404-page-form',
    component: NotAllowedPageFormComponent
  },
  { path: '**', component: NotFoundFormComponent }
];


