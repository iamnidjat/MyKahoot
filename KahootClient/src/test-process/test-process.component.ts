import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ServiceComponent} from "../service/service.component";
import {interval} from "rxjs";

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
  public counter = 60;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  public interval$: any;
  public progress: string = "0";
  public isQuizCompleted: boolean = false;

  //isCorrect: boolean = false;
  constructor(private questionService: ServiceComponent, private router: Router) { }

  public ngOnInit(): void {
    this.name = localStorage.getItem("Login")!;
    this.getAllQuestions();
    this.startCounter();
  }
  public getAllQuestions() {
    this.questionService.getQuestionJson()
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
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
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

  public ToMenu(): void{
    this.router.navigate(['/app/player-options-form']);
  }

  public ToStats(): void{
    this.router.navigate(['/app/stats-and-top10-results-form']);
  }
}
