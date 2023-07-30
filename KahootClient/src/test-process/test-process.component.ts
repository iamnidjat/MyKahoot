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
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  public counter: number = 60;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  public interval$: any;
  public progress: string = "0";
  public isQuizCompleted: boolean = false;
  private url: string = "https://localhost:7176/api/v1/Statistics/";
  public feedback: string = "";
  public isActive: boolean = false;
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
    }
    if (localStorage.getItem("Programming") !== null)
    {
      this.testType = localStorage.getItem("Programming")!;
    }
    if (localStorage.getItem("Math") !== null)
    {
      this.testType = localStorage.getItem("Math")!;
    }
    if (localStorage.getItem("Logics") !== null)
    {
      this.testType = localStorage.getItem("Logics")!;
    }

    this.getAllQuestions();
    this.startCounter();
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

  private SaveResult(e: any): void{
    e.preventDefault();

    let quizInfo: QuizModel = new QuizModel(this.testType, this.points, parseInt(localStorage.getItem("userId")!),
      localStorage.getItem("Login")! || localStorage.getItem("newLogin")!, new Date());

    fetch(this.url + "UploadResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quizInfo)
    });
  }
}
