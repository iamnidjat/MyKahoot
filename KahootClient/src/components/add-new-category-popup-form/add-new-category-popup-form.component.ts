import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CreatingQuizOptionFormComponent} from "../creating-quiz-option-form/creating-quiz-option-form.component";
import Swal from "sweetalert2";
import {CheckDataService} from "../../services/check-data.service";

@Component({
  selector: 'app-add-new-category-popup-form',
  templateUrl: './add-new-category-popup-form.component.html',
  styleUrls: ['./add-new-category-popup-form.component.css']
})
export class AddNewCategoryPopupFormComponent{
  public createNewCategoryFlag: boolean = false;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('CategoryType') categoryType!: ElementRef;
  public isCatNameUsed: boolean = false;

  constructor(private el: ElementRef, private checkService: CheckDataService) {}

  public closeModal(): void {
    this.close.emit();
  }

  public async CreateNewCategoryAsync(): Promise<void> {
    if (this.categoryType.nativeElement.value !== "") {
      if (await this.checkService.IsCatNameUsed(this.categoryType.nativeElement.value)) {
        this.isCatNameUsed = true;
      } else {
        this.createNewCategoryFlag = true;

        this.closeModal();

        localStorage.setItem("MyCategory", this.categoryType.nativeElement.value); // my new category
      }
    } else {
      Swal.fire('Oops', 'Specify a category of a test!', 'error');
    }
  }
}
