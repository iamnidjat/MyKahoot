import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {interval} from "rxjs";
import {QuizModel} from "../../models/QuizModel";
import {QuestionService} from "../../services/question.service";
import {DownloadQuizService} from "../../services/download-quiz.service";

const API_URL: string = "https://localhost:7176/api/v1/Statistics/";
const API_URL2: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-test-process',
  templateUrl: './test-process.component.html',
  styleUrls: ['./test-process.component.css']
})
export class TestProcessComponent implements OnInit, OnDestroy{
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
  public feedback: string = "";
  public isActive: boolean = false;
  public flag: boolean = false;
  public testFormat: string = "";
  public level: string = "";
  public action: string = "";
  public showFileTypes: boolean = false;

  constructor(private questionService: QuestionService, private router: Router,
              private documentService: DownloadQuizService) {}

  public ngOnInit(): void {
    localStorage.getItem("Guest") ? this.name = "Guest" : this.name = localStorage.getItem("Login")!;

    this.testType = localStorage.getItem("categoryName")!;
    this.quizName = localStorage.getItem("TestName")!;
    this.level = localStorage.getItem("Level")!;
    this.action = localStorage.getItem("action")!;

    if (localStorage.getItem("AnotherTest") !== null)
    {
      this.flag = true;
      localStorage.removeItem("AnotherTest");
      this.GetTestData();
    }

    this.flag ? this.getAllQuestionsFromBack() : this.getAllQuestions();

    localStorage.removeItem("mode"); // Don't need anymore
    localStorage.removeItem("categoryName"); // Don't need anymore
    localStorage.removeItem("TestName"); // Don't need anymore
    localStorage.removeItem("Level"); // Don't need anymore
    localStorage.removeItem("action"); // Don't need anymore

    if (this.action === "play") {
      this.startCounter();
    }
  }

  public async GetTestData(): Promise<void> {
    await fetch(API_URL2 + `GetTestData?catName=${this.testType}&quizName=${this.quizName}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let testFormat = JSON.parse(JSON.stringify(data));
      localStorage.setItem("testType", JSON.stringify(Object.values(testFormat)[3]));
    });

    this.testFormat = localStorage.getItem("testType")!.slice(1, localStorage.getItem('testType')!.length - 1);
  }

  public async GetCorrectAnswer(): Promise<void> {
    await fetch(API_URL2+ `GetCorrectAnswer?catName=${this.testType}&quizName=${this.quizName}&questionNumber=${this.currentQuestion + 1}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("correctAnswer", data);
    });
  }

  public async getAllQuestionsFromBack(): Promise<void>{
    await fetch(API_URL2 + `ReadQuestions?catName=${this.testType}&quizName=${this.quizName}`, {
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

  public async answer2(currentQno: number, option: any): Promise<void> {
    await this.GetCorrectAnswer();
    this.isActive = true;

    if (currentQno === this.questions.length){
      this.isQuizCompleted = true;
      this.stopCounter();
      this.FeedbackGenerator();
    }
    if (option == localStorage.getItem("correctAnswer")) {
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
    if (localStorage.getItem("Guest") === null) {
      this.SaveResult(e);
      this.router.navigate(['/app/player-options-form']);
    }
    else {
      this.router.navigate(['/app/player-survey-choosing-form']);
    }
  }

  public ToStats(e: any): void{
    this.SaveResult(e);
    localStorage.setItem("SLevel", this.level);
    localStorage.setItem("categoryName", this.testType);
    localStorage.setItem("QuizType", this.quizName);
    this.router.navigate(['/app/stats-form']);
  }

  private FeedbackGenerator(): any { // !
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

    else if (this.correctAnswer > 16 && this.correctAnswer <= 20)
    {
      this.feedback = "Keep it up! You have great knowledge in this field!";
    }
  }

  private async SaveResult(e: any): Promise<void>{
    e.preventDefault();

    let quizInfo: QuizModel = {categoryName: this.testType, quizName: this.quizName, score: this.points,
      userName: localStorage.getItem("Login")!, passedDate: new Date(), isVisible: true,
      level: this.level, userId: parseInt(localStorage.getItem("userId")!)}

    await fetch(API_URL + "UploadResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quizInfo)
    });
  }

  public downloadDocument(fileType: string): void {
    const data = JSON.stringify(this.questionList.length !== 0 ? this.questionList : this.questions);

    let downloadFunction;

    switch (fileType) {
      case "docx":
        downloadFunction = this.documentService.downloadDocument;
        break;
      case "txt":
        downloadFunction = this.documentService.downloadTxt;
        break;
      case "json":
        downloadFunction = this.documentService.downloadJson;
        break;
      default:
        return; // Invalid fileType
    }

    downloadFunction(data, this.quizName).subscribe(blob => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = `${this.testType}/${this.quizName}.${fileType}`;
      anchor.click();
    });

    this.showFileTypes = false;
  }

  ngOnDestroy(): void {
    localStorage.removeItem("surveyGuard"); // Don't need anymore
    localStorage.removeItem("testType"); // Don't need anymore
    localStorage.removeItem("correctAnswer"); // Don't need anymore
  }
}
