import {Component} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-choose-field-level-form',
  templateUrl: './choose-field-level-form.component.html',
  styleUrls: ['./choose-field-level-form.component.css']
})
export class ChooseFieldLevelFormComponent{
  constructor(private router: Router) {}

  public Exit(): void{
    this.router.navigate(['app/tests-list-stats-form']);
  }

  public ChooseLevel(elemRef: any): void {
    localStorage.setItem('SLevel', elemRef.id);

    if (localStorage.getItem("ToStats") !== null)
    {
      localStorage.removeItem("ToStats");

      const navigationExtras: NavigationExtras = {
        queryParams: { 'action': 'myStats',
          'categoryName': localStorage.getItem("categoryName"),
          'testName': localStorage.getItem("QuizType"),
          'level': localStorage.getItem('SLevel')}
      };

      this.router.navigate([`/app/stats-form`], navigationExtras);
    }
    else
    {
      const navigationExtras: NavigationExtras = {
        queryParams: { 'action': 'top-10',
          'categoryName': localStorage.getItem("categoryName"),
          'testName': localStorage.getItem("QuizType"),
          'level': localStorage.getItem('SLevel')}
      };

      this.router.navigate([`/app/top10-form`], navigationExtras);
    }
  }
}
