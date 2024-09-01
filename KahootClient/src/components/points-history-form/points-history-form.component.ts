import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {QuizModel} from "../../models/QuizModel";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

const API_URL: string = "https://localhost:7176/api/v1/Statistics/";

@Component({
  selector: 'app-points-history-form',
  templateUrl: './points-history-form.component.html',
  styleUrls: ['./points-history-form.component.css']
})
export class PointsHistoryFormComponent implements OnInit{
  public userId: number = 0;
  public pointsHistory: QuizModel[] = [];

  constructor(private route: ActivatedRoute, private location: Location) {}

  public async DownloadUserPointsHistory(): Promise<void>{
    await fetch(API_URL + `DownloadTopResult?userId=${this.userId}`, {
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

  public backOptions(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get("userId")!);
    this.DownloadUserPointsHistory();
  }
}
