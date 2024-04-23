import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  constructor(private router: Router, private downloadCategories: DownloadCategoriesSharedService,
              private filter: FilterCollectionsService) {}

  ngOnInit(): void {
      this.downloadCategories.downloadCategories(this.categories);
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
