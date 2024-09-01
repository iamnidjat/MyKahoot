import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {interval, Observable} from "rxjs";
import {QuizModel} from "../../models/QuizModel";
import {QuestionService} from "../../services/question.service";
import {DownloadQuizService} from "../../services/download-quiz.service";
import {QuizHistoryService} from "../../services/quiz-history.service";
import {GamificationService} from "../../services/gamification.service";
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/Statistics/";
const API_URL2: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-test-process',
  templateUrl: './test-process.component.html',
  styleUrls: ['./test-process.component.css']
})
export class TestProcessComponent implements OnInit, OnDestroy{
  public testType: string = ""; // category
  public quizName: string = ""; // quiz name
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
  public flag: boolean = false; // whether to get questions from json or back
  public testFormat: string = "";
  public level: string = "";
  public action: string = "";
  public showFileTypes: boolean = false;
  public pointsPerAnswer: number = 0;
  public feedbackFlag: boolean = false;
  public isCorrectFlag: boolean = false;
  public api: string = "https://localhost:7176";
  public isVisible: boolean = false;
  public flagForConfirmAction: boolean = false;
  public allowedToDownload: boolean = false;
  public correctAnswer: number = 0;
  public flagForDirective: boolean = false;
  public selectedOption: number | null = null;
  public isPaused: boolean = false;
  public remainingTime: number = 0; // Time left when paused
  private confirmationPromise!: Promise<boolean>;
  private confirmationResolve!: (value: boolean) => void;

  constructor(private questionService: QuestionService, private router: Router,
              private documentService: DownloadQuizService, private quizHistoryService: QuizHistoryService,
              private gamificationService: GamificationService) {}

   ngOnInit(): void {
    localStorage.getItem("Guest") ? this.name = "Guest" : this.name = localStorage.getItem("Login")!;

    this.testType = localStorage.getItem("categoryName")!;
    this.quizName = localStorage.getItem("TestName")!;
    this.level = localStorage.getItem("Level")!;
    this.action = localStorage.getItem("action")!;

    if (localStorage.getItem("AnotherTest") !== null)
    {
      this.flag = true;
      localStorage.removeItem("AnotherTest"); // Don't need anymore
      this.getTestData();
    }

    this.flag ? this.getAllQuestionsFromBack() : this.getAllQuestions();

    if (this.action === "play") {
      this.startCounter();
    }
  }

