import {Component, OnInit} from '@angular/core';
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {NavigationExtras, Router} from "@angular/router";
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-your-quizzes-form',
  templateUrl: './your-quizzes-form.component.html',
  styleUrls: ['./your-quizzes-form.component.css']
})
export class YourQuizzesFormComponent implements OnInit{
  public categories: CreatedQuiz[] = [];
  public p: number = 1;
  public paginationId: string = 'unique-pagination-id';
  public searchText: string = '';
  public flag: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.downloadCategories(this.categories).then(() => {
      if (this.categories.length == 0) {
        this.flag = true;
      }
    });
  }

  public BackOptions(): void{
    this.router.navigate(['/app/profile-form']);
  }

  public filterCategories(): CreatedQuiz[] {
    return this.categories.filter(category =>
      category.categoryName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      category.quizName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  private async downloadCategories(categories: CreatedQuiz[]): Promise<void>{
    await fetch(API_URL + `DownloadMyQuizzes?userId=${localStorage.getItem("userId")!}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        categories.push(data[key]);
      });
    })
  }

  private async deleteYourQuizzes(categoryName: string, testName: string): Promise<void>{
    await fetch(API_URL + `DeleteQuiz?categoryName=${categoryName}&testName=${testName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.categories = this.categories.filter((cat) => {
      return cat.categoryName !== categoryName && cat.quizName !== testName;
    });
  }

  public confirmDelete(categoryName: string, quizName: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the quiz "${quizName}"`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.deleteYourQuizzes(categoryName, quizName);
        Swal.fire(
          'Deleted',
          `You deleted your "${quizName}" quiz`,
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

  public ToUpdateQuizForm(quizName: string, categoryName: string): void{
    localStorage.setItem("TestNameForUpdating", quizName);
    localStorage.setItem("CatNameForUpdating", categoryName);

    const navigationExtras: NavigationExtras = {
      queryParams: { 'categoryName': categoryName, 'quizName': quizName }
    };
    this.router.navigate(['/app/update-quiz-form'], navigationExtras);
  }

  public ToWatchQuizForm(quizName: string, categoryName: string): void{
    localStorage.setItem("TestNameForWatching", quizName);
    localStorage.setItem("CatNameForWatching", categoryName);

    const navigationExtras: NavigationExtras = {
      queryParams: { 'categoryName': categoryName, 'quizName': quizName }
    };
    this.router.navigate(['/app/watch-quiz-form'], navigationExtras);
  }

  public ToCreatedQuizStatsForm(categoryId: number, quizName: string, categoryName: string): void{
    const navigationExtras: NavigationExtras = {
      queryParams: { 'id': categoryId, 'categoryName': categoryName, 'quizName': quizName }
    };
    this.router.navigate(['/app/created-quiz-stats-form'], navigationExtras);
  }
}
