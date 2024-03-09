import {Component, OnDestroy, OnInit} from '@angular/core';

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
  private url: string = "https://localhost:7176/api/v1/Quiz/";
  public testFormat: string = "";

  public async GetTestData(): Promise<void> {
    await fetch(this.url + `GetTestData?catName=${this.catType}&quizName=${this.testType}`, {
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
    await fetch(this.url + `ReadQuestions?catName=${this.catType}&quizName=${this.testType}`, {
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

  public nextQuestion(): void {
    this.currentQuestion++;
  }

  public previousQuestion(): void {
    this.currentQuestion--;
  }

  public resetQuiz(): void {
    this.currentQuestion = 0;
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
