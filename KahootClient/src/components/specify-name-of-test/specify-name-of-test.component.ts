import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('TestName') TestName!: ElementRef;
  public flag: boolean = false;
  public isQuizNameUsed: boolean = false;

  constructor(private el: ElementRef, private checkService: CheckDataService) {}

  public closeModal(): void {
    this.close.emit();
  }

  public async CreateNewTest(): Promise<void>{
    if (this.TestName.nativeElement.value != "")
    {
      if (await this.checkService.IsQuizNameUsed(localStorage.getItem("CategoryType") ||
        localStorage.getItem("ManualCategory")!, this.TestName.nativeElement.value)) {
        this.isQuizNameUsed = true;
      } else {
        this.closeModal();

        this.flag = true;

        localStorage.setItem("MyTestName", this.TestName.nativeElement.value);
      }
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }
}
