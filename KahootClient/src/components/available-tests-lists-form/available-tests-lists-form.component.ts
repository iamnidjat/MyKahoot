import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {NavigationExtras, Router} from "@angular/router";
import {FilterCollectionsService} from "../../services/filter-collections.service";
import {CheckDataService} from "../../services/check-data.service";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-available-tests-lists-form',
  templateUrl: './available-tests-lists-form.component.html',
  styleUrls: ['./available-tests-lists-form.component.css']
})
export class AvailableTestsListsFormComponent implements OnInit, AfterViewInit{
  @Input() public flagForCodeChecking: boolean = false;
  public quizzes: CreatedQuiz[] = [];
  public testType: string = "";
  public flag: boolean = false;
  public searchText: string = '';

  constructor(private router: Router, private filter: FilterCollectionsService,
              private checkData: CheckDataService) {}

  ngAfterViewInit(): void {
    this.downloadQuizzes();
  }

  public downloadQuizzes(): void{
    this.flag = false;
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

  public downloadPrivateQuizzes(): void{
    this.flag = true;
    fetch(API_URL+ `GetPrivateTestsList?categoryName=${localStorage.getItem("categoryName")}`, {
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
    localStorage.setItem("TestName", elemRef.id);

    if (!this.flag) {
      this.setModeMethod("public");
    }
    else if (this.flag && this.checkData.CheckOwnerOfPrivateTest(localStorage.getItem("categoryName")!,
      localStorage.getItem("TestName")!, localStorage.getItem("Login")!)) {
      this.setModeMethod("private");
    }
    else {
      this.flagForCodeChecking = true;
    }
  }

  public filterQuizzes(): CreatedQuiz[] {
    return this.filter.filterQuizzes(this.quizzes, this.searchText, this.testType, this.flag);
  }

  private setModeMethod(mode: string): void {
    localStorage.setItem("mode", mode);
    if (localStorage.getItem("action") === "play") {
      const navigationExtras: NavigationExtras = {
        queryParams: { 'action': 'play',
          "mode": localStorage.getItem("mode"),
          'categoryName': localStorage.getItem("categoryName"),
          'testName': localStorage.getItem("TestName")}
      };
      this.router.navigate([`/app/choose-level-form`], navigationExtras);
    }
    else {
      localStorage.setItem("surveyGuard", "guard");
      const navigationExtras: NavigationExtras = {
        queryParams: { 'action': 'watch',
          "mode": localStorage.getItem("mode"),
          'categoryName': localStorage.getItem("categoryName"),
          'testName': localStorage.getItem("TestName")}
      };
      this.router.navigate([`/app/rules-form`], navigationExtras);
    }
  }

  ngOnInit(): void {
    this.testType = localStorage.getItem("categoryName")!;
  }
}
