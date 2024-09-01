import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {DownloadCategoriesSharedService} from "../../services/download-categories-shared.service";
import {FilterCollectionsService} from "../../services/filter-collections.service";

@Component({
  selector: 'app-choose-field-form',
  templateUrl: './choose-field-form.component.html',
  styleUrls: ['./choose-field-form.component.css']
})
export class ChooseFieldFormComponent implements OnInit{
  public categories: CreatedQuiz[] = [];
  public searchText: string = '';

  // Pagination variables
  public currentPage: number = 1;
  public pageSize: number = 3;
  public totalPages: number = 0;

  constructor(private router: Router, private downloadCategories: DownloadCategoriesSharedService,
              private filter: FilterCollectionsService) {}

  ngOnInit(): void {
      this.loadCategories();
      localStorage.removeItem("SLevel"); // Don't need anymore
      localStorage.removeItem("categoryName"); // Don't need anymore
      localStorage.removeItem("QuizType"); // Don't need anymore
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

  public BackOptions(): void{
    this.router.navigate(['/app/profile-form']);
  }

  public ToTestsForm(elemRef: any): void{
    localStorage.setItem("categoryName", elemRef.id);

    const navigationExtras: NavigationExtras = {
      queryParams: { 'categoryName': localStorage.getItem("categoryName") }
    };

    this.router.navigate(['app/tests-list-stats-form'], navigationExtras);
  }

  public filterCategories(): CreatedQuiz[] {
    return this.filter.filterCategories(this.categories, this.searchText);
  }
}
