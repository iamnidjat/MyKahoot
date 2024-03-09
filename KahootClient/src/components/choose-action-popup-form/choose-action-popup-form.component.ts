import {Component, ElementRef} from '@angular/core';
import {PlayerSurveyChoosingFormComponent} from "../player-survey-choosing-form/player-survey-choosing-form.component";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-choose-action-popup-form',
  templateUrl: './choose-action-popup-form.component.html',
  styleUrls: ['./choose-action-popup-form.component.css']
})
export class ChooseActionPopupFormComponent {
  constructor(private el: ElementRef, private childComponent: PlayerSurveyChoosingFormComponent,
              private router: Router) {}


  public ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.childComponent.flagOfAction = false;
  }

  public ToPreview(): void {
    this.childComponent.flagOfAction = false;
    localStorage.setItem("action", "watch");
    // Navigate to the tests-list-form with parameters
    const navigationExtras: NavigationExtras = {
      queryParams: { 'action': 'watch',
        'categoryName': localStorage.getItem("categoryName") }
    };

    this.router.navigate(['/app/tests-list-form'], navigationExtras);
  }

  public ToPlay(): void {
    this.childComponent.flagOfAction = false;
    localStorage.setItem("action", "play");
    // Navigate to the tests-list-form with parameters
    const navigationExtras: NavigationExtras = {
      queryParams: { 'action': 'play',
        'categoryName': localStorage.getItem("categoryName") }
    };

    this.router.navigate(['/app/tests-list-form'], navigationExtras);
  }
}
