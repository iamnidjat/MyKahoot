import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {interval} from "rxjs";
import {QuizModel} from "../../models/QuizModel";
import {QuestionService} from "../../services/question.service";
import {DownloadQuizService} from "../../services/download-quiz.service";
import {QuizHistoryService} from "../../services/quiz-history.service";

const API_URL: string = "https://localhost:7176/api/v1/Statistics/";
const API_URL2: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-test-process',
  templateUrl: './test-process.component.html',
  styleUrls: ['./test-process.component.css']
})
export class TestProcessComponent implements OnInit, OnDestroy{
  @Input() public testType: string = ""; // category
  @Input() public quizName: string = "";
  public name: string = ""; // username
  public questionList: any = []; // questions from json file
  public questions: any = []; // questions from backend
  public currentQuestion: number = 0;
  public points: number = 0;
  public counter: number = 60; // timer
  public correctAnswersCount: number = 0;
  public inCorrectAnswersCount: number = 0;
  public skippedQuestionsCount: number = 0;
  public correctAnswersCountFlag: boolean = false;
  public inCorrectAnswersCountFlag: boolean = false;
  public skippedQuestionsCountFlag: boolean = false;
  public averageResponseTime: number = 0;
  public questionStartTime: number = 0;
  public responseTimes: number[] = [];
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
              private documentService: DownloadQuizService, private quizHistoryService: QuizHistoryService) {}

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
      this.getTestData();
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

  public async getTestData(): Promise<void> {
    await fetch(API_URL2 + `GetTestData?catName=${this.testType}&quizName=${this.quizName}&questionNumber=${this.currentQuestion + 1}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let testFormat = JSON.parse(JSON.stringify(data));
      localStorage.setItem("testType", JSON.stringify(Object.values(testFormat)[3]));
    });

    this.testFormat = localStorage.getItem("testType")!.slice(1, localStorage.getItem('testType')!.length - 1);
  }

  public async getCorrectAnswer(): Promise<void> {
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
      console.log(data);
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

  public async nextQuestion(): Promise<void> {
    await this.getCorrectAnswer(); // for getting a correct answer when a user didn't answer a question
    await this.quizHistoryService.AddQuizHistoryAsync(this.testType, this.quizName, this.currentQuestion + 1,
      parseInt(localStorage.getItem("correctAnswer")!), -1, parseInt(localStorage.getItem("userId")!));
    this.currentQuestion++;
    this.skippedQuestionsCount++;
    this.skippedQuestionsCountFlag = true;
    this.correctAnswersCountFlag = false;
    this.inCorrectAnswersCountFlag = false;
    this.resetCounter();
    this.getProgressPercent();
    await this.getTestData(); // for getting a test type for the next question
  }

  public async previousQuestion(): Promise<void> {
    await this.quizHistoryService.RemoveUserAnswerAsync(this.testType, this.quizName, this.currentQuestion);
    this.currentQuestion--;
    this.resetCounter();
    this.getProgressPercent();

    if (this.correctAnswersCountFlag) {
      this.correctAnswersCount--;
      this.correctAnswersCountFlag = false;
    }
    else if (this.inCorrectAnswersCountFlag) {
      this.inCorrectAnswersCount--;
      this.inCorrectAnswersCountFlag = false;
    }
    else if (this.skippedQuestionsCountFlag) {
      this.skippedQuestionsCount--;
      this.skippedQuestionsCountFlag = false;
    }

    this.responseTimes.pop(); // for eliminating the last response time
    await this.getTestData(); // for getting a test type for the previous question
  }

  public answer(currentQno: number, option: any): void {
    this.isActive = true;

    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
      this.calculateAverageResponseTime();
      this.feedbackGenerator();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswersCount++;
      this.correctAnswersCountFlag = true;
      this.inCorrectAnswersCountFlag = false;
      this.skippedQuestionsCountFlag = false;
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
        this.inCorrectAnswersCount++;
        this.inCorrectAnswersCountFlag = true;
        this.correctAnswersCountFlag = false;
        this.skippedQuestionsCountFlag = false;
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
      }, 1000);
      this.points -= 10;
    }

    this.quizHistoryService.AddQuizHistoryAsync(this.testType, this.quizName, this.currentQuestion + 1,
      1, 2, parseInt(localStorage.getItem("userId")!));

    const responseTime = Math.floor(new Date().getTime() / 1000) - this.questionStartTime;
    this.responseTimes.push(responseTime);
  }

  public async answer2(currentQno: number, option: any): Promise<void> {
    await this.getCorrectAnswer();
    this.isActive = true;

    if (currentQno === this.questions.length){
      this.isQuizCompleted = true;
      this.stopCounter();
      this.calculateAverageResponseTime();
      this.feedbackGenerator();
    }
    if (option == localStorage.getItem("correctAnswer")) {
      this.points += 10;
      this.correctAnswersCount++;
      this.correctAnswersCountFlag = true;
      this.inCorrectAnswersCountFlag = false;
      this.skippedQuestionsCountFlag = false;
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
        this.inCorrectAnswersCount++;
        this.inCorrectAnswersCountFlag = true;
        this.correctAnswersCountFlag = false;
        this.skippedQuestionsCountFlag = false;
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
      }, 1000);
      this.points -= 10;
    }

    await this.quizHistoryService.AddQuizHistoryAsync(this.testType, this.quizName, this.currentQuestion + 1,
      parseInt(localStorage.getItem("correctAnswer")!), option, parseInt(localStorage.getItem("userId")!));

    const responseTime = Math.floor(new Date().getTime() / 1000) - this.questionStartTime;
    this.responseTimes.push(responseTime);
  }

  public startCounter(): void {
    this.questionStartTime = Math.floor(new Date().getTime() / 1000);
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.skippedQuestionsCount++;
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

  public async resetQuiz(): Promise<void> {
    this.resetCounter();
    this.flag ? this.getAllQuestionsFromBack() : this.getAllQuestions();
    this.points = 0;
   // this.counter = 60;
    this.currentQuestion = 0;
    this.correctAnswersCount = 0;
    this.inCorrectAnswersCount = 0;
    this.skippedQuestionsCount = 0;
    this.correctAnswersCountFlag = false;
    this.inCorrectAnswersCountFlag = false;
    this.skippedQuestionsCountFlag = false;
    this.progress = "0";
    this.responseTimes = [];
    await this.quizHistoryService.RemoveUserAnswersAsync(this.testType, this.quizName);
    await this.getTestData(); // for getting a test type for the first question
  }

  public getProgressPercent(): string {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  public ToMenu(e: any): void{
    if (localStorage.getItem("Guest") === null) {
      this.saveResult(e);
      this.router.navigate(['/app/player-options-form']);
    }
    else {
      this.router.navigate(['/app/player-survey-choosing-form']);
    }
  }

  public ToStats(e: any): void{
    this.saveResult(e);
    localStorage.setItem("SLevel", this.level);
    localStorage.setItem("categoryName", this.testType);
    localStorage.setItem("QuizType", this.quizName);
    this.router.navigate(['/app/stats-form']);
  }

  private feedbackGenerator(): void { // !
    const score: number = (this.correctAnswersCount / (this.questions.length || this.questionList.length)) * 100;

    if (score <= 40) {
      this.feedback = "You have gaps in this field! Study better!";
    }
    else if (score <= 60) {
      this.feedback = "You need to improve your knowledge in this field!";
    }
    else if (score <= 80) {
      this.feedback = "Good result! You have an average score!";
    }
    else {
      this.feedback = "Keep it up! You have great knowledge in this field!";
    }
  }

  private async saveResult(e: any): Promise<void>{
    e.preventDefault();

    let quizInfo: QuizModel = { categoryName: this.testType, quizName: this.quizName, score: this.points,
      userName: localStorage.getItem("Login")!, passedDate: new Date(), isVisible: true,
      level: this.level, userId: parseInt(localStorage.getItem("userId")!),
      averageResponseTime: this.averageResponseTime, correctAnswersCount: this.correctAnswersCount,
      wrongAnswersCount: this.inCorrectAnswersCount, skippedQuestionsCount: this.skippedQuestionsCount }

    await fetch(API_URL + "UploadResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quizInfo)
    });
  }

  public downloadDocument(fileType: string): void {
    const data: string = JSON.stringify(this.questionList.length !== 0 ? this.questionList : this.questions);

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

    downloadFunction(data, this.quizName).subscribe({
      next: (blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = `${this.testType}/${this.quizName}.${fileType}`;
        anchor.click();
      },
      error: (error) => {
        console.error('Error downloading document:', error);
        // Handle error if needed
      }
    });

    this.showFileTypes = false;
  }

  private calculateAverageResponseTime(): void {
    const totalResponseTime: number = this.responseTimes.reduce((acc, curr) => acc + curr, 0);
    this.averageResponseTime = totalResponseTime / this.responseTimes.length;
  }

  ngOnDestroy(): void {
    localStorage.removeItem("surveyGuard"); // Don't need anymore
    localStorage.removeItem("testType"); // Don't need anymore
    localStorage.removeItem("correctAnswer"); // Don't need anymore
  }
}
