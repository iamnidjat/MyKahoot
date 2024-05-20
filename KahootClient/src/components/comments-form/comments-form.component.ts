import {Component, OnInit} from '@angular/core';
import {InteractionService} from "../../services/interaction.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../models/userInteraction/Comment";

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit{
  public comments: Comment[] = [];
  public myComments: Comment[] = [];
  public userName: string = localStorage.getItem("Login")!;
  private categoryName: string = "";
  private quizName: string = "";
  private id: number = 0;

  constructor(private interactionService: InteractionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params['categoryName'];
    this.quizName = this.route.snapshot.params['quizName'];
    this.id = this.route.snapshot.params['id'];

    this.getAllCommentsAsync();
    this.getMyCommentsAsync();
  }

  public async addCommentAsync(content: string): Promise<void> {
    await this.interactionService.toCommentAsync(content, new Date(),
      parseInt(localStorage.getItem("userId")!), this.id);

    await this.getAllCommentsAsync();
    await this.getMyCommentsAsync();
  }

  public async getAllCommentsAsync(): Promise<void> {
    await this.interactionService.getCommentsAsync(this.id, this.comments);
  }

  public async getMyCommentsAsync(): Promise<void> {
    await this.interactionService.getCommentAsync(parseInt(localStorage.getItem("userId")!), this.id, this.myComments);
  }
}
