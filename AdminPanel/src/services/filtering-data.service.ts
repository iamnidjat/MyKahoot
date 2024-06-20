import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {CreatedQuiz} from "../models/CreatedQuiz";

@Injectable({
  providedIn: 'root'
})
export class FilteringDataService {

  constructor() { }

  public filterUsers(users: User[], searchText: string): User[] {
    return users.filter(user =>
      user.username!.toLowerCase().includes(searchText.toLowerCase()) ||
      user.name!.toLowerCase().includes(searchText.toLowerCase()) ||
      user.surname!.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email!.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role!.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  public filterQuizzes(quizzes: CreatedQuiz[], searchText: string): CreatedQuiz[] {
    return quizzes.filter(quiz =>
      quiz.categoryName!.toLowerCase().includes(searchText.toLowerCase()) ||
      quiz.quizName!.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
