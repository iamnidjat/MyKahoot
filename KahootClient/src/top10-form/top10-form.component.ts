import {Component, OnInit} from '@angular/core';
import {QuizModel} from "../QuizModel";

@Component({
  selector: 'app-top10-form',
  templateUrl: './top10-form.component.html',
  styleUrls: ['./top10-form.component.css']
})

export class Top10FormComponent implements OnInit{
  public info: QuizModel[] = [];
  private quizType: string = '';
  public url: string = "https://localhost:7176/api/v1/Statistics/";

  constructor() {
  }

  ngOnInit(): void {
    if (localStorage.getItem("MixedTestS") !== null)
    {
      this.quizType = localStorage.getItem("MixedTestS")!;
    }
    if (localStorage.getItem("ProgrammingS") !== null)
    {
      this.quizType = localStorage.getItem("ProgrammingS")!;
    }
    if (localStorage.getItem("MathS") !== null)
    {
      this.quizType = localStorage.getItem("MathS")!;
    }
    if (localStorage.getItem("LogicsS") !== null)
    {
      this.quizType = localStorage.getItem("LogicsS")!;
    }

    this.DownloadResults();
  }

  public DownloadResults(): any{
    fetch(this.url + `DownloadResult?quizType=${this.quizType}`, {
      method: "GET"
    }).then(text => text.json()).then(data => {
      Object.keys(data).forEach((key) =>
      {
        this.info.push(data[key]);
      });
    });
  }
}
