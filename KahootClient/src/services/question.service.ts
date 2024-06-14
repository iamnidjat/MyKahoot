import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  getQuestionJson(): Observable<any> | null {
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
}