  private async IsAllowedUsersToDownloadAsync(): Promise<boolean> {
    const response = await fetch(API_URL2 + `IsAllowedUsersToDownload?catName=${this.testType}&quizName=${this.quizName}`);
    const data = await response.json();
    return data;
  }
  private async getTestData(): Promise<void> {
    await fetch(API_URL2 + `GetTestData?catName=${this.testType}&quizName=${this.quizName}&questionNumber=${this.currentQuestion + 1}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      localStorage.setItem("testType", data.testFormat);
      localStorage.setItem("timeToAnswer", data.timeToAnswer);
      localStorage.setItem("pointsPerAnswer", data.points);
    });

    this.testFormat = localStorage.getItem("testType")!;
    this.counter = parseInt(localStorage.getItem("timeToAnswer")!);
    this.pointsPerAnswer = parseInt(localStorage.getItem("pointsPerAnswer")!);
    this.allowedToDownload = await this.IsAllowedUsersToDownloadAsync();
  }

  public async getCorrectAnswer(): Promise<void> {
    await fetch(API_URL2+ `GetCorrectAnswer?catName=${this.testType}&quizName=${this.quizName}&questionNumber=${this.currentQuestion + 1}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("correctAnswer", data);
    });
    this.correctAnswer = parseInt(localStorage.getItem("correctAnswer")!);
  }

  public async getAllQuestionsFromBack(): Promise<void>{
    await fetch(API_URL2 + `ReadQuestions?catName=${this.testType}&quizName=${this.quizName}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.questions = [];
      Object.keys(data).forEach((key) =>
      {
        this.questions.push(data[key]);
      });
    });
  }

  public getAllQuestions(): void {
    const questionObservable = this.questionService.getQuestionJson();
    if (questionObservable) {
      questionObservable.subscribe(
        res => {
          this.questionList = res.questions;
        },
        err => {
          console.error('Failed to load questions:', err);
        }
      );
    } else {
      console.error('Question service returned null or undefined observable.');
    }
  }

  public async nextQuestion(): Promise<void> {
    if (this.action === "play") {
      await this.quizHistoryService.AddQuizHistoryAsync(this.testType, this.quizName, this.currentQuestion + 1,
        parseInt(localStorage.getItem("correctAnswer")!), -1, parseInt(localStorage.getItem("userId")!));
      this.currentQuestion++;
      if (this.flag) {
        await this.getCorrectAnswer(); // for getting a correct answer when a user didn't answer a question
        await this.getTestData();
        // for getting a test type for the next question
      }
      this.skippedQuestionsCount++;
      this.skippedQuestionsCountFlag = true;
      localStorage.setItem(`skippedQuestionsCountFlag${this.currentQuestion}`, "true");
      this.correctAnswersCountFlag = false;
      localStorage.setItem(`correctAnswersCountFlag${this.currentQuestion}`, "false");
      this.inCorrectAnswersCountFlag = false;
      localStorage.setItem(`inCorrectAnswersCountFlag${this.currentQuestion}`, "false");
      this.resetCounter();
      this.getProgressPercent();
    }
    else {
      this.currentQuestion++;
    }
  }

  public async previousQuestion(): Promise<void> {
    if (this.action === "play") {
      this.isVisible = true;
      this.flagForConfirmAction = true;

      const data = await this.getConfirmationData();
      if (data) {
        await this.quizHistoryService.RemoveUserAnswerAsync(this.testType, this.quizName, this.currentQuestion);
        this.currentQuestion--;
        this.resetCounter();
        this.getProgressPercent();

        this.responseTimes.pop(); // for eliminating the last response time
        if (this.flag) {
          await this.getCorrectAnswer();
          await this.getTestData();
          // for getting a test type for the previous question
          if (localStorage.getItem(`correctAnswersCountFlag${this.currentQuestion + 1}`) === "true")  this.points -= this.pointsPerAnswer;
          else if (localStorage.getItem(`inCorrectAnswersCountFlag${this.currentQuestion + 1}`) === "true")  this.points += this.pointsPerAnswer;
        }
        else {
          if (localStorage.getItem(`correctAnswersCountFlag${this.currentQuestion + 1}`) === "true")  this.points -= 10;
          else if (localStorage.getItem(`inCorrectAnswersCountFlag${this.currentQuestion + 1}`) === "true")  this.points += 10;
        }

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
      }
    }
    else {
      this.currentQuestion--;
    }
  }

  private getConfirmationData(): Promise<boolean> {
    this.pauseCounter();
    this.confirmationPromise = new Promise<boolean>((resolve) => {
      this.confirmationResolve = resolve;
    });

    // Return the promise
    return this.confirmationPromise;
  }

  public handleConfirmationResponse(data: boolean): void {
    if (this.confirmationResolve) {
      this.confirmationResolve(data);
    }
  }

  public answer(currentQno: number, option: any): void {
    this.isActive = true;

    const responseTime = Math.floor(new Date().getTime() / 1000) - this.questionStartTime;
    this.responseTimes.push(responseTime);

    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
      this.calculateAverageResponseTime();
      this.feedbackFlag = true;
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswersCount++;
      this.correctAnswersCountFlag = true;
      localStorage.setItem(`correctAnswersCountFlag${currentQno}`, "true");
      this.inCorrectAnswersCountFlag = false;
      localStorage.setItem(`inCorrectAnswersCountFlag${currentQno}`, "false");
      this.skippedQuestionsCountFlag = false;
      localStorage.setItem(`skippedQuestionsCountFlag${currentQno}`, "false");
      if (this.feedbackFlag) this.feedbackGenerator();
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
        localStorage.setItem(`inCorrectAnswersCountFlag${currentQno}`, "true");
        this.correctAnswersCountFlag = false;
        localStorage.setItem(`correctAnswersCountFlag${currentQno}`, "false");
        this.skippedQuestionsCountFlag = false;
        localStorage.setItem(`skippedQuestionsCountFlag${currentQno}`, "false");
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
      }, 1000);
      this.points -= 10;
    }

    const correctIndex = this.questionList[currentQno - 1].options.findIndex((option: any) => option.correct);
    const selectedOptionIndex = this.questionList[currentQno - 1].options.findIndex((myOption: any) => myOption === option);

    this.quizHistoryService.AddQuizHistoryAsync(this.testType, this.quizName, this.currentQuestion + 1,
      correctIndex + 1, selectedOptionIndex + 1, parseInt(localStorage.getItem("userId")!));
  }

  public async answer2(currentQno: number, option: any): Promise<void> {
    this.selectedOption = option;
    await this.getCorrectAnswer();
    this.isActive = true;

    const responseTime = Math.floor(new Date().getTime() / 1000) - this.questionStartTime;
    this.responseTimes.push(responseTime);

    if (currentQno === this.questions.length){
      this.isQuizCompleted = true;
      this.stopCounter();
      this.calculateAverageResponseTime();
      this.feedbackFlag = true;
    }
    if (option == localStorage.getItem("correctAnswer")) {
      this.points += this.pointsPerAnswer;
      this.correctAnswersCount++;
      this.correctAnswersCountFlag = true;
      localStorage.setItem(`correctAnswersCountFlag${currentQno}`, "true");
      this.inCorrectAnswersCountFlag = false;
      localStorage.setItem(`inCorrectAnswersCountFlag${currentQno}`, "false");
      this.skippedQuestionsCountFlag = false;
      localStorage.setItem(`skippedQuestionsCountFlag${currentQno}`, "false");
      this.flagForDirective = true;
      this.isCorrectFlag = true;
      if (this.feedbackFlag) this.feedbackGenerator();
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
        this.isCorrectFlag = false;
        this.flagForDirective = false;
        this.selectedOption = null;
      }, 1000);
    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswersCount++;
        this.inCorrectAnswersCountFlag = true;
        localStorage.setItem(`inCorrectAnswersCountFlag${currentQno}`, "true");
        this.correctAnswersCountFlag = false;
        localStorage.setItem(`correctAnswersCountFlag${currentQno}`, "false");
        this.skippedQuestionsCountFlag = false;
        localStorage.setItem(`skippedQuestionsCountFlag${currentQno}`, "false");
        this.resetCounter();
        this.getProgressPercent();
        this.isActive = false;
        this.isCorrectFlag = false;
        this.flagForDirective = false;
        this.selectedOption = null;
      }, 1000);
      this.points -= this.pointsPerAnswer;
    }

    await this.quizHistoryService.AddQuizHistoryAsync(this.testType, this.quizName, this.currentQuestion + 1,
      parseInt(localStorage.getItem("correctAnswer")!), option, parseInt(localStorage.getItem("userId")!));
  }

  public startCounter(): void {
    this.questionStartTime = Math.floor(new Date().getTime() / 1000);
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          if (this.flag) {
            if (this.currentQuestion < this.questions.length - 1) {
              this.currentQuestion++;
              this.skippedQuestionsCount++;
              this.getTestData();
            }
            else {
              this.isQuizCompleted = true;
              this.skippedQuestionsCount++;
              this.stopCounter();
              this.calculateAverageResponseTime();
              this.feedbackFlag = true;
            }
          }
          else {
            if (this.currentQuestion < this.questionList.length) {
              this.currentQuestion++;
              this.skippedQuestionsCount++;
              this.counter = 60;
            }
            else {
              this.isQuizCompleted = true;
              this.skippedQuestionsCount++;
              this.stopCounter();
              this.calculateAverageResponseTime();
              this.feedbackFlag = true;
            }
          }
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  public stopCounter(): void {
    this.interval$.unsubscribe();
    this.remainingTime = this.counter; // Save remaining time
  }

  public pauseCounter(): void {
    if (!this.isPaused) {
      this.stopCounter();
      this.isPaused = true;
    }
  }

  public async resetCounter(): Promise<void> {
    this.stopCounter();
    if (this.flag) {
      await this.getTestData();
      // for getting a test type for the first question
    }
    else {
      this.counter = 60;
    }
    this.startCounter();
  }

  public async resetQuiz(): Promise<void> {
    if (this.action === "play") {
      this.isVisible = true;
      this.flagForConfirmAction = false;

      const data = await this.getConfirmationData();
      if (data) {
        this.resetCounter();
        this.flag ? await this.getAllQuestionsFromBack() : this.getAllQuestions();
        this.points = 0;
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
        if (this.flag) {
          await this.getTestData();
          // for getting a test type for the next question
        }
      }
      else {
        this.counter = this.remainingTime;
        this.startCounter();
      }
    }
    else {
      this.currentQuestion = 0;
    }
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

    const navigationExtras: NavigationExtras = {
      queryParams: { 'action': 'myStats',
        'categoryName': localStorage.getItem("categoryName"),
        'testName': localStorage.getItem("QuizType"),
        'level': localStorage.getItem('SLevel')}
    };

    this.router.navigate([`/app/stats-form`], navigationExtras);
  }

  private feedbackGenerator(): void {
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
      console.log("quizInfo => ", quizInfo);


    await fetch(API_URL + `UploadResult?quizId=${parseInt(localStorage.getItem("QuizId")!)}&quizCreator=${localStorage.getItem("QuizCreator")!}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quizInfo)
    });

    if (await this.gamificationService.upgradeLevelAsync())
    {
      Swal.fire('Level up', `you have increased to level ${parseInt(localStorage.getItem("userLevel")!)}`, 'info');
    }
  }

  public downloadDocument(fileType: string): void {
    const data: string = JSON.stringify(this.questionList.length !== 0 ? this.questionList : this.questions);

    const downloadFunctionMap: { [key: string]: (data: string, quizName: string) => Observable<Blob> } = {
      'docx': this.documentService.downloadDocument.bind(this.documentService),
      'txt': this.documentService.downloadTxt.bind(this.documentService),
      'json': this.documentService.downloadJson.bind(this.documentService),
    };

    const downloadFunction = downloadFunctionMap[fileType];

    if (!downloadFunction) {
      console.error('Invalid file type');
      return; // Invalid fileType
    }

    downloadFunction(data, this.quizName).subscribe({
      next: (blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = `${this.testType}/${this.quizName}.${fileType}`;
        anchor.click();
        window.URL.revokeObjectURL(downloadUrl); // Clean up URL.createObjectURL
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
    localStorage.removeItem("QuizId"); // Don't need anymore
    localStorage.removeItem("QuizCreator"); // Don't need anymore
    localStorage.removeItem("timeToAnswer"); // Don't need anymore
    localStorage.removeItem("pointsPerAnswer"); // Don't need anymore
    localStorage.removeItem("IsVIP"); // Don't need anymore
    localStorage.removeItem("mode"); // Don't need anymore
    localStorage.removeItem("TestName"); // Don't need anymore
    localStorage.removeItem("Level"); // Don't need anymore
    localStorage.removeItem("action"); // Don't need anymore
    localStorage.removeItem("allowedToDownload"); // Don't need anymore
    for (let i: number = 1; i <= this.currentQuestion; i++) // Deleting resources
    {
      localStorage.removeItem(`correctAnswersCountFlag${i}`);
      localStorage.removeItem(`inCorrectAnswersCountFlag${i}`);
      localStorage.removeItem(`skippedQuestionsCountFlag${i}`);
    }
  }
}
