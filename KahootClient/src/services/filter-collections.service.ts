import { Injectable } from '@angular/core';
import {CreatedQuiz} from "../models/CreatedQuiz";

@Injectable({
  providedIn: 'root'
})
export class FilterCollectionsService {
  public filterCategories(categories: CreatedQuiz[], searchText: string): CreatedQuiz[] {
    const defaultCategories: CreatedQuiz[] = [
      {categoryName: 'Mixed Test', quizName: "", userName: "", isPrivate: false, quizCode: "-", userId: 0},
      {categoryName: 'Programming', quizName: "", userName: "", isPrivate: false, quizCode: "-", userId: 0},
      {categoryName: 'Math', quizName: "", userName: "", isPrivate: false, quizCode: "-", userId: 0},
      {categoryName: 'Logics', quizName: "", userName: "", isPrivate: false, quizCode: "-", userId: 0}
    ];

    let finalCategories: CreatedQuiz[] = defaultCategories.concat(categories);

    return finalCategories.filter(category =>
      category.categoryName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  public filterQuizzes(quizzes: CreatedQuiz[], searchText: string, defaultTest: string, flag: boolean): CreatedQuiz[] {
    if ((defaultTest === 'Mixed Test' || defaultTest === 'Programming' ||
      defaultTest === 'Math' || defaultTest === 'Logics') && !flag) {
      const defaultQuizzes: CreatedQuiz[] = [
        {categoryName: defaultTest, quizName: 'Default ' + defaultTest, userName: "admin", isPrivate: false, isVIP: false, quizCode: "-", userId: 0},
      ];

      let finalQuizzes: CreatedQuiz[] = defaultQuizzes.concat(quizzes);

      return finalQuizzes.filter(quiz =>
        quiz.quizName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return quizzes.filter(quiz =>
      quiz.quizName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  public filterPassedQuizzes(quizzes: CreatedQuiz[], searchText: string): CreatedQuiz[] {
    const uniqueQuizNames = new Set<string>();
    return quizzes
      .filter(quiz =>
        quiz.quizName.toLowerCase().includes(searchText.toLowerCase())
      )
      .filter(quiz => {
        if (uniqueQuizNames.has(quiz.quizName.toLowerCase())) {
          return false;
        } else {
          uniqueQuizNames.add(quiz.quizName.toLowerCase());
          return true;
        }
      });
  }
}
