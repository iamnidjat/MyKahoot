import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizModel} from "../../models/QuizModel";
import {NavigationExtras, Router} from "@angular/router";
import {CheckDataService} from "../../services/check-data.service";

const API_URL: string = "https://localhost:7176/api/v1/Statistics/";

@Component({
  selector: 'app-stats-form',
  templateUrl: './stats-form.component.html',
  styleUrls: ['./stats-form.component.css']
})
export class StatsFormComponent implements OnInit, OnDestroy{
  public info: QuizModel[] = [];
  public level: string = "";
  public quizType: string = "";
  public catType: string = "";
  public mode: string = "";
  private counter: number = 0;

  constructor(private router: Router, private checkData: CheckDataService) {}

  async ngOnInit(): Promise<void> { //
    this.catType = localStorage.getItem("categoryName")!;
    this.quizType = localStorage.getItem("QuizType")!;
    this.level = localStorage.getItem("SLevel")!
    this.mode = await this.checkData.GetQuizMode(this.catType, this.quizType) ? 'private' : 'public';
    await this.downloadResultsAsync();
  }

  public async downloadResultsAsync(): Promise<void>{
    await fetch(API_URL + `DownloadResult/${parseInt(localStorage.getItem("userId")!)}?catType=${this.catType}&quizType=${this.quizType}&level=${this.level}`, {
      method: "GET"
    }).then(text => text.json()).then(data => {
      console.log("data", data);
      Object.keys(data).forEach((key) =>
      {
        this.info.push(data[key]);
      });
    });
  }

  public toBarchartForm(): void {
    this.counter++;
    this.router.navigate(['/app/barchart-form']);
  }

  public toQuizHistory(): void {
    const navigationExtras: NavigationExtras  = {
      queryParams: {
        'categoryName': this.catType,
        'quizName': this.quizType,
      }
    };

    this.router.navigate(['/app/quizHistory'], navigationExtras);
  }

  public backOptions(): void{
    this.router.navigate(['/app/profile-form']);
  }

  ngOnDestroy(): void {
    if (this.counter === 0)
    {
      localStorage.removeItem("SLevel"); // Don't need anymore
      localStorage.removeItem("categoryName"); // Don't need anymore
      localStorage.removeItem("QuizType"); // Don't need anymore
      localStorage.removeItem("QuizMode"); // Don't need anymore
    }
  }
}
