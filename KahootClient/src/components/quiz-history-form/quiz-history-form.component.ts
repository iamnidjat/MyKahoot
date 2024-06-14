import {Component, OnDestroy, OnInit} from '@angular/core';
import { QuizHistoryService } from "../../services/quiz-history.service";
import { QuizHistory } from "../../models/QuizHistory";
import {ActivatedRoute} from "@angular/router";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-quiz-history-form',
  templateUrl: './quiz-history-form.component.html',
  styleUrls: ['./quiz-history-form.component.css']
})
export class QuizHistoryFormComponent implements OnInit, OnDestroy{
  public name: string = localStorage.getItem("userName")!;
  public categoryName: string = "";
  public quizName: string = "";
  public quizHistory: QuizHistory[] = [];
  public questions: any = [];
  public currentQuestion: number = 0;
  public testFormat: string = "";

  constructor(private quizHistoryService: QuizHistoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.queryParams['categoryName'];
    this.quizName = this.route.snapshot.queryParams['quizName'];

    this.GetTestData();
    this.getAllQuestionsFromBack();
    this.quizHistoryService.GetQuizHistoryAsync(this.categoryName, this.quizName, this.currentQuestion + 1,parseInt(localStorage.getItem("userId")!));
  }

  public async GetTestData(): Promise<void> {
    await fetch(API_URL + `GetTestData?catName=${this.categoryName}&quizName=${this.quizName}&questionNumber=${this.currentQuestion + 1}`, {
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
    await fetch(API_URL + `ReadQuestions?catName=${this.categoryName}&quizName=${this.quizName}`, {
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
    await this.quizHistoryService.GetQuizHistoryAsync(this.categoryName, this.quizName, this.currentQuestion + 1,parseInt(localStorage.getItem("userId")!));
  }

  public async previousQuestion(): Promise<void> {
    this.currentQuestion--;
    await this.GetTestData(); // Wait for GetTestData() to complete
    await this.quizHistoryService.GetQuizHistoryAsync(this.categoryName, this.quizName, this.currentQuestion + 1,parseInt(localStorage.getItem("userId")!));
  }

  public async resetQuiz(): Promise<void> {
    this.currentQuestion = 0;
    await this.GetTestData(); // Wait for GetTestData() to complete
    await this.quizHistoryService.GetQuizHistoryAsync(this.categoryName, this.quizName, this.currentQuestion + 1,parseInt(localStorage.getItem("userId")!));
  }

  ngOnDestroy(): void {
    localStorage.removeItem('TestTypeForWatching'); // Don't need anymore
  }
}
