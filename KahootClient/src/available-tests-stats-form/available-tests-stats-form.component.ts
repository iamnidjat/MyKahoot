import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {CreatedQuiz} from "../CreatedQuiz";
import {Router} from "@angular/router";

@Component({
  selector: 'app-available-tests-stats-form',
  templateUrl: './available-tests-stats-form.component.html',
  styleUrls: ['./available-tests-stats-form.component.css']
})

export class AvailableTestsStatsFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;
  private url: string = "https://localhost:7176/api/v1/Quiz/";
  public quizzes: CreatedQuiz[] = [];
  public testType: string = "";

  constructor(private router: Router) {
    if (localStorage.getItem("MixedTestST") !== null)
    {
      this.testType = "MixedTest";
    }
    if (localStorage.getItem("ProgrammingST") !== null)
    {
      this.testType = "Programming";
    }
    if (localStorage.getItem("MathST") !== null)
    {
      this.testType = "Math";
    }
    if (localStorage.getItem("LogicsST") !== null)
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
      this.router.navigate(['/app/choose-field-form']);
  }

  public ToLevelsForm(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
    {
      case "mixed-test":
        localStorage.setItem("TMixedTest", this.nameKey.nativeElement.innerText);
        localStorage.setItem("BTestName", this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("TProgramming", this.nameKey2.nativeElement.innerText);
        localStorage.setItem("BTestName", this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("TMath", this.nameKey3.nativeElement.innerText);
        localStorage.setItem("BTestName", this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("TLogics", this.nameKey4.nativeElement.innerText);
        localStorage.setItem("BTestName", this.nameKey4.nativeElement.innerText);
        break;
      default:
        localStorage.setItem("TestName", elementId);
        localStorage.setItem("BTestName", elementId);
        break;
    }

    this.router.navigate([`/app/choose-field-level-form`]);
  }

  ngOnDestroy(): void {
    localStorage.removeItem("MixedTestST");
    localStorage.removeItem("ProgrammingST");
    localStorage.removeItem("MathST");
    localStorage.removeItem("LogicsST");
    localStorage.removeItem("categoryName");
  }
}
