import {Component, OnInit} from '@angular/core';
import {QuizModel} from "../../models/QuizModel";

const API_URL: string = "https://localhost:7176/api/v1/Statistics/";

@Component({
  selector: 'app-top10-form',
  templateUrl: './top10-form.component.html',
  styleUrls: ['./top10-form.component.css']
})

export class Top10FormComponent implements OnInit{
  public info: QuizModel[] = [];
  public quizType: string = '';
  public catType: string = '';
  public level: string = '';

  ngOnInit(): void {
    this.catType = localStorage.getItem("categoryName")!;
    this.quizType = localStorage.getItem("QuizType")!;
    this.level = localStorage.getItem("SLevel")!;
    this.DownloadResults();

    localStorage.removeItem("SLevel"); // Don't need anymore
    localStorage.removeItem("categoryName"); // Don't need anymore
    localStorage.removeItem("QuizType"); // Don't need anymore
  }

  public async DownloadResults(): Promise<void>{
    await fetch(API_URL + `DownloadResults?catType=${this.catType}&quizType=${this.quizType}&level=${this.level}`, {
      method: "GET"
    }).then(text => text.json()).then(data => {
      Object.keys(data).forEach((key) =>
      {
        this.info.push(data[key]);
      });
    });
  }
}
