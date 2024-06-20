import { Routes } from '@angular/router';
import {MenuFormComponent} from "../components/menu-form/menu-form.component";
import {SendMessageFormComponent} from "../components/send-message-form/send-message-form.component";
import {UsersListFormComponent} from "../components/users-list-form/users-list-form.component";
import {QuizzesListFormComponent} from "../components/quizzes-list-form/quizzes-list-form.component";
import {SendNewsFormComponent} from "../components/send-news-form/send-news-form.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/menu-page',
    pathMatch: 'full',
  },
  {
    path: 'app/menu-page',
    component: MenuFormComponent,
  },
  {
  path: 'app/sendMessage/:receiver',
  component: SendMessageFormComponent,
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
];


