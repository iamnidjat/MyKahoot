import { Injectable } from '@angular/core';
import {Like} from "../models/userInteraction/Like";
import {Dislike} from "../models/userInteraction/Dislike";
import {Comment} from "../models/userInteraction/Comment";

const API_URL: string = "https://localhost:7176/api/v1/Interaction/";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  public async getCommentsAsync(quizId: number, comments: Comment[]): Promise<void> {
    await fetch(API_URL + `GetComments?quizId=${quizId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("comments => ", data);
      Object.keys(data).forEach((key) =>
      {
        comments.push(data[key]);
      });
    })
  }

  public async getCommentAsync(userId: number, quizId: number, myComments: Comment[]): Promise<void> {
    await fetch(API_URL + `GetComment?userId=${userId}&quizId=${quizId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      Object.keys(data).forEach((key) =>
      {
        myComments.push(data[key]);
      });
    })
  }

  public async toCommentAsync(content: string, date: Date, authorId: number, quizId: number): Promise<void> {
    let comment: Comment = {
      authorId: authorId,
      content: content,
      date: date,
      createdQuizId: quizId,
    }

    await fetch(API_URL + 'AddComment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    })
  }

  public async toLikeAsync(authorId: number, quizId: number): Promise<void> {
    const didUserLikeQuiz: boolean = await this.didUserLikeAsync(authorId, quizId);

    if (didUserLikeQuiz) {
      await this.removeLikeAsync(authorId, quizId);
      alert("You unliked this quiz!");
      return;
    }

    const didUserDislikeQuiz: boolean = await this.didUserDislikeAsync(authorId, quizId);

    if (didUserDislikeQuiz) {
      await this.removeDislikeAsync(authorId, quizId);
    }

    let like: Like = {
      authorId: authorId,
      createdQuizId: quizId,
    }

    await fetch(API_URL + 'AddLike', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(like)
    })
  }

  public async toDislikeAsync(authorId: number, quizId: number): Promise<void> {
    const didUserDislikeQuiz: boolean = await this.didUserDislikeAsync(authorId, quizId);

    if (didUserDislikeQuiz) {
      await this.removeDislikeAsync(authorId, quizId);
      alert("You un-disliked this quiz!");
      return;
    }

    const didUserLikeQuiz: boolean = await this.didUserLikeAsync(authorId, quizId);

    if (didUserLikeQuiz) {
      await this.removeLikeAsync(authorId, quizId);
    }

    let dislike: Dislike = {
      authorId: authorId,
      createdQuizId: quizId,
    }

    await fetch(API_URL + 'AddDislike', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dislike)
    })
  }

  public async removeCommentAsync(authorId: number): Promise<void> {
    await fetch(API_URL + `RemoveComment?authorId=${authorId}`, {
      method: "DELETE",
    })
  }

  public async removeLikeAsync(authorId: number, quizId: number): Promise<void> {
    await fetch(API_URL + `RemoveLike?authorId=${authorId}&quizId=${quizId}`, {
      method: "DELETE",
    })
  }

  public async removeDislikeAsync(authorId: number, quizId: number): Promise<void> {
    await fetch(API_URL + `RemoveDislike?authorId=${authorId}&quizId=${quizId}`, {
      method: "DELETE",
    })
  }

  public async didUserLikeAsync(userId: number, quizId: number): Promise<boolean> {
    return fetch(API_URL + `DidUserLikeQuiz?userId=${userId}&quizId=${quizId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("didUserLike => ", data);
      return data;
    }).catch((error) => {
      console.error('Error checking if user liked:', error);
      return false;
    });
  }

  public async didUserDislikeAsync(userId: number, quizId: number): Promise<boolean> {
    return fetch(API_URL + `DidUserDislikeQuiz?userId=${userId}&quizId=${quizId}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("didUserDislike => ", data);
      return data;
    }).catch((error) => {
      console.error('Error checking if user disliked:', error);
      return false;
    });
  }

  public async getLikesCountAsync(quizId: number): Promise<number> {
    try {
      const response = await fetch(API_URL + `GetLikesCount?quizId=${quizId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("getLikesCount data => ", data);
      return data;
    } catch (error) {
      console.error('Error fetching likes count:', error);
      return -1;
    }
  }

  public async getDislikesCountAsync(quizId: number): Promise<number> {
    try {
      const response = await fetch(API_URL + `GetDislikesCount?quizId=${quizId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("getDislikesCount data => ", data);
      return data;
    } catch (error) {
      console.error('Error fetching dislikes count:', error);
      return -1;
    }
  }

  public async getCommentsCountAsync(quizId: number): Promise<number> {
    try {
      const response = await fetch(API_URL + `GetCommentsCount?quizId=${quizId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("getCommentsCount data => ", data);
      return data;
    } catch (error) {
      console.error('Error fetching comments count:', error);
      return -1;
    }
  }

  public async getAverageFeedbackScoreAsync(quizId: number): Promise<number> {
    try {
      const response = await fetch(API_URL + `GetAverageFeedbackScore?quizId=${quizId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("getAverageFeedbackScore data => ", data);
      return data;
    } catch (error) {
      console.error('Error fetching average feedback score:', error);
      return -1;
    }
  }

  public async getTimesPassedAsync(quizId: number): Promise<number> {
    try {
      const response = await fetch(API_URL + `GetTimesPassed?quizId=${quizId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("geTimesPassed data => ", data);
      return data;
    } catch (error) {
      console.error('Error fetching times passed:', error);
      return -1;
    }
  }
}
