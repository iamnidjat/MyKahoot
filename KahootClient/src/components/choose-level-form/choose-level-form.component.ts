import { Component } from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-choose-level-form',
  templateUrl: './choose-level-form.component.html',
  styleUrls: ['./choose-level-form.component.css']
})
export class ChooseLevelFormComponent {

  constructor(private router: Router) {}

  public Exit(): void{
    this.router.navigate(['/app/tests-list-form']);
  }

  public ChooseLevel(elemRef: any): void{
    localStorage.setItem("Level", elemRef.id);
    localStorage.setItem("surveyGuard", "guard");

    const navigationExtras: NavigationExtras = {
      queryParams: { 'action': 'play',
        "mode": localStorage.getItem("mode"),
        'categoryName': localStorage.getItem("categoryName"),
        'testName': localStorage.getItem("TestName"),
        'level': localStorage.getItem("Level"),
        },
      };
    this.router.navigate([`/app/rules-form`], navigationExtras);
  }
}
