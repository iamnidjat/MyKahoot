import { Injectable } from '@angular/core';
import { QuizHistory } from '../models/QuizHistory';

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Injectable({
  providedIn: 'root'
})
export class QuizHistoryService {

  public async AddQuizHistoryAsync(catName: string, quizName: string,
                 questionNumber: number, correctAnswer: number, myAnswer: number, userId: number): Promise<void> {
    let myQuizAnswers: QuizHistory = {
      categoryName: catName,
      quizName: quizName,
      questionNumber: questionNumber,
      correctAnswer: correctAnswer,
      myAnswer: myAnswer,
      userId: userId,
    }

    await fetch(API_URL + "AddQuizHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myQuizAnswers)
    })
  }

  public async GetQuizHistoryAsync(catName: string, quizName: string,
                                   questionNumber: number, userId: number): Promise<void> {
    await fetch(API_URL + `GetQuizHistory?catName=${catName}&quizName=${quizName}&questionNumber=${questionNumber}&userId=${userId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      alert(`Your answer => ${data["myAnswer"]}`);
      alert(`Correct answer => ${data["correctAnswer"]}`);
    })
  }

  public async RemoveUserAnswerAsync(catName: string, quizName: string, questionNumber: number): Promise<void>{
    await fetch(API_URL + `RemoveUserAnswer?catName=${catName}&quizName=${quizName}&
                                  questionNumber=${questionNumber}`, {
      method: "DELETE",
    })
  }

  public async RemoveUserAnswersAsync(catName: string, quizName: string): Promise<void>{
    await fetch(API_URL + `RemoveUserAnswer?catName=${catName}&quizName=${quizName}`, {
      method: "DELETE",
    })
  }
}
