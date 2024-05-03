import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CreatedQuiz} from "../../models/CreatedQuiz";
import {NavigationExtras, Router} from "@angular/router";
import {FilterCollectionsService} from "../../services/filter-collections.service";
import {CheckDataService} from "../../services/check-data.service";
import {InteractionService} from "../../services/interaction.service";

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Component({
  selector: 'app-available-tests-lists-form',
  templateUrl: './available-tests-lists-form.component.html',
  styleUrls: ['./available-tests-lists-form.component.css']
})
export class AvailableTestsListsFormComponent implements OnInit, AfterViewInit{
  @Input() public flagForCodeChecking: boolean = false;
  public quizzes: CreatedQuiz[] = [];
  public testType: string = "";
  public flag: boolean = false;
  public searchText: string = '';

  constructor(private router: Router, private filter: FilterCollectionsService,
              private checkData: CheckDataService, private interactionService: InteractionService) {}

  ngAfterViewInit(): void {
    this.downloadQuizzesAsync();
  }

  public async downloadQuizzesAsync(): Promise<void> {
    this.flag = false;
    try {
      const response = await fetch(API_URL + `GetTestsList?categoryName=${localStorage.getItem("categoryName")}`, {
        method: "GET"
      });
      const data = await response.json();
      this.quizzes.length = 0;
      Object.keys(data).forEach((key) => {
        this.quizzes.push(data[key]);
      });

      // Create an array to hold the promises for likes, dislikes and comments counts
      const likesPromises: any[] = [];
      const dislikesPromises: any[] = [];
      const commentsPromises: any[] = [];

      for (const quiz of this.quizzes) {
        likesPromises.push(this.getLikesCountAsync(quiz.id!));
        dislikesPromises.push(this.getDislikesCountAsync(quiz.id!));
        commentsPromises.push(this.getCommentsCountAsync(quiz.id!));
        quiz.userLiked = await this.didUserLikeQuizAsync(quiz.id!);
        quiz.userDisliked = await this.didUserDislikeQuizAsync(quiz.id!);
      }

      // Execute all promises concurrently
      await Promise.all([...likesPromises, ...dislikesPromises, ...commentsPromises]);
    } catch (error) {
      console.error('Error downloading quizzes:', error);
    }
  }

  public async downloadPrivateQuizzesAsync(): Promise<void>{
    this.flag = true;
    try {
      const response = await fetch(API_URL + `GetPrivateTestsList?categoryName=${localStorage.getItem("categoryName")}`, {
        method: "GET"
      });
      const data = await response.json();
      this.quizzes.length = 0;
      Object.keys(data).forEach((key) => {
        this.quizzes.push(data[key]);
      });

      // Create an array to hold the promises for likes, dislikes and comments counts
      const likesPromises: any[] = [];
      const dislikesPromises: any[] = [];
      const commentsPromises: any[] = [];

      for (const quiz of this.quizzes) {
        likesPromises.push(this.getLikesCountAsync(quiz.id!));
        dislikesPromises.push(this.getDislikesCountAsync(quiz.id!));
        commentsPromises.push(this.getCommentsCountAsync(quiz.id!));
        quiz.userLiked = await this.didUserLikeQuizAsync(quiz.id!);
        quiz.userDisliked = await this.didUserDislikeQuizAsync(quiz.id!);
      }

      // Execute all promises concurrently
      await Promise.all([...likesPromises, ...dislikesPromises, ...commentsPromises]);
    } catch (error) {
      console.error('Error downloading quizzes:', error);
    }
  }

  public BackOptions(): void{
    if (localStorage.getItem("Guest") !== null)
    {
      this.router.navigate(['/app/auth-form']);
      localStorage.removeItem("Guest");
    }
    else
    {
      this.router.navigate(['/app/player-survey-choosing-form']);
    }
  }

  public toRulesForm(elemRef: any): void{
    localStorage.setItem("TestName", elemRef.id);

    if (!this.flag) {
      this.setModeMethod("public");
    }
    else if (this.flag && this.checkData.CheckOwnerOfPrivateTest(localStorage.getItem("categoryName")!,
      localStorage.getItem("TestName")!, localStorage.getItem("Login")!)) {
      this.setModeMethod("private");
    }
    else {
      this.flagForCodeChecking = true;
    }
  }

  public filterQuizzes(): CreatedQuiz[] {
    return this.filter.filterQuizzes(this.quizzes, this.searchText, this.testType, this.flag);
  }

  public async toLikeQuizAsync(quizId: number): Promise<void> {
    await this.interactionService.toLikeAsync(parseInt(localStorage.getItem("userId")!), quizId);
    !this.flag ? await this.downloadQuizzesAsync() : await this.downloadPrivateQuizzesAsync();
  }

  public async toDislikeQuizAsync(quizId: number): Promise<void> {
    await this.interactionService.toDislikeAsync(parseInt(localStorage.getItem("userId")!), quizId);
    !this.flag ? await this.downloadQuizzesAsync() : await this.downloadPrivateQuizzesAsync();
  }

  private async didUserLikeQuizAsync(quizId: number): Promise<boolean> {
    return await this.interactionService.didUserLikeAsync(parseInt(localStorage.getItem("userId")!), quizId);
  }

  private async didUserDislikeQuizAsync(quizId: number): Promise<boolean> {
    return await this.interactionService.didUserDislikeAsync(parseInt(localStorage.getItem("userId")!), quizId);
  }

  private async getLikesCountAsync(quizId: number): Promise<void> {
    try {
      const likesCount: number = await this.interactionService.getLikesCountAsync(quizId);

      // Find the quiz by id and set the likes count
      const quiz = this.quizzes.find(q => q.id === quizId);
      if (quiz) {
        quiz.likesCount = likesCount;
      }
    } catch (error) {
      console.error('Error getting likes count:', error);
    }
  }

  private async getDislikesCountAsync(quizId: number): Promise<void> {
    try {
      const dislikesCount: number = await this.interactionService.getDislikesCountAsync(quizId);

      // Find the quiz by id and set the dislikes count
      const quiz = this.quizzes.find(q => q.id === quizId);
      if (quiz) {
        quiz.dislikesCount = dislikesCount;
      }
    } catch (error) {
      console.error('Error getting dislikes count:', error);
    }
  }

  private async getCommentsCountAsync(quizId: number): Promise<void> {
    try {
      const commentsCount: number = await this.interactionService.getCommentsCountAsync(quizId);

      // Find the quiz by id and set the comments count
      const quiz = this.quizzes.find(q => q.id === quizId);
      if (quiz) {
        quiz.commentsCount = commentsCount;
      }
    } catch (error) {
      console.error('Error getting commentsCount count:', error);
    }
  }



  private setModeMethod(mode: string): void {
    localStorage.setItem("mode", mode);
    if (localStorage.getItem("action") === "play") {
      const navigationExtras: NavigationExtras = {
        queryParams: { 'action': 'play',
          "mode": localStorage.getItem("mode"),
          'categoryName': localStorage.getItem("categoryName"),
          'testName': localStorage.getItem("TestName")}
      };
      this.router.navigate([`/app/choose-level-form`], navigationExtras);
    }
    else {
      localStorage.setItem("surveyGuard", "guard");
      const navigationExtras: NavigationExtras = {
        queryParams: { 'action': 'watch',
          "mode": localStorage.getItem("mode"),
          'categoryName': localStorage.getItem("categoryName"),
          'testName': localStorage.getItem("TestName")}
      };
      this.router.navigate([`/app/rules-form`], navigationExtras);
    }
  }

  ngOnInit(): void {
    this.testType = localStorage.getItem("categoryName")!;
  }
}
