import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {DownloadCategoriesSharedService} from "../../services/download-categories-shared.service";
import {FilterCollectionsService} from "../../services/filter-collections.service";

@Component({
  selector: 'app-creating-quiz-option-form',
  templateUrl: './creating-quiz-option-form.component.html',
  styleUrls: ['./creating-quiz-option-form.component.css']
})

export class CreatingQuizOptionFormComponent implements AfterViewInit {
  public flagOfCustomCategory: boolean = false;
  public flagOfExistingCategory: boolean = false;
  public categories: CreatedQuiz[] = [];
  public searchText: string = '';

  // Pagination variables
  public currentPage: number = 1;
  public pageSize: number = 3;
  public totalPages: number = 0;

  constructor(private router: Router, private downloadCategories: DownloadCategoriesSharedService,
              private filter: FilterCollectionsService) {}

  private async loadCategories(): Promise<void> {
    await this.downloadCategories.downloadCategories(this.categories);
    this.totalPages = Math.ceil(this.categories.length / this.pageSize) + 1; // Update totalPages here
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

  public backOptions(): void{
      this.router.navigate(['/app/player-options-form']);
  }

  public toCreatingQuizForm(elemRef: any): void{
    switch (elemRef.id)
    {
      case "Mixed Test":
      case "Programming":
      case "Math":
      case "Logics":
        localStorage.setItem("CategoryType", elemRef.id); // default categories
        break;
      default:
        localStorage.setItem("ManualCategory", elemRef.id); // my categories
    }

    this.flagOfExistingCategory = true;

    alert(localStorage.getItem("ManualCategory"));
  }

  public openModalWindow(): void {
    this.flagOfCustomCategory = true;
  }

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  public filterCategories(): CreatedQuiz[] {
    return this.filter.filterCategories(this.categories, this.searchText);
  }
}
