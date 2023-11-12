import {Component, OnInit} from '@angular/core';
import {ServiceComponent} from "../service/service.component";
import {TestProcessComponent} from "../test-process/test-process.component";

@Component({
  selector: 'app-watch-quiz-form',
  templateUrl: './watch-quiz-form.component.html',
  styleUrls: ['./watch-quiz-form.component.css']
})

export class WatchQuizFormComponent implements OnInit{
  public name: string = "";
  public testType: string = "";
  public questions: any = [];
  public currentQuestion: number = 0;
  private url: string = "https://localhost:7176/api/v1/Quiz/";
  public testFormat: string = "";

  constructor() {
  }

  public async GetTestData(): Promise<void> {
    await fetch(this.url + `GetTestData?quizName=${localStorage.getItem("TestName")}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let testFormat = JSON.parse(JSON.stringify(data));
      localStorage.setItem("testType", JSON.stringify(Object.values(testFormat)[3]));
    });

    this.testFormat = localStorage.getItem("testType")!.slice(1, localStorage.getItem('testType')!.length - 1);
  }

  public async getAllQuestionsFromBack(): Promise<void>{
    await fetch(this.url + `ReadQuestions?quizName=${localStorage.getItem("TestName")}`, {
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
    this.testType = localStorage.getItem("TestName")!;
    this.GetTestData();
    this.getAllQuestionsFromBack();
  }
}
