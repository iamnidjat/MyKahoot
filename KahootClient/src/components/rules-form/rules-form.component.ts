import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.css']
})
export class RulesFormComponent implements OnInit{
  public level: string = "";
  public action: string = "";

  constructor(private router: Router) {}

  toTheQuiz(): void {
    const action: string = this.action === "play" ? "play" : "watch";

    const navigationExtras: NavigationExtras  = {
      queryParams: {
        'action': action,
        "mode": localStorage.getItem("mode"),
        'categoryName': localStorage.getItem("categoryName"),
        'testName': localStorage.getItem("TestName"),
        'level': localStorage.getItem("Level")
      }
    };

    this.router.navigate(['/app/test-process-form'], navigationExtras);
  }

  toChoosing(): void{
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  ngOnInit(): void {
    this.level = localStorage.getItem("Level")!;
    this.action = localStorage.getItem("action")!;
  }
}
