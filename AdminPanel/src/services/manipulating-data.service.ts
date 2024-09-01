import { Injectable } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/Admin/";
const API_URL2: string = "https://localhost:7176/api/v1/Account/";
@Injectable({
  providedIn: 'root'
})
export class ManipulatingDataService {

  constructor() { }

  public async deleteUserAsync(userId: number, username: string, email: string): Promise<void>{
    let deletedAccount = {
      username: username,
      email: email,
      reason: "Deleted by admin"
    }
    await fetch(API_URL2 + `DeleteAcc?userId=${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(deletedAccount)
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
