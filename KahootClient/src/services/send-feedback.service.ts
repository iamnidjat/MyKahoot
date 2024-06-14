import { Injectable } from '@angular/core';
import {FeedbackModel} from "../models/FeedbackModel";

const API_URL: string = "https://localhost:7176/api/v1/QuizFeedback/";

@Injectable({
  providedIn: 'root'
})
export class SendFeedbackService {

  public async SaveQuizFeedback(catName: string, quizName: string,
               feedbackScore: number, feedbackComment: string): Promise<void> {
    let feedback: FeedbackModel = {
      categoryName: catName, quizName: quizName,
      feedbackScore: feedbackScore, feedbackComment: feedbackComment }

    await fetch(API_URL + "SendQuizFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(feedback)
    });
  }
}
