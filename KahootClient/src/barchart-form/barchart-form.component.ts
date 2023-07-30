import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-barchart-form',
  templateUrl: './barchart-form.component.html',
  styleUrls: ['./barchart-form.component.css']
})

export class BarchartFormComponent implements OnInit{
  public chart: any;
  private url: string = "https://localhost:7176/api/v1/BarChartStats/";
  private results: string[] = [];
  private dates: string[] = [];

  constructor() {
  }

  private DownloadResults(): void{
    fetch(this.url + `DownloadResult?quizType=Programming`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      // Object.keys(data).forEach((key) =>
      // {
      //   this.results.push(data[key]["score"]);
      //   this.dates.push(data[key]["passedDate"].substring(0, 10));
      // });
      localStorage.setItem("score1", JSON.stringify(Object.values(data[0]["score"])));
      localStorage.setItem("score2", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[1]["score"])))));
      localStorage.setItem("score3", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[2]["score"])))));
      localStorage.setItem("score4", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[3]["score"])))));
      localStorage.setItem("score5", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[4]["score"])))));
      localStorage.setItem("date1", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[0]["passedDate"])))));
      localStorage.setItem("date2", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[1]["passedDate"])))));
      localStorage.setItem("date3", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[2]["passedDate"])))));
      localStorage.setItem("date4", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[3]["passedDate"])))));
      localStorage.setItem("date5", JSON.stringify(Object.values(JSON.parse(JSON.stringify(data[4]["passedDate"])))));
    });
  }

  private createChart(): void{
    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
        //   '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17'],
        // labels: [this.dates[0], this.dates[1], this.dates[2], this.dates[3], this.dates[4]],
        labels: [localStorage.getItem("score1"), localStorage.getItem("score2"), localStorage.getItem("score3"), localStorage.getItem("score4"),
          localStorage.getItem("score5")],
        datasets: [
          {
            label: "Profit",
            // data: ['542', '542', '536', '327', '17',
            //   '0.00', '538', '541'],
            data: [localStorage.getItem("date1"), localStorage.getItem("date2"), localStorage.getItem("date3"), localStorage.getItem("date4"),
      localStorage.getItem("date5")],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
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
