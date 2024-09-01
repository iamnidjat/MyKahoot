import { Injectable } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Injectable({
  providedIn: 'root'
})
export class CheckDataService {
  public async IsCatNameUsed(catName: string): Promise<boolean> {
    const response = await fetch(API_URL + `IsCatNameUsed?catName=${catName}`);
    const data = await response.json();
    return data;
  }

  public async IsQuizNameUsed(catName: string, quizName: string): Promise<boolean> {
    const response = await fetch(API_URL + `IsQuizNameUsed?catName=${catName}&quizName=${quizName}`);
    const data = await response.json();
    return data;
  }

  public async CheckCode(catName: string, quizName: string, userCode: string): Promise<boolean> {
    try {
      const response = await fetch(API_URL + `CheckCode?catName=${catName}&quizName=${quizName}&userCode=${userCode}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching or setting data:", error);
      return false;
    }
  }

  public async GetQuizMode(catName: string, quizName: string): Promise<boolean>{
    const response = await fetch(API_URL + `GetQuizMode?catName=${catName}&quizName=${quizName}`);
    const data = await response.json();
    return data;
  }

  public async CheckOwnerOfPrivateTest(catName: string, quizName: string, userName: string): Promise<boolean>{
    const response = await fetch(API_URL + `CheckOwnerOfPrivateTest?catName=${catName}&quizName=${quizName}&userName=${userName}`);
    const data = await response.json();
    return data;
  }
}
