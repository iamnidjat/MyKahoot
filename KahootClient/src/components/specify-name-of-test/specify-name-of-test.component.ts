import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CheckDataService} from "../../services/check-data.service";

@Component({
  selector: 'app-specify-name-of-test',
  templateUrl: './specify-name-of-test.component.html',
  styleUrls: ['./specify-name-of-test.component.css']
})
export class SpecifyNameOfTestComponent {
  @ViewChild('TestName') TestName!: ElementRef;
  @Input() public chooseQuizTypeFlag: boolean = false;
  public isQuizNameUsed: boolean = false;

  constructor(private el: ElementRef, private router: Router,
              private childComponent: CreatingQuizOptionFormComponent,
              private checkService: CheckDataService) {}

  public ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.childComponent.flagOfCustomCategory = false;
    this.childComponent.flagOfExistingCategory = false;
  }

  public async CreateNewTest(): Promise<void>{
    if (this.TestName.nativeElement.value != "")
    {
      if (await this.checkService.IsQuizNameUsed(localStorage.getItem("CategoryType") ||
        localStorage.getItem("ManualCategory")!, this.TestName.nativeElement.value)) {
        this.isQuizNameUsed = true;
      }
      else {
        let modal = this.el.nativeElement.querySelector(".modal");

        modal.style.display = "none";

        this.chooseQuizTypeFlag = true;

        localStorage.setItem("MyTestName", this.TestName.nativeElement.value);
        localStorage.removeItem("IsQuizNameUsed"); // Don't need anymore
      }
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }
}
