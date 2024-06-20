import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Comment} from "../../models/userInteraction/Comment";
import {InteractionService} from "../../services/interaction.service";

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.css']
})
export class RulesFormComponent implements OnInit{
  public level: string = "";
  public action: string = "";

  public id: number = 1;
  constructor(private router: Router, private interactionService: InteractionService, private route: ActivatedRoute) {}

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
