import {Component, OnInit} from '@angular/core';
import {QuizModel} from "../QuizModel";

@Component({
  selector: 'app-stats-form',
  templateUrl: './stats-form.component.html',
  styleUrls: ['./stats-form.component.css']
})
export class StatsFormComponent implements OnInit{
  public info: QuizModel[] = [];
  public url: string = "https://localhost:7176/api/v1/Statistics/";

  constructor() {
  }

  ngOnInit(): void {
    this.DownloadResults();
  }

  public DownloadResults(): any{
    fetch(this.url + `DownloadResult/${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET"
    }).then(text => text.json()).then(data => {
      Object.keys(data).forEach((key) =>
      {
        this.info.push(data[key]);
      });
    });
  }
}
