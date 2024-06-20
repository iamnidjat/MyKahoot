import { Injectable } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/Admin/";
@Injectable({
  providedIn: 'root'
})
export class ManipulatingDataService {

  constructor() { }

  public async deleteUserAsync(userId: number): Promise<void>{
    await fetch(API_URL + `DeleteUser?userId=${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public async banUserAsync(userId: number): Promise<void>{
    await fetch(API_URL + `BanUser?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public async unbanUserAsync(userId: number): Promise<void>{
    await fetch(API_URL + `UnbanUser?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public async deleteQuizAsync(quizId: number): Promise<void>{
    await fetch(API_URL + `DeleteQuiz?quizId=${quizId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
