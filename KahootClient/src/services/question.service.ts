import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Question} from "../models/Question";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  // Map to associate localStorage keys with question URLs
  private questionsUrls: Map<string, string> = new Map([
    ['Mixed Test', 'assets/questions/mixedTestQuestions.json'],
    ['Programming', 'assets/questions/programmingQuestions.json'],
    ['Math', 'assets/questions/mathQuestions.json'],
    ['Logics', 'assets/questions/logicQuestions.json']
  ]);

  // Array to store questions
  questions: any[] = [];

  constructor(private http: HttpClient) { }

  // Method to get question JSON based on localStorage keys
  // Returns an Observable or null if no matching localStorage key is found
  public getQuestionJson(): Observable<any> | null {
    const categoryName: string = localStorage.getItem('categoryName')!;

    // Check if category name exists in local storage
    if (this.questionsUrls.has(categoryName)) {
      const url: string = this.questionsUrls.get(categoryName)!;

      // Return an HTTP request to get the corresponding JSON
      return this.http.get<any>(url);
    }

    // Return null if no matching category name is found
    return null;
  }

  public async addQuestionAsync(question: Question, photoFile: File | null, videoFile: File | null, audioFile: File | null, flag: boolean): Promise<void> {
    let formData = new FormData();

    formData.append("quizType", question.quizType);
    formData.append("quizName", question.quizName);
    formData.append("testFormat", question.testFormat);
    formData.append("question", question.question);
    formData.append("option1", question.option1);
    formData.append("option2", question.option2);
    formData.append("option3", question.option3 || ""); // If option3 is optional, empty string will be passed
    formData.append("option4", question.option4 || ""); // If option4 is optional empty string will be passed
    formData.append("answer", question.answer.toString());
    formData.append("questionNumber", question.questionNumber.toString());
    formData.append("points", question.points.toString());
    formData.append("timeToAnswer", question.timeToAnswer.toString());

    // Append files if they exist
    if (photoFile) {
      formData.append("photo", photoFile);
    }
    if (videoFile) {
      formData.append("video", videoFile);
    }
    if (audioFile) {
      formData.append("audio", audioFile);
    }

    if (!flag) {

      await fetch(API_URL + "AddQuestion", {
        method: "POST",
        body: formData
      });
    }
    else {
      alert(question.questionNumber)
      await fetch(API_URL + `UpdateQuestion?catName=${question.quizType}&quizName=${question.quizName}&questionNumber=${question.questionNumber + 1}`, {
        method: "PATCH",
        body: formData
      })
    }
  }
}
