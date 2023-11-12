import {Component, ElementRef, Injectable, ViewChild} from '@angular/core';
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import {Router} from "@angular/router";
import {AddNewCategoryPopupFormComponent} from "../add-new-category-popup-form/add-new-category-popup-form.component";
import {ChooseTypeOfQuizFormComponent} from "../choose-type-of-quiz-form/choose-type-of-quiz-form.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-specify-name-of-test',
  templateUrl: './specify-name-of-test.component.html',
  styleUrls: ['./specify-name-of-test.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class SpecifyNameOfTestComponent {
  variable: CreatingQuizOptionFormComponent;
  @ViewChild('TestName') TestName!: ElementRef;

  constructor(private el: ElementRef,  _variable: CreatingQuizOptionFormComponent, private router: Router) {
    this.variable = _variable;
  }
  ClosePopUp(): any{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.variable.flag = false;
    this.variable.flag2 = false;
  }

  CreateNewTest(): any{
    if (this.TestName.nativeElement.value != "")
    {
      let modal = this.el.nativeElement.querySelector(".modal");

      modal.style.display = "none";

      this.router.navigate(['app/creating-test-form']);

      localStorage.setItem("TestName", this.TestName.nativeElement.value);
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }
}
