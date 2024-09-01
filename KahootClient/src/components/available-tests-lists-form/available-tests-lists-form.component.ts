import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
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
export class AvailableTestsListsFormComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() public flagForCodeChecking: boolean = false;
  public quizzes: CreatedQuiz[] = [];
  public testType: string = "";
  public testMode: string = ""; // for reminder
  public flag: boolean = false;
  public flagForReminder: boolean = false;
  public searchText: string = '';
  public reminderName: string = "";
  public catName: string = ""; // for reminder
  public isGuest: boolean = localStorage.getItem("Guest") === "Guest";

  // Pagination variables
  public currentPage: number = 1;
  public pageSize: number = 2;
  public totalPages: number = 0;

  constructor(private router: Router, private filter: FilterCollectionsService,
              private checkData: CheckDataService, private interactionService: InteractionService) {}

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  public async loadCategories(mode: string = "public"): Promise<void> {
    mode === 'public' ? await this.downloadQuizzesAsync() : await this.downloadPrivateQuizzesAsync();
    this.totalPages = Math.ceil(this.quizzes.length / this.pageSize) + 1; // Update totalPages here
    if (this.quizzes.length % this.pageSize == 0) this.totalPages += 1;
  }

  // Pagination methods
  public getCurrentPageItems(): CreatedQuiz[] {
    const filteredQuizzes = this.filterQuizzes();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredQuizzes.length);
    return filteredQuizzes.slice(startIndex, endIndex);
  }

  public setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  public getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
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

  public BackOptions(): void {
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  public async toRulesForm(category: CreatedQuiz): Promise<void>{
    localStorage.setItem("TestName", category.quizName);
    localStorage.setItem("QuizCreator", category.userName);
    localStorage.setItem("QuizId", category.id ? category.id.toString() : "0");
    localStorage.setItem("IsVIP", category.isVIP!.toString());

    if (category.categoryName !== 'Mixed Test' && category.categoryName !== 'Programming' &&
      category.categoryName !== 'Math' && category.categoryName !== 'Logics') {
      localStorage.setItem("AnotherTest", category.quizName);
      // to know (in test-process.component.ts) whether the app must get questions from back or not
    }

    if (!this.flag) {
      this.testMode = "public";
      this.setModeMethod(this.testMode);
    }
    else if (this.flag && await this.checkData.CheckOwnerOfPrivateTest(localStorage.getItem("categoryName")!,
      localStorage.getItem("TestName")!, localStorage.getItem("Login")!)) {
      this.testMode = "private";
      this.setModeMethod(this.testMode);
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
      const navigationExtras: NavigationExtras = {
        queryParams: { 'action': 'watch',
          "mode": localStorage.getItem("mode"),
          'categoryName': localStorage.getItem("categoryName"),
          'testName': localStorage.getItem("TestName")}
      };
      this.router.navigate([`/app/rules-form`], navigationExtras);
    }
  }

  public setReminder(e: any, catName: string, testName: string): void {
    e.stopPropagation();
    this.catName = catName; // Update the reminder category name
    this.reminderName = testName; // Update the reminderName (test name)
    this.flag ?  this.testMode = "public" : this.testMode = "private"; // Update the reminder test mode
    this.flagForReminder = true;
  }

  public handleReminderClose(): void {
    this.flagForReminder = false;
  }

  ngOnInit(): void {
    this.testType = localStorage.getItem("categoryName")!;
  }

  ngOnDestroy(): void {
    localStorage.removeItem("mode"); // Don't need anymore
  }
}
