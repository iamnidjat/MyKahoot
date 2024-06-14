import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InteractionService } from "../../services/interaction.service";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-created-quiz-stats-form',
  templateUrl: './created-quiz-stats-form.component.html',
  styleUrls: ['./created-quiz-stats-form.component.css']
})
export class CreatedQuizStatsFormComponent {
  public catName: string = "";
  public quizName: string = "";
  public categoryId: number = 0;
  public averageFeedbackScore: number = 0;
  public timesPassed: number = 0;
  public likesCount: number = 0;
  public dislikesCount: number = 0;
  public commentsCount: number = 0;

  constructor(private route: ActivatedRoute, private interactionService: InteractionService) {}

  ngOnInit(): void {
    // Access URL parameters using snapshot
    this.catName = this.route.snapshot.queryParams['categoryName'];
    this.quizName = this.route.snapshot.queryParams['quizName'];
    this.categoryId = this.route.snapshot.queryParams['id'];

    this.getCreatedQuizStats();
  }

  private getCreatedQuizStats(): void {
    // Using forkJoin to execute multiple observables in parallel
    forkJoin([
      // Calling all the required methods to fetch statistics asynchronously
      this.interactionService.getAverageFeedbackScoreAsync(this.categoryId),
      this.interactionService.getTimesPassedAsync(this.categoryId),
      this.interactionService.getLikesCountAsync(this.categoryId),
      this.interactionService.getDislikesCountAsync(this.categoryId),
      this.interactionService.getCommentsCountAsync(this.categoryId)
    ]).subscribe({
      // 'next' function receives the emitted values from the observables
      next: ([averageFeedbackScore, timesPassed, likesCount, dislikesCount, commentsCount]) => {
        // Assigning the received values to the component's properties
        this.averageFeedbackScore = averageFeedbackScore;
        this.timesPassed = timesPassed;
        this.likesCount = likesCount;
        this.dislikesCount = dislikesCount;
        this.commentsCount = commentsCount;
      },
      // 'error' function handles any errors that occur during the observables' execution
      error: error => {
        console.error("Error fetching statistics:", error);
      }
    });
  }
}

