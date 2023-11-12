import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-level-form',
  templateUrl: './choose-level-form.component.html',
  styleUrls: ['./choose-level-form.component.css']
})
export class ChooseLevelFormComponent {

  constructor(private router: Router) {
  }

  public Exit(): void{
    this.router.navigate(['/app/tests-list-form']);
  }

  public ChooseLevel(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId) {
      case "easy":
        localStorage.setItem("Level", "easy");
        break;
      case "medium":
        localStorage.setItem("Level", "medium");
        break;
      case "hard":
        localStorage.setItem("Level", "hard");
        break;
    }

    this.router.navigate([`/app/rules-form`]);
  }
}
