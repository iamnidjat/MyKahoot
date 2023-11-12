import {Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-new-category-popup-form',
  templateUrl: './add-new-category-popup-form.component.html',
  styleUrls: ['./add-new-category-popup-form.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class AddNewCategoryPopupFormComponent{
  flag: boolean = false;
  variable: CreatingQuizOptionFormComponent;
  @ViewChild('CategoryType') CategoryType!: ElementRef;

  constructor(private el: ElementRef,  _variable: CreatingQuizOptionFormComponent) {
    this.variable = _variable;
  }

  ClosePopUp(): any{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.variable.flag = false;
  }

  CreateNewCategory(): any{
    if (this.CategoryType.nativeElement.value != "")
    {
      this.flag = true;

      let modal = this.el.nativeElement.querySelector(".modal");

      modal.style.display = "none";

      localStorage.setItem("CategoryType", this.CategoryType.nativeElement.value);
    }
    else
    {
      Swal.fire('Oops', 'Specify a category of a test!', 'error');
    }
  }
}
