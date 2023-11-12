import {Component, OnDestroy, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-barchart-form',
  templateUrl: './barchart-form.component.html',
  styleUrls: ['./barchart-form.component.css']
})

export class BarchartFormComponent implements OnInit, OnDestroy{
  public chart: any;
  private url: string = "https://localhost:7176/api/v1/BarChartStats/";
  private results: string[] = [];
  private dates: string[] = [];

  constructor() {
  }

  ngOnDestroy(): void {
    localStorage.removeItem("categoryNameB");
    localStorage.removeItem("BTestName");
    localStorage.removeItem("BLevel");
  }

  private async DownloadResults(): Promise<void>{
    await fetch(this.url + `DownloadResult?catType=${localStorage.getItem("categoryNameB")}
    &quizType=${localStorage.getItem("BTestName")}&level=${localStorage.getItem("BLevel")}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        this.results.push(data[key]["score"]);
        this.dates.push(data[key]["passedDate"].substring(0, 10));
      });

      localStorage.setItem("results", JSON.stringify(this.results));
      localStorage.setItem("dates", JSON.stringify(this.dates));
    });
  }

  private createChart(): void{
    let results = JSON.parse(localStorage.getItem("results")!);
    let dates = JSON.parse(localStorage.getItem("dates")!);

    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: [dates[0], dates[1], dates[2], dates[3], dates[4]],
        datasets: [
          {
            label: "Profit",
            data: [results[0], results[1], results[2], results[3], results[4]],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
          },
          y: {
            min: -200,
            max: 200
          }
        }
      }
    });

    this.chart.canvas.parentNode.style.height = '500px';
    this.chart.canvas.parentNode.style.width = '750px';
  }

  ngOnInit(): void {
    this.DownloadResults();
    this.createChart();
  }
}
