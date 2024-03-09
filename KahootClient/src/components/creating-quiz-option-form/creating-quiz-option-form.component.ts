import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {DownloadCategoriesSharedService} from "../../services/download-categories-shared.service";
import {FilterCollectionsService} from "../../services/filter-collections.service";

@Component({
  selector: 'app-creating-quiz-option-form',
  templateUrl: './creating-quiz-option-form.component.html',
  styleUrls: ['./creating-quiz-option-form.component.css']
})

export class CreatingQuizOptionFormComponent implements AfterViewInit, OnInit{
  @Input() public flagOfCustomCategory: boolean = false;
  @Input() public flagOfExistingCategory: boolean = false;
  public categories: CreatedQuiz[] = [];
  public searchText: string = '';

  constructor(private router: Router, private downloadCategories: DownloadCategoriesSharedService,
              private filter: FilterCollectionsService) {}

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
        localStorage.setItem("CategoryType", elemRef.id);
        break;
      default:
        localStorage.setItem("ManualCategory", elemRef.id);
    }

    this.flagOfExistingCategory = true;
  }

  public openModalWindow(): void {
    this.flagOfCustomCategory = true;
  }

  ngAfterViewInit(): void {
    this.downloadCategories.downloadCategories(this.categories);
  }

  public filterCategories(): CreatedQuiz[] {
    return this.filter.filterCategories(this.categories, this.searchText);
  }

  ngOnInit(): void { // !
    // localStorage.removeItem("ProgrammingC");
    // localStorage.removeItem("MathC");
    // localStorage.removeItem("LogicsC");
    // localStorage.removeItem("MixedTestC");
  }
}
