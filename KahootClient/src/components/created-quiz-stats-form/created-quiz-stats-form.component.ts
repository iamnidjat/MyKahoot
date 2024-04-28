import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {CreatedQuizStats} from "../../models/CreatedQuizStats";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-created-quiz-stats-form',
  templateUrl: './created-quiz-stats-form.component.html',
  styleUrls: ['./created-quiz-stats-form.component.css']
})
export class CreatedQuizStatsFormComponent {
  public categories: CreatedQuizStats[] = [];
  private catName: string = "";
  private quizName: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Access URL parameters using snapshot
     this.catName = this.route.snapshot.params['categoryName'];
     this.quizName = this.route.snapshot.params['quizName'];

     this.getCreatedQuizStats(); //
  }

  private async getCreatedQuizStats(): Promise<void> {
    await fetch(API_URL + `GetCreatedQuizStatsAsync?catName=${this.catName}&quizName=${this.quizName}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        this.categories.push(data[key]);
      });
    })
  }
}
