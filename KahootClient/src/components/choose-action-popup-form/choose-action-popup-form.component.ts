import {Component, ElementRef, EventEmitter, Output} from '@angular/core';
import {PlayerSurveyChoosingFormComponent} from "../player-survey-choosing-form/player-survey-choosing-form.component";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-choose-action-popup-form',
  templateUrl: './choose-action-popup-form.component.html',
  styleUrls: ['./choose-action-popup-form.component.css']
})
export class ChooseActionPopupFormComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() actionChosen = new EventEmitter<string>();
  constructor(private el: ElementRef, private childComponent: PlayerSurveyChoosingFormComponent,
              private router: Router) {}


  public ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.closePopup.emit();
  }

  public toPreview(): void {
    this.chooseAction('watch');
  }

  public toPlay(): void {
    this.chooseAction('play');
  }

  private chooseAction(action: string): void {
    localStorage.setItem("action", action);
    this.actionChosen.emit(action);
  }
}
