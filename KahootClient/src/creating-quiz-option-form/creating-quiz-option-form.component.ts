import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PlayerSurveyChoosingFormComponent} from "../player-survey-choosing-form/player-survey-choosing-form.component";
import {CreatedQuiz} from "../CreatedQuiz";

@Component({
  selector: 'app-creating-quiz-option-form',
  templateUrl: './creating-quiz-option-form.component.html',
  styleUrls: ['./creating-quiz-option-form.component.css']
})

export class CreatingQuizOptionFormComponent implements AfterViewInit{
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;
  flag: boolean = false;
  flag2: boolean = false;
  public categories: CreatedQuiz[] = [];

  constructor(private router: Router, private variable: PlayerSurveyChoosingFormComponent) {
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
        localStorage.setItem("MixedTestC", this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("ProgrammingC", this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("MathC", this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("LogicsC", this.nameKey4.nativeElement.innerText);
        break;
      default:
        localStorage.setItem("ManualCategory", elementId);
        break;
    }

    this.flag2 = true;
  }

  OpenModalWindow(): any{
    this.flag = true;
  }

  ngAfterViewInit(): void {
    this.variable.downloadCategories(this.categories);
  }
}
