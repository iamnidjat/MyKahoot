import { Injectable } from '@angular/core';
import {Like} from "../models/userInteraction/Like";
import {Dislike} from "../models/userInteraction/Dislike";
import {Comment} from "../models/userInteraction/Comment";

const API_URL: string = "https://localhost:7176/api/v1/Interaction/";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  public async getComments(quizId: number): Promise<Comment[]> { //
    await fetch(API_URL + `GetComments?quizId=${quizId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    })

    return [];
  }

  public async toComment(content: string, date: Date, authorName: string): Promise<void> {
    let comment: Comment = {
      authorName: authorName,
      content: content,
      date: date
    }

    await fetch(API_URL + 'AddComment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    })
  }

  public async toLike(authorName: string, authorId: number): Promise<void> {
    const didUserDislikeQuiz: boolean = await this.didUserDislike(authorId);

    if (didUserDislikeQuiz) {
      await this.removeDislike((authorId));
    }

    let like: Like = {
      authorName: authorName
    }

    await fetch(API_URL + 'AddLike', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(like)
    })
  }

  public async toDislike(authorName: string, authorId: number): Promise<void> {
    const didUserLikeQuiz: boolean = await this.didUserLike(authorId);

    if (didUserLikeQuiz) {
      await this.removeLike((authorId));
    }

    let dislike: Dislike = {
      authorName: authorName
    }

    await fetch(API_URL + 'AddDislike', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dislike)
    })
  }

  public async removeComment(authorId: number): Promise<void> {
    await fetch(API_URL + `RemoveComment?authorId=${authorId}`, {
      method: "DELETE",
    })
  }

  public async removeLike(authorId: number): Promise<void> {
    await fetch(API_URL + `RemoveLike?authorId=${authorId}`, {
      method: "DELETE",
    })
  }

  public async removeDislike(authorId: number): Promise<void> {
    await fetch(API_URL + `RemoveDislike?authorId=${authorId}`, {
      method: "DELETE",
    })
  }

  public async didUserLike(userId: number): Promise<boolean> {
    await fetch(API_URL + `DidUserLikeQuiz?userId=${userId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    })

    return false;
  }

  public async didUserDislike(userId: number): Promise<boolean> {
    await fetch(API_URL + `DidUserDislikeQuiz?userId=${userId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    })

    return false;
  }

  public async getLikesCount(quizId: number): Promise<number> {
    await fetch(API_URL + `GetLikesCount?quizId=${quizId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    })

    return -1;
  }

  public async getDislikesCount(quizId: number): Promise<number> {
    await fetch(API_URL + `GetDislikesCount?quizId=${quizId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    })

    return -1;
  }

  public async getCommentsCount(quizId: number): Promise<number> {
    await fetch(API_URL + `GetCommentsCount?quizId=${quizId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    })

    return -1;
  }
}
