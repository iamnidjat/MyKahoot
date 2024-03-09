import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
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
  @ViewChild('MixedTest') MixedTest!: ElementRef;
  @ViewChild('Programming') Programming!: ElementRef;
  @ViewChild('Math') Math!: ElementRef;
  @ViewChild('Logics') Logics!: ElementRef;
  public categories: CreatedQuiz[] = [];
  public flagOfAction: boolean = false;
  public searchText: string = '';

  constructor(private router: Router, private downloadCategories: DownloadCategoriesSharedService,
              private filter: FilterCollectionsService) {}

  ngAfterViewInit(): void {
    this.downloadCategories.downloadCategories(this.categories);
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
    switch (elemRef.id) {
      case "Mixed Test":
      case "Programming":
      case "Math":
      case "Logics":
        localStorage.setItem("categoryName", elemRef.id);
        break;
      default:
        localStorage.setItem("AnotherTest", elemRef.id);
        // to know (in test-process.component.ts) whether the app must get questions from back or not
        localStorage.setItem("categoryName", elemRef.id);
    }

    this.flagOfAction = true;
  }

  public filterCategories(): CreatedQuiz[] {
    return this.filter.filterCategories(this.categories, this.searchText);
  }
}
