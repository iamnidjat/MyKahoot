import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-creating-test-form',
  templateUrl: './creating-test-form.component.html',
  styleUrls: ['./creating-test-form.component.css']
})

export class CreatingTestFormComponent implements OnInit{
  public name: string = "";
  public testType: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public isQuizCompleted: boolean = false;
  yourQuestions: any = [];
  constructor() {
  }

  public ngOnInit(): void {
    if (localStorage.getItem("Login") !== null) {
      this.name = localStorage.getItem("Login")!;
    }
    if (localStorage.getItem("newLogin") !== null) {
      this.name = localStorage.getItem("newLogin")!;
    }

    if (localStorage.getItem("MixedTestC") !== null) {
      this.testType = localStorage.getItem("MixedTestC")!;
    }
    if (localStorage.getItem("ProgrammingC") !== null) {
      this.testType = localStorage.getItem("ProgrammingC")!;
    }
    if (localStorage.getItem("MathC") !== null) {
      this.testType = localStorage.getItem("MathC")!;
    }
    if (localStorage.getItem("LogicsC") !== null) {
      this.testType = localStorage.getItem("LogicsC")!;
    }
  }

  public nextQuestion(question: string, ...answers: string[]): void {
    this.currentQuestion++;


  }
  public previousQuestion(): void {
    this.currentQuestion--;


  }
  public resetQuiz(): void {
    this.currentQuestion = 0;

    this.yourQuestions.length = 0;
  }
}
