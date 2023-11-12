import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CreatedQuiz} from "../CreatedQuiz";
import {TestProcessComponent} from "../test-process/test-process.component";

@Component({
  selector: 'app-player-survey-choosing-form',
  templateUrl: './player-survey-choosing-form.component.html',
  styleUrls: ['./player-survey-choosing-form.component.css']
})

export class PlayerSurveyChoosingFormComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('MixedTest') nameKey!: ElementRef;
  @ViewChild('Programming') nameKey2!: ElementRef;
  @ViewChild('Math') nameKey3!: ElementRef;
  @ViewChild('Logics') nameKey4!: ElementRef;
  public variable: any;
  private url: string = "https://localhost:7176/api/v1/Quiz/";
  public categories: CreatedQuiz[] = [];

  constructor(private router: Router, private renderer: Renderer2) {
    localStorage.removeItem("Programming");
    localStorage.removeItem("Math");
    localStorage.removeItem("Logics");
    localStorage.removeItem("MixedTest");
  }

  ngOnDestroy(): void {
     // localStorage.removeItem("categoryName");
  }

  ngAfterViewInit(): void {
    this.downloadCategories(this.categories);
  }

  public downloadCategories(categories: CreatedQuiz[]): void{
    fetch(this.url + "DownloadCategory", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        categories.push(data[key]);
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
      this.router.navigate(['/app/player-options-form']);
    }
  }

  public ToQuizzesList(elemRef: any): void{
    let element = elemRef;

    let elementId = element.id;

    switch (elementId)
    {
      case "mixed-test":
        localStorage.setItem("MixedTest", this.nameKey.nativeElement.innerText);
        localStorage.setItem("DMixedTest", this.nameKey.nativeElement.innerText);
        localStorage.setItem("categoryName", this.nameKey.nativeElement.innerText);
        localStorage.setItem("MixedTestS", this.nameKey.nativeElement.innerText);
        break;
      case "programming":
        localStorage.setItem("Programming", this.nameKey2.nativeElement.innerText);
        localStorage.setItem("DProgramming", this.nameKey2.nativeElement.innerText);
        localStorage.setItem("categoryName", this.nameKey2.nativeElement.innerText);
        localStorage.setItem("ProgrammingS", this.nameKey2.nativeElement.innerText);
        break;
      case "math":
        localStorage.setItem("Math", this.nameKey3.nativeElement.innerText);
        localStorage.setItem("DMath", this.nameKey3.nativeElement.innerText);
        localStorage.setItem("categoryName", this.nameKey3.nativeElement.innerText);
        localStorage.setItem("MathS", this.nameKey3.nativeElement.innerText);
        break;
      case "logics":
        localStorage.setItem("Logics", this.nameKey4.nativeElement.innerText);
        localStorage.setItem("DLogics", this.nameKey4.nativeElement.innerText);
        localStorage.setItem("categoryName", this.nameKey4.nativeElement.innerText);
        localStorage.setItem("LogicsS", this.nameKey4.nativeElement.innerText);
        break;
      default:
        localStorage.setItem("AnotherTest", elementId);
        localStorage.setItem("categoryName", elementId);
        break;
    }

    this.router.navigate([`/app/tests-list-form`]);
  }

  ngOnInit(): void {}
}
