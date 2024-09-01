import {Component, OnDestroy, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';

const API_URL: string = "https://localhost:7176/api/v1/BarChartStats/";

@Component({
  selector: 'app-barchart-form',
  templateUrl: './barchart-form.component.html',
  styleUrls: ['./barchart-form.component.css']
})

export class BarchartFormComponent implements OnInit, OnDestroy{
  public chart: any;
  private results: string[] = [];
  private dates: string[] = [];

  ngOnDestroy(): void {
    localStorage.removeItem("results"); // Don't need anymore
    localStorage.removeItem("dates"); // Don't need anymore
  }

  private async downloadResults(): Promise<void>{
    await fetch(API_URL + `DownloadResult?catType=${localStorage.getItem("categoryName")}&quizType=${localStorage.getItem("QuizType")}&level=${localStorage.getItem("SLevel")}`, {
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
            label: "Result",
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
    this.downloadResults();
    this.createChart();
  }
}
