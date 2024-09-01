import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {GettingDataService} from "../../services/getting-data.service";
import {ManipulatingDataService} from "../../services/manipulating-data.service";
import {FilteringDataService} from "../../services/filtering-data.service";
import {Router} from "@angular/router";
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {FormsModule} from "@angular/forms";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {Location, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {TranslateModule} from "@ngx-translate/core";
import Swal from "sweetalert2";

@Component({
  selector: 'app-quizzes-list-form',
  standalone: true,
  imports: [
    FooterFormComponent,
    FormsModule,
    NavbarFormComponent,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    ScrollToTopFormComponent,
    TranslateModule
  ],
  templateUrl: './quizzes-list-form.component.html',
  styleUrl: './quizzes-list-form.component.css'
})
export class QuizzesListFormComponent implements OnInit{
  public quizzes: CreatedQuiz[] = [];
  public flag: boolean = false;
  public searchText: string = '';
  public p: number = 1;
  public paginationId: string = 'unique-pagination-id';
  constructor(private gettingDataService: GettingDataService, private manipulatingDataService: ManipulatingDataService,
              private filteringDataService: FilteringDataService, private router: Router, private location: Location) {}

  public async GetQuizzesAsync(): Promise<void> {
    this.quizzes = await this.gettingDataService.GetQuizzesAsync();
    if (this.quizzes.length === 0) {
      this.flag = true;
    }

    console.log("quizzes", this.quizzes);
  }

  public filterQuizzes(): CreatedQuiz[] {
    return this.filteringDataService.filterQuizzes(this.quizzes, this.searchText);
  }

  public confirmDelete(quizId: number, quizName: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the quiz "${quizName}"`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await this.deleteQuizAsync(quizId);
        Swal.fire(
          'Deleted',
          `You deleted the "${quizName}" quiz`,
          'info'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your quiz is safe :)',
          'info'
        );
      }
    });
  }

  private async deleteQuizAsync(quizId: number): Promise<void> {
    await this.manipulatingDataService.deleteQuizAsync(quizId);
    this.quizzes = this.quizzes.filter((quiz) => quiz.id !== quizId);
  }

  public onWatchQuizClick(catType: string, quizName: string): void {
    this.router.navigate([`/app/watching-quiz/${catType}/${quizName}`]);
  }

  public backOptions(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.GetQuizzesAsync();
  }
}
