import {Component, OnDestroy, OnInit} from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-watch-quiz-form',
  templateUrl: './watch-quiz-form.component.html',
  styleUrls: ['./watch-quiz-form.component.css']
})
export class WatchQuizFormComponent implements OnInit, OnDestroy{
  public name: string = "";
  public testType: string = "";
  public catType: string = "";
  public questions: any = [];
  public currentQuestion: number = 0;
  public testFormat: string = "";
  public api: string = "https://localhost:7176";

  public async GetTestData(): Promise<void> {
    await fetch(API_URL + `GetTestData?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion + 1}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let testFormat = JSON.parse(JSON.stringify(data));
      localStorage.setItem("TestTypeForWatching", JSON.stringify(Object.values(testFormat)[3]));
    });

    this.testFormat = localStorage.getItem("TestTypeForWatching")!.slice(1, localStorage.getItem('TestTypeForWatching')!.length - 1);
  }

  public async getAllQuestionsFromBack(): Promise<void>{
    await fetch(API_URL + `ReadQuestions?catName=${this.catType}&quizName=${this.testType}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        this.questions.push(data[key]);
      });
    });
  }

  public async nextQuestion(): Promise<void> {
    this.currentQuestion++;
    await this.GetTestData(); // Wait for GetTestData() to complete
  }

  public async previousQuestion(): Promise<void> {
    this.currentQuestion--;
    await this.GetTestData(); // Wait for GetTestData() to complete
  }

  public async resetQuiz(): Promise<void> {
    this.currentQuestion = 0;
    await this.GetTestData(); // Wait for GetTestData() to complete
  }

  ngOnInit(): void {
    this.name = localStorage.getItem("Login")!;
    this.testType = localStorage.getItem("TestNameForWatching")!;
    this.catType = localStorage.getItem("CatNameForWatching")!;
    this.GetTestData();
    this.getAllQuestionsFromBack();
    localStorage.removeItem('TestNameForWatching'); // Don't need anymore
    localStorage.removeItem('CatNameForWatching'); // Don't need anymore
  }

  ngOnDestroy(): void {
    localStorage.removeItem('TestTypeForWatching'); // Don't need anymore
  }
}
