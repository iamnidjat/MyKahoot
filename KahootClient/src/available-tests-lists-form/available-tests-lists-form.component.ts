import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {CreatedQuiz} from "../CreatedQuiz";
import {Router} from "@angular/router";

@Component({
  selector: 'app-available-tests-lists-form',
  templateUrl: './available-tests-lists-form.component.html',
  styleUrls: ['./available-tests-lists-form.component.css']
})

export class AvailableTestsListsFormComponent implements AfterViewInit, OnDestroy{
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;
  private url: string = "https://localhost:7176/api/v1/Quiz/";
  public quizzes: CreatedQuiz[] = [];
  public testType: string = "";

  constructor(private router: Router) {
    localStorage.removeItem("surveyGuard");

    if (localStorage.getItem("DMixedTest") !== null)
    {
      this.testType = "MixedTest";
    }
    if (localStorage.getItem("DProgramming") !== null)
    {
      this.testType = "Programming";
    }
    if (localStorage.getItem("DMath") !== null)
    {
      this.testType = "Math";
    }
    if (localStorage.getItem("DLogics") !== null)
    {
      this.testType = "Logics";
    }
  }

  ngAfterViewInit(): void {
    this.downloadQuizzes(this.quizzes);
  }

  public downloadQuizzes(quizzes: CreatedQuiz[]): void{
    fetch(this.url + `GetTestsList?categoryName=${localStorage.getItem("categoryName")}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        quizzes.push(data[key]);
      });
    })
  }

  public BackOptions(): void{
    if (localStorage.getItem("Guest") !== null)
    {
      this.router.navigate(['/app/auth-form']);
      localStorage.removeItem("Guest");
    }
    else
    {
      this.router.navigate(['/app/player-survey-choosing-form']);
    }
  }

  public ToRulesForm(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

     switch (elementId)
    {
      case "mixed-test":
        localStorage.setItem("TMixedTest", this.nameKey.nativeElement.innerText);
        localStorage.setItem("TestName", this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("TProgramming", this.nameKey2.nativeElement.innerText);
        localStorage.setItem("TestName", this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("TMath", this.nameKey3.nativeElement.innerText);
        localStorage.setItem("TestName", this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("TLogics", this.nameKey4.nativeElement.innerText);
        localStorage.setItem("TestName", this.nameKey4.nativeElement.innerText);
        break;
      default:
        localStorage.setItem("TestName", elementId);
        break;
    }

    localStorage.setItem("surveyGuard", "guard");

    this.router.navigate([`/app/choose-level-form`]);
  }

  ngOnDestroy(): void {
    localStorage.removeItem("DMixedTest");
    localStorage.removeItem("DProgramming");
    localStorage.removeItem("DMath");
    localStorage.removeItem("DLogics");
  }
}
