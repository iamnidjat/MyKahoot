import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-watch-quiz-form',
  standalone: true,
  templateUrl: './watch-quiz-form.component.html',
  imports: [
    TranslateModule,
    ScrollToTopFormComponent,
    FooterFormComponent,
    NavbarFormComponent,
    NgIf
  ],
  styleUrls: ['./watch-quiz-form.component.css']
})
export class WatchQuizFormComponent implements OnInit, OnDestroy{
  public testType: string = "";
  public catType: string = "";
  public questions: any = [];
  public currentQuestion: number = 0;
  public testFormat: string = "";

  constructor(private route: ActivatedRoute) {}

  public async GetTestData(): Promise<void> {
    await fetch(API_URL + `GetTestData?catName=${this.catType}&quizName=${this.testType}&questionNumber=${this.currentQuestion + 1}`, {
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
    await fetch(API_URL + `ReadQuestions?catName=${this.catType}&quizName=${this.testType}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("data", data);
      Object.keys(data).forEach((key) =>
      {
        this.questions.push(data[key]);
      });
    });
  }

  public async nextQuestion(): Promise<void> {
    this.currentQuestion++;
    await this.GetTestData(); // Wait for GetTestData() to complete
  }

  public async previousQuestion(): Promise<void> {
    this.currentQuestion--;
    await this.GetTestData(); // Wait for GetTestData() to complete
  }

  public async resetQuiz(): Promise<void> {
    this.currentQuestion = 0;
    await this.GetTestData(); // Wait for GetTestData() to complete
  }

  ngOnInit(): void {
    this.testType = this.route.snapshot.params['quizName'];
    this.catType = this.route.snapshot.params['catType'];
    this.GetTestData();
    this.getAllQuestionsFromBack();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('TestTypeForWatching'); // Don't need anymore
  }
}
