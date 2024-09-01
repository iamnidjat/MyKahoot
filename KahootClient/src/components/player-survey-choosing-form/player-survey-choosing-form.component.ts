import {AfterViewInit, Component} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import { CreatedQuiz } from "../../models/CreatedQuiz";
import { DownloadCategoriesSharedService } from "../../services/download-categories-shared.service";
import {FilterCollectionsService} from "../../services/filter-collections.service";

@Component({
  selector: 'app-player-survey-choosing-form',
  templateUrl: './player-survey-choosing-form.component.html',
  styleUrls: ['./player-survey-choosing-form.component.css']
})
export class PlayerSurveyChoosingFormComponent implements AfterViewInit {
  public categories: CreatedQuiz[] = [];
  public flagOfAction: boolean = false;
  public searchText: string = '';

  // Pagination variables
  public currentPage: number = 1;
  public pageSize: number = 3;
  public totalPages: number = 0;

  constructor(private router: Router, private downloadCategories: DownloadCategoriesSharedService,
              private filter: FilterCollectionsService) {}

  ngAfterViewInit(): void {
     this.loadCategories();
  }

  private async loadCategories(): Promise<void> {
    await this.downloadCategories.downloadCategories(this.categories);
    this.totalPages = Math.ceil(this.categories.length / this.pageSize) + 1; // Update totalPages here
    if (this.categories.length % this.pageSize == 0) this.totalPages += 1;
  }

  // Pagination methods
  public getCurrentPageItems(): CreatedQuiz[] {
    const filteredCategories = this.filterCategories();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredCategories.length);
    return filteredCategories.slice(startIndex, endIndex);
  }

  public setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  public getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  public backOptions(): void {
    if (localStorage.getItem("Guest") !== null) {
      this.router.navigate(['/app/auth-form']);
      localStorage.removeItem("Guest");
    }
    else {
      this.router.navigate(['/app/player-options-form']);
    }
  }

  public onQuizzesListClick(elemRef: any): void {
    localStorage.setItem("surveyGuard", "guard");
    localStorage.setItem("categoryName", elemRef.id);
    this.flagOfAction = true;
  }

  public filterCategories(): CreatedQuiz[] {
    return this.filter.filterCategories(this.categories, this.searchText);
  }

  public navigateToAction(action: string): void {
    this.flagOfAction = false;
    const navigationExtras: NavigationExtras = {
      queryParams: { 'action': action, 'categoryName': localStorage.getItem("categoryName") }
    };
    this.router.navigate(['/app/tests-list-form'], navigationExtras);
  }
}
