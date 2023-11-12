import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-field-level-form',
  templateUrl: './choose-field-level-form.component.html',
  styleUrls: ['./choose-field-level-form.component.css']
})
export class ChooseFieldLevelFormComponent implements OnDestroy{
  constructor(private router: Router) {
  }

  public Exit(): void{
    this.router.navigate(['app/tests-list-stats-form']);
  }

  public ChooseLevel(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId) {
      case "easy":
        localStorage.setItem("SLevel", "easy");
        localStorage.setItem("BLevel", "easy");
        break;
      case "medium":
        localStorage.setItem("SLevel", "medium");
        localStorage.setItem("BLevel", "medium");
        break;
      case "hard":
        localStorage.setItem("SLevel", "hard");
        localStorage.setItem("BLevel", "hard");
        break;
    }

    if (localStorage.getItem("ToStats") != null)
    {
      localStorage.removeItem("ToStats");
      this.router.navigate([`/app/stats-form`]);
    }
    else
    {
      this.router.navigate([`/app/top10-form`]);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem("TMixedTest");
    localStorage.removeItem("TProgramming");
    localStorage.removeItem("TMath");
    localStorage.removeItem("TLogics");
  }
}
