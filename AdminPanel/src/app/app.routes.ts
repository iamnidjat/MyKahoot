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
  },
  {
    path: 'app/messages-menu-page',
    component: MessagesMenuFormComponent,
  },
  {
    path: 'app/send-message',
    component: SendMessageFormComponent,
  },
  {
    path: 'app/get-messages',
    component: GetMessagesFormComponent,
  },
  {
    path: 'app/users-list',
    component: UsersListFormComponent,
  },
  {
    path: 'app/quizzes-list',
    component: QuizzesListFormComponent,
  },
  {
    path: 'app/send-news',
    component: SendNewsFormComponent,
  },
  {
    path: 'app/watching-quiz/:catType/:quizName',
    component: WatchQuizFormComponent,
  },
];


