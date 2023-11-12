import {Component, ElementRef} from '@angular/core';
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-type-of-quiz-form',
  templateUrl: './choose-type-of-quiz-form.component.html',
  styleUrls: ['./choose-type-of-quiz-form.component.css']
})

export class ChooseTypeOfQuizFormComponent {
  variable: CreatingQuizOptionFormComponent;
  flag: boolean = false;
  constructor(private el: ElementRef, private router: Router, private  _variable: CreatingQuizOptionFormComponent) {
    this.variable = _variable;
  }

  ClosePopUp(): any{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.variable.flag = false;
    this.variable.flag2 = false;
  }

  ToCreatingTestProcess(format: any): any{
    let element = format;

    let elementId = element.id;

    switch (elementId)
    {
      case "three-answers":
        localStorage.setItem("testFormat", "three-answers");
        break;
      case "four-answers":
        localStorage.setItem("testFormat", "four-answers");
        break;
      case "true-false-answers":
        localStorage.setItem("testFormat", "true-false-answers");
        break;
    }

    this.flag = true;

    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";
  }
}
