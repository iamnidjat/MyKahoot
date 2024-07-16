import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {CreatedQuiz} from "../models/CreatedQuiz";

const API_URL: string = "https://localhost:7176/api/v1/Admin/";

@Injectable({
  providedIn: 'root'
})
export class GettingDataService {

  public async GetUsersAsync(userType: 'All' | 'Banned'): Promise<User[]> {
    const endpoint = userType === 'Banned' ? 'GetAllBannedUsers' : 'GetAllUsers';
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET"
    });
    const data = await response.json();
    console.log("Users", data);
    return data.map((item: any) => ({
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
  }

  public async GetQuizzesAsync(): Promise<CreatedQuiz[]> {
    const response = await fetch(API_URL + 'GetAllQuizzes', {
      method: "GET"
    });
    const data = await response.json();
    console.log("CreatedQuizzes", data);
    return data.map((item: any) => ({
      id: item.id,
      quizName: item.quizName,
      categoryName: item.categoryName,
      userName: item.userName,
      isPrivate: item.isPrivate,
      quizCode: item.quizCode,
      timesPassed: item.timesPassed,
      averageFeedbackScore: item.averageFeedbackScore
    }));
  }
}
