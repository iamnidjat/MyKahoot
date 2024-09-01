import { Injectable } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/UserInfo/";

@Injectable({
  providedIn: 'root'
})
export class CheckCredentialsService {
  public async IsEmailUsed(mail: string): Promise<boolean> {
    const response = await fetch(API_URL + `IsEmailUsed?mail=${mail}`);
    const data = await response.json();
    return data;
  }
}
