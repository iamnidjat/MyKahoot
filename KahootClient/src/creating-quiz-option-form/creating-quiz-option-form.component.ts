import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddNewCategoryPopupFormComponent} from "../add-new-category-popup-form/add-new-category-popup-form.component";

@Component({
  selector: 'app-creating-quiz-option-form',
  templateUrl: './creating-quiz-option-form.component.html',
  styleUrls: ['./creating-quiz-option-form.component.css']
})
export class CreatingQuizOptionFormComponent {
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;

  constructor(private router: Router, private dialogRef : MatDialog) {
    localStorage.removeItem("ProgrammingC");
    localStorage.removeItem("MathC");
    localStorage.removeItem("LogicsC");
    localStorage.removeItem("MixedTestC");
  }
  public BackOptions(): void{
      this.router.navigate(['/app/player-options-form']);
  }

  public ToCreatingQuizForm(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
    {
      case "mixed-test":
        localStorage.setItem("MixedTestC",this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("ProgrammingC",this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("MathC",this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("LogicsC",this.nameKey4.nativeElement.innerText);
        break;
    }

    this.router.navigate([`/app/creating-test-form`]);
  }

  public OpenModalWindow(): any{
      this.dialogRef.open(AddNewCategoryPopupFormComponent);
  }
}
