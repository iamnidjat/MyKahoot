import {Component, ElementRef, Input} from '@angular/core';
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-type-of-quiz-form',
  templateUrl: './choose-type-of-quiz-form.component.html',
  styleUrls: ['./choose-type-of-quiz-form.component.css']
})
export class ChooseTypeOfQuizFormComponent {
  @Input() public creatingTestProcessFlag: boolean = false;

  constructor(private el: ElementRef, private router: Router,
              private childComponent: CreatingQuizOptionFormComponent) {}

  public ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.childComponent.flagOfCustomCategory = false;
    this.childComponent.flagOfExistingCategory = false;
  }

  public ToCreatingTestProcess(format: any): void{
    switch (format.id)
    {
      case "three-answers":
        localStorage.setItem("testFormat", format.id);
        break;
      case "four-answers":
        localStorage.setItem("testFormat", format.id);
        break;
      case "true-false-answers":
        localStorage.setItem("testFormat", format.id);
        break;
    }

    this.creatingTestProcessFlag = true;

    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";
  }
}
