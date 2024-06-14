import { Injectable } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/Quiz/";

@Injectable({
  providedIn: 'root'
})
export class CheckDataService {
  public async IsCatNameUsed(catName: string): Promise<boolean> {
    fetch(API_URL + `IsCatNameUsed?catName=${catName}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("IsCatNameUsed", JSON.parse(JSON.stringify(data)));
    });
    return JSON.parse(localStorage.getItem("IsCatNameUsed")!);
  }

  public async IsQuizNameUsed(catName: string, quizName: string): Promise<boolean> {
    fetch(API_URL + `IsQuizNameUsed?catName=${catName}&quizName=${quizName}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      localStorage.setItem("IsQuizNameUsed", JSON.parse(JSON.stringify(data)));
    });
    return JSON.parse(localStorage.getItem("IsQuizNameUsed")!);
  }

  public async CheckCode(catName: string, quizName: string, userCode: string): Promise<boolean> {
    try {
      const response = await fetch(API_URL + `CheckCode?catName=${catName}&quizName=${quizName}&userCode=${userCode}`, {
        method: "GET"
      });
      const data = await response.json();
      localStorage.setItem("CodesMatch", JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error("Error fetching or setting data:", error);
    }
    return JSON.parse(localStorage.getItem("CodesMatch")!);
  }

  public GetQuizMode(catName: string, quizName: string): boolean{
    fetch(API_URL + `GetQuizMode?catName=${catName}&quizName=${quizName}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("QuizMode", JSON.parse(JSON.stringify(data)));
    });
    return JSON.parse(localStorage.getItem("QuizMode")!);
  }

  public CheckOwnerOfPrivateTest(catName: string, quizName: string, userName: string): boolean{
    fetch(API_URL + `CheckOwnerOfPrivateTest?catName=${catName}&quizName=${quizName}&userName=${userName}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("IsOwner", JSON.parse(JSON.stringify(data)));
    });
    return JSON.parse(localStorage.getItem("IsOwner")!);
  }
}
