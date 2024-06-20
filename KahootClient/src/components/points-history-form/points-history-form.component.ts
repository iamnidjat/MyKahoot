import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {QuizModel} from "../../models/QuizModel";

const API_URL: string = "https://localhost:7176/api/v1/Statistics/";

@Component({
  selector: 'app-points-history-form',
  templateUrl: './points-history-form.component.html',
  styleUrls: ['./points-history-form.component.css']
})
export class PointsHistoryFormComponent implements OnInit{
  public pointsHistory: QuizModel[] = [];

  public async DownloadUserPointsHistory(): Promise<void>{
    await fetch(API_URL + `DownloadTopResult?userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET"
    }).then(text => text.json()).then(data => {
      console.log("points history =>", data);
      this.pointsHistory = data.map((item: any) => ({
        quizName: item.quizName,
        categoryName: item.categoryName,
        level: item.level,
        passedDate: item.passedDate,
        score: item.score,
      }));
    });
  }

  ngOnInit(): void {
    this.DownloadUserPointsHistory();
  }
}
