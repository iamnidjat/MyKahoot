import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PlayerSurveyChoosingFormComponent} from "../player-survey-choosing-form/player-survey-choosing-form.component";
import {CreatedQuiz} from "../CreatedQuiz";

@Component({
  selector: 'app-choose-field-form',
  templateUrl: './choose-field-form.component.html',
  styleUrls: ['./choose-field-form.component.css']
})
export class ChooseFieldFormComponent implements OnInit{
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;
  public categories: CreatedQuiz[] = [];

  constructor(private router: Router, private variable: PlayerSurveyChoosingFormComponent) {
  }

  ngOnInit(): void {
      this.variable.downloadCategories(this.categories);
  }

  public BackOptions(): void{
      this.router.navigate(['/app/profile-form']);
  }

  public ToTestsForm(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
    {
      case "mixed-test":
        localStorage.setItem("MixedTestS",this.nameKey.nativeElement.innerText);
        localStorage.setItem("MixedTestST",this.nameKey.nativeElement.innerText);
        localStorage.setItem("categoryNameB",this.nameKey.nativeElement.innerText);
        localStorage.setItem("categoryName", this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("ProgrammingS",this.nameKey2.nativeElement.innerText);
        localStorage.setItem("ProgrammingST",this.nameKey2.nativeElement.innerText);
        localStorage.setItem("categoryNameB",this.nameKey2.nativeElement.innerText);
        localStorage.setItem("categoryName", this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("MathS",this.nameKey3.nativeElement.innerText);
        localStorage.setItem("MathST",this.nameKey3.nativeElement.innerText);
        localStorage.setItem("categoryNameB",this.nameKey3.nativeElement.innerText);
        localStorage.setItem("categoryName", this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("LogicsS",this.nameKey4.nativeElement.innerText);
        localStorage.setItem("LogicsST",this.nameKey4.nativeElement.innerText);
        localStorage.setItem("categoryNameB",this.nameKey4.nativeElement.innerText);
        localStorage.setItem("categoryName", this.nameKey4.nativeElement.innerText);
        break;
      default:
        localStorage.setItem("AnotherTest",elementId);
        localStorage.setItem("categoryName", elementId);
        localStorage.setItem("categoryNameB", elementId);
        break;
    }

    this.router.navigate(['app/tests-list-stats-form']);
  }
}
