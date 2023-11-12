import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerSurveyChoosingFormComponent} from "../player-survey-choosing-form/player-survey-choosing-form.component";
import {CreatedQuiz} from "../CreatedQuiz";
import {Route, Router} from "@angular/router";


@Component({
  selector: 'app-your-quizzes-form',
  templateUrl: './your-quizzes-form.component.html',
  styleUrls: ['./your-quizzes-form.component.css']
})

export class YourQuizzesFormComponent implements OnInit{
  public categories: CreatedQuiz[] = [];
  private url: string = "https://localhost:7176/api/v1/Quiz/";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.downloadCategories(this.categories);
  }

  public async downloadCategories(categories: CreatedQuiz[]): Promise<void>{
    await fetch(this.url + `DownloadMyQuizzes?userId=${localStorage.getItem("userId")!}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        categories.push(data[key]);
      });
    })
  }

  public async DeleteYourQuizzes(categoryName: string, testName: string): Promise<void>{
    await fetch(this.url + `DeleteQuiz?categoryName=${categoryName}&testName=${testName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public ToUpdateQuizForm(): void{
    this.router.navigate(['/app/update-quiz-form']);
  }

  public ToWatchQuizForm(quizName: string): void{
    localStorage.setItem("TestName", quizName);
    this.router.navigate(['/app/watch-quiz-form']);
  }
}
