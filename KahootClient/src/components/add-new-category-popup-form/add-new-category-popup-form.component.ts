import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import Swal from "sweetalert2";
import {CheckDataService} from "../../services/check-data.service";

@Component({
  selector: 'app-add-new-category-popup-form',
  templateUrl: './add-new-category-popup-form.component.html',
  styleUrls: ['./add-new-category-popup-form.component.css']
})
export class AddNewCategoryPopupFormComponent{
  @Input() public createNewCategoryFlag: boolean = false;
  @ViewChild('CategoryType') categoryType!: ElementRef;
  public isCatNameUsed: boolean = false;

  constructor(private el: ElementRef, private childComponent: CreatingQuizOptionFormComponent,
              private checkService: CheckDataService) {}

  public ClosePopUp(): void{
    let modal = this.el.nativeElement.querySelector(".modal");

    modal.style.display = "none";

    this.childComponent.flagOfCustomCategory = false;
  }

  public async CreateNewCategory(): Promise<void> {
    if (this.categoryType.nativeElement.value !== "") {
      if (await this.checkService.IsCatNameUsed(this.categoryType.nativeElement.value)) {
        this.isCatNameUsed = true;
      }
      else {
        this.createNewCategoryFlag = true;

        let modal = this.el.nativeElement.querySelector(".modal");

        modal.style.display = "none";

        localStorage.setItem("MyCategory", this.categoryType.nativeElement.value);
        localStorage.removeItem("IsCatNameUsed"); // Don't need anymore
      }
    } else {
      Swal.fire('Oops', 'Specify a category of a test!', 'error');
    }
  }
}
