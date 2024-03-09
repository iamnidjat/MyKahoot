import {Component, OnInit, ViewChild} from '@angular/core';
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {NavigationExtras, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-your-quizzes-form',
  templateUrl: './your-quizzes-form.component.html',
  styleUrls: ['./your-quizzes-form.component.css']
})
export class YourQuizzesFormComponent implements OnInit{
  public categories: CreatedQuiz[] = [];
  private url: string = "https://localhost:7176/api/v1/Quiz/";
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

  public filterCategories(): CreatedQuiz[] {
    return this.categories.filter(category =>
      category.categoryName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      category.quizName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  private async downloadCategories(categories: CreatedQuiz[]): Promise<void>{
    await fetch(this.url + `DownloadMyQuizzes?userId=${localStorage.getItem("userId")!}`, {
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
    await fetch(this.url + `DeleteQuiz?categoryName=${categoryName}&testName=${testName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
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
}
