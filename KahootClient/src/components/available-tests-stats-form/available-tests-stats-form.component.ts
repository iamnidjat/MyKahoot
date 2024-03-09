import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {NavigationExtras, Router} from "@angular/router";
import {FilterCollectionsService} from "../../services/filter-collections.service";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-available-tests-stats-form',
  templateUrl: './available-tests-stats-form.component.html',
  styleUrls: ['./available-tests-stats-form.component.css']
})
export class AvailableTestsStatsFormComponent implements OnInit, AfterViewInit {
  @ViewChild('MixedTest') MixedTest!: ElementRef;
  @ViewChild('Programming') Programming!: ElementRef;
  @ViewChild('Math') Math!: ElementRef;
  @ViewChild('Logics') Logics!: ElementRef;
  public quizzes: CreatedQuiz[] = [];
  public testType: string = "";
  public searchText: string = '';
  public flag: boolean = false;

  constructor(private router: Router, private filter: FilterCollectionsService) {}

  ngOnInit(): void {
    this.testType = localStorage.getItem("categoryName")!;
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("ToStats") !== null) {
      this.flag = true;
      this.downloadPassedQuizzes();
    }
    else {
      this.flag = false;
      this.downloadQuizzes();
    }
  }

  private downloadPassedQuizzes(): void{
    fetch(API_URL + `GetPassedTestsList?categoryName=${localStorage.getItem("categoryName")}&userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.quizzes.length = 0;
      Object.keys(data).forEach((key) =>
      {
        this.quizzes.push(data[key]);
      });
    })
  }

  public downloadQuizzes(): void{
    fetch(API_URL + `GetTestsList?categoryName=${localStorage.getItem("categoryName")}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.quizzes.length = 0;
      Object.keys(data).forEach((key) =>
      {
        this.quizzes.push(data[key]);
      });
    })
  }

  public BackOptions(): void{
      this.router.navigate(['/app/choose-field-form']);
  }

  public ToLevelsForm(elemRef: any): void{
    localStorage.setItem("QuizType", elemRef.id);

    const navigationExtras: NavigationExtras = {
      queryParams: { 'categoryName': localStorage.getItem("categoryName"),
        'testName': localStorage.getItem("QuizType")}
    };

    this.router.navigate([`/app/choose-field-level-form`], navigationExtras);
  }

  public filterPassedQuizzes(): CreatedQuiz[] {
    return this.filter.filterPassedQuizzes(this.quizzes, this.searchText);
  }

  public filterQuizzes(): CreatedQuiz[] {
    return this.filter.filterQuizzes(this.quizzes, this.searchText, this.testType, this.flag);
  }
}
