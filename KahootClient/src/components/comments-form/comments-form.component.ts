import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @Input() public id: number = 0;
  @ViewChild("Comment") comment!: ElementRef;
  public editMode: { [key: number]: boolean } = {}; // Track edit mode for each item

  constructor(private interactionService: InteractionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.getAllCommentsAsync();
    this.getMyCommentsAsync();
  }

  public toggleEditMode(commentId: number): void {
    this.editMode[commentId] = !this.editMode[commentId];
  }
  public async addCommentAsync(content: string): Promise<void> {
    await this.interactionService.toCommentAsync(content, new Date(),
      parseInt(localStorage.getItem("userId")!), this.id);

    this.comment.nativeElement.value = "";

    await this.getAllCommentsAsync();
    await this.getMyCommentsAsync();
  }

  public async getAllCommentsAsync(): Promise<void> {
    await this.interactionService.getCommentsAsync(this.id, this.comments);
  }

  public async getMyCommentsAsync(): Promise<void> {
    await this.interactionService.getCommentAsync(parseInt(localStorage.getItem("userId")!), this.id, this.myComments);
  }

  public async removeCommentAsync(commentId: number): Promise<void> {
    await this.interactionService.removeCommentAsync(commentId);

    // Remove the comment from the local list
    this.comments = this.comments.filter(comment => comment.id !== commentId);
    this.myComments = this.myComments.filter(comment => comment.id !== commentId);
  }

  public async updateCommentAsync(commentContent: string, commentId: number): Promise<void> {
    await this.interactionService.updateCommentAsync(commentContent, commentId);
    this.editMode[commentId] = false; // Disable edit mode
  }
}
