import { Injectable } from '@angular/core';

const API_URL: string = "https://localhost:7176/api/v1/UserInfo/";

@Injectable({
  providedIn: 'root'
})
export class CheckCredentialsService {
  public async IsEmailUsed(mail: string): Promise<boolean> {
    fetch(API_URL + `IsEmailUsed?mail=${mail}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      localStorage.setItem("IsEmailUsed", JSON.parse(JSON.stringify(data)));
    });
   // alert(mail);
   // alert(localStorage.getItem("IsEmailUsed"));
    return JSON.parse(localStorage.getItem("IsEmailUsed")!);
  }
}
