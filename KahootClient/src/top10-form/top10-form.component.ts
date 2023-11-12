import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizModel} from "../QuizModel";

@Component({
  selector: 'app-top10-form',
  templateUrl: './top10-form.component.html',
  styleUrls: ['./top10-form.component.css']
})

export class Top10FormComponent implements OnInit, OnDestroy{
  public info: QuizModel[] = [];
  public quizType: string = '';
  public catType: string = '';
  public level: string = '';
  public url: string = "https://localhost:7176/api/v1/Statistics/";

  constructor() {
  }

  ngOnInit(): void {
    if (localStorage.getItem("MixedTestS") !== null)
    {
      this.catType = localStorage.getItem("MixedTestS")!;
    }
    if (localStorage.getItem("ProgrammingS") !== null)
    {
      this.catType = localStorage.getItem("ProgrammingS")!;
    }
    if (localStorage.getItem("MathS") !== null)
    {
      this.catType = localStorage.getItem("MathS")!;
    }
    if (localStorage.getItem("LogicsS") !== null)
    {
      this.catType = localStorage.getItem("LogicsS")!;
    }
    else{
      this.catType = localStorage.getItem("AnotherTest")!;
    }

    if (localStorage.getItem("TMixedTest") !== null)
    {
      this.quizType = localStorage.getItem("TMixedTest")!;
    }
    if (localStorage.getItem("TProgramming") !== null)
    {
      this.quizType = localStorage.getItem("TProgramming")!;
    }
    if (localStorage.getItem("TMath") !== null)
    {
      this.quizType = localStorage.getItem("TMath")!;
    }
    if (localStorage.getItem("TLogics") !== null)
    {
      this.quizType = localStorage.getItem("TLogics")!;
    }
    else{
      this.quizType = localStorage.getItem("TestName")!;
    }

    this.level = localStorage.getItem("SLevel")!
    this.DownloadResults();
  }

  public async DownloadResults(): Promise<void>{
    await fetch(this.url + `DownloadResults?catType=${this.catType}&quizType=${this.quizType}&level=${this.level}`, {
      method: "GET"
    }).then(text => text.json()).then(data => {
      Object.keys(data).forEach((key) =>
      {
        this.info.push(data[key]);
      });
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem("MixedTestS");
    localStorage.removeItem("ProgrammingS");
    localStorage.removeItem("MathS");
    localStorage.removeItem("LogicsS");
    localStorage.removeItem("TMixedTest");
    localStorage.removeItem("TProgramming");
    localStorage.removeItem("TMath");
    localStorage.removeItem("TLogics");
    localStorage.removeItem("SLevel");
  }
}
