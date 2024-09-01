import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {NavigationExtras, Router} from "@angular/router";
import {FilterCollectionsService} from "../../services/filter-collections.service";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-available-tests-stats-form',
  templateUrl: './available-tests-stats-form.component.html',
  styleUrls: ['./available-tests-stats-form.component.css'],
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

  // Pagination variables
  public currentPage: number = 1;
  public pageSize: number = 3;
  public totalPages: number = 0;

  constructor(private router: Router, private filter: FilterCollectionsService) {}

  ngOnInit(): void {
    this.testType = localStorage.getItem("categoryName")!;
  }

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  private async loadCategories(): Promise<void> {
    if (localStorage.getItem("ToStats") !== null) {
      this.flag = true;
      await this.downloadPassedQuizzes();
    }
    else {
      this.flag = false;
      await this.downloadQuizzes();
    }
    this.totalPages = Math.ceil(this.quizzes.length / this.pageSize) + 1; // Update totalPages here
    if (this.quizzes.length % this.pageSize == 0) this.totalPages += 1;
  }

  // Pagination methods
  public getCurrentPageItems(): CreatedQuiz[] {
    const filteredQuizzes = this.flag ?  this.filterPassedQuizzes() : this.filterQuizzes();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredQuizzes.length);
    return filteredQuizzes.slice(startIndex, endIndex);
  }

  public setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  public getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private downloadPassedQuizzes(): void{
    fetch(API_URL + `GetPassedTestsList?categoryName=${localStorage.getItem("categoryName")}&userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("passed quizzes",data);
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

  public ToLevelsForm(elemRef: HTMLElement): void{
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
