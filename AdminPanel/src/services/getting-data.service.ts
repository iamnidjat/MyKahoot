import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {CreatedQuiz} from "../models/CreatedQuiz";

const API_URL: string = "https://localhost:7176/api/v1/Admin/";

@Injectable({
  providedIn: 'root'
})
export class GettingDataService {

  constructor() { }

  public async GetUsersAsync(users: User[]): Promise<void> {
    await fetch(API_URL + 'GetAllUsers', {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("Users", data);
      users = data.map((item: any) => ({
        id: item.id,
        username: item.username || null,
        isUsernameChanged: item.isUsernameChanged || false,
        dateOfChangingUsername: item.dateOfChangingUsername ? new Date(item.dateOfChangingUsername) : null,
        deadlineForChangingName: item.deadlineForChangingName || 0,
        name: item.name || null,
        surname: item.surname || null,
        password: item.password || null,
        email: item.email,
        isEmailChanged: item.isEmailChanged || false,
        backUpEmail: item.backUpEmail || null,
        isEmailConfirmed: item.isEmailConfirmed || false,
        birthday: new Date(item.birthday),
        role: item.role,
        provider: item.provider || null,
        photoURL: item.photoURL || null,
        isFrozen: item.isFrozen || false,
        freezingReason: item.freezingReason || null,
        isBanned: item.isBanned || false,
        overallPoints: item.overallPoints || 0
      }));
    });
  }

  public async GetQuizzesAsync(createdQuizzes: CreatedQuiz[]): Promise<void> {
    await fetch(API_URL + 'GetAllUsers', {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("CreatedQuizzes", data);
      createdQuizzes = data.map((item: any) => ({
        id: item.id,
    }));
  });
}
}
