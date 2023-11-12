import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ServiceComponent} from "../service/service.component";
import {interval} from "rxjs";
import {QuizModel} from "../QuizModel";
import {ChooseTypeOfQuizFormComponent} from "../choose-type-of-quiz-form/choose-type-of-quiz-form.component";

@Component({
  selector: 'app-test-process',
  templateUrl: './test-process.component.html',
  styleUrls: ['./test-process.component.css']
})

export class TestProcessComponent implements OnInit{
  public name: string = "";
  public testType: string = "";
  public quizName: string = "";
  public questionList: any = [];
  public questions: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  public counter: number = 60;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  public interval$: any;
  public progress: string = "0";
  public isQuizCompleted: boolean = false;
  private url: string = "https://localhost:7176/api/v1/Statistics/";
  private url2: string = "https://localhost:7176/api/v1/Quiz/";
  public feedback: string = "";
  public isActive: boolean = false;
  public flag: boolean = false;
  public testFormat: string = "";
  public level: string = "";

  constructor(private questionService: ServiceComponent, private router: Router, _variable: ChooseTypeOfQuizFormComponent) {}

  public ngOnInit(): void {
    if (localStorage.getItem("Login") !== null)
    {
      this.name = localStorage.getItem("Login")!;
    }

    if (localStorage.getItem("newLogin") !== null)
    {
      this.name = localStorage.getItem("newLogin")!;
    }

    if (localStorage.getItem("Guest") !== null)
    {
      this.name = "Guest";
    }

    if (localStorage.getItem("MixedTest") !== null)
    {
      this.testType = localStorage.getItem("MixedTest")!;
      localStorage.removeItem("MixedTest");
    }
    if (localStorage.getItem("Programming") !== null)
    {
      this.testType = localStorage.getItem("Programming")!;
      localStorage.removeItem("Programming");
    }
    if (localStorage.getItem("Math") !== null)
    {
      this.testType = localStorage.getItem("Math")!;
      localStorage.removeItem("Math");
    }
    if (localStorage.getItem("Logics") !== null)
    {
      this.testType = localStorage.getItem("Logics")!;
      localStorage.removeItem("Logics");
    }

    this.level = localStorage.getItem("Level")!;

    if (localStorage.getItem("AnotherTest") !== null)
    {
      this.flag = true;
      this.testType = localStorage.getItem("AnotherTest")!;
      localStorage.removeItem("AnotherTest");
      this.GetTestData();
    }

    this.quizName = localStorage.getItem("TestName")!;

    if (this.flag)
    {
      this.getAllQuestionsFromBack();
    }
    if (!this.flag) {
      this.getAllQuestions();
    }

    this.startCounter();
    localStorage.removeItem("TestName");
  }

  public async GetTestData(): Promise<void> {
    await fetch(this.url2 + `GetTestData?quizName=${localStorage.getItem("TestName")}`, {
      method: "GET"
    }).then((response) => {
      console.log(JSON.parse(JSON.stringify(response)));
      return response.json();
    }).then((data) => {
      let testFormat = JSON.parse(JSON.stringify(data));
      localStorage.setItem("testType", JSON.stringify(Object.values(testFormat)[3]));
    });

    this.testFormat = localStorage.getItem("testType")!.slice(1, localStorage.getItem('testType')!.length - 1);
  }

  public async GetCorrectAnswer(): Promise<void>{
    await fetch(this.url2 + `GetCorrectAnswer?questionNumber=${this.currentQuestion + 1}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("correctAnswer", data);
    });
  }

  public async getAllQuestionsFromBack(): Promise<void>{
    await fetch(this.url2 + `ReadQuestions?quizName=${localStorage.getItem("TestName")}`, {
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

  public getAllQuestions(): void {
    this.questionService.getQuestionJson()!
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }

  public nextQuestion(): void {
    this.currentQuestion++;
  }

  public previousQuestion(): void {
    this.currentQuestion--;
  }

  public answer(currentQno: number, option: any): void {
    this.isActive = true;
    if (currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
      this.FeedbackGenerator();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
      }, 1000);
    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
      }, 1000);
      this.points -= 10;
    }
  }

  public answer2(currentQno: number, option: any): void {
    this.GetCorrectAnswer();
    this.isActive = true;

    if (currentQno === this.questions.length){
      this.isQuizCompleted = true;
      this.stopCounter();
      this.FeedbackGenerator();
    }
    if (option === parseInt(localStorage.getItem("correctAnswer")!)) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
      }, 1000);
    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
      }, 1000);
      this.points -= 10;
    }
  }

  public startCounter(): void {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  public stopCounter(): void {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  public resetCounter(): void {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  public resetQuiz(): void {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  public getProgressPercent(): string {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  public ToMenu(e: any): void{
    if (localStorage.getItem("Guest") === null)
    {
      this.SaveResult(e);
    }

    this.router.navigate(['/app/player-options-form']);
  }

  public ToStats(e: any): void{
    this.SaveResult(e);
    localStorage.setItem("SLevel", this.level);
    this.router.navigate(['/app/stats-form']);
  }

  private FeedbackGenerator(): any {
    if (this.correctAnswer > 0 && this.correctAnswer <= 8)
    {
      this.feedback = "You have gaps in this field! Study better!";
    }

    else if (this.correctAnswer > 8 && this.correctAnswer <= 12)
    {
      this.feedback = "You need to improve your knowledge in this field!";
    }

    else if (this.correctAnswer > 12 && this.correctAnswer <= 16)
    {
      this.feedback = "Good result! You have an average score!";
    }

    else  if (this.correctAnswer > 16 && this.correctAnswer <= 20)
    {
      this.feedback = "Keep it up! You have great knowledge in this field!";
    }
  }

  private async SaveResult(e: any): Promise<void>{
    e.preventDefault();

    let quizInfo: QuizModel = new QuizModel(this.testType, this.quizName, this.points,
      localStorage.getItem("Login")! || localStorage.getItem("newLogin")!, new Date(),
      true, this.level, parseInt(localStorage.getItem("userId")!));

    await fetch(this.url + "UploadResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quizInfo)
    });
  }
}
