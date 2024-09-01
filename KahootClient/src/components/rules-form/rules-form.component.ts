import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {Location} from "@angular/common"

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.css']
})
export class RulesFormComponent implements OnInit{
  public level: string = "";
  public action: string = "";
  constructor(private router: Router, private location: Location, private quizService: QuizService) {}

  public async toTheQuiz(): Promise<void> {
    const navigationExtras: NavigationExtras  = {
      queryParams: {
        'action': this.action,
        "mode": localStorage.getItem("mode"),
        'categoryName': localStorage.getItem("categoryName"),
        'testName': localStorage.getItem("TestName"),
        'level': localStorage.getItem("Level")
      }
    };

    if (localStorage.getItem("IsVIP") === "true") {
      if (await this.quizService.canUserPassVIPAsync(parseInt(localStorage.getItem("userId")!))) {
        await this.router.navigate(['/app/test-process-form'], navigationExtras);
      }
    }
    else {
      await this.router.navigate(['/app/test-process-form'], navigationExtras);
    }
  }

  public toChoosing(): void{
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  public backOptions(): void{
    this.location.back();
  }

  ngOnInit(): void {
    this.level = localStorage.getItem("Level")!;
    this.action = localStorage.getItem("action")!;
  }
}
