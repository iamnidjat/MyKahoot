import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizModel} from "../../models/QuizModel";
import {Router} from "@angular/router";
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

  ngOnInit(): void {
    this.catType = localStorage.getItem("categoryName")!;
    this.quizType = localStorage.getItem("QuizType")!;
    this.level = localStorage.getItem("SLevel")!
    this.mode = this.checkData.GetQuizMode(this.catType, this.quizType) ? 'private' : 'public';
    this.DownloadResults();
  }

  public async DownloadResults(): Promise<void>{
    await fetch(API_URL + `DownloadResult/${parseInt(localStorage.getItem("userId")!)}?userId=${parseInt(localStorage.getItem("userId")!)}&catType=${this.catType}&quizType=${this.quizType}&level=${this.level}`, {
      method: "GET"
    }).then(text => text.json()).then(data => {
      Object.keys(data).forEach((key) =>
      {
        this.info.push(data[key]);
      });
    });
  }

  ToBarchartForm(): void{
    this.counter++;
    this.router.navigate(['/app/barchart-form']);
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
