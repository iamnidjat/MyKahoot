import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {SocialUser} from "../models/SocialUser";

const API_URL: string = "https://localhost:7176/api/v1/Account/";
const API_URL2: string = "https://localhost:7176/api/v1/UserInfo/";
const API_URL3: string = "https://localhost:7176/api/v1/MailConfirmation/";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private router: Router, private socialAuthService: SocialAuthService) {}

  public backAuth(e: any): void{
    e.preventDefault();

    fetch(API_URL + "Logout", {
      method: "GET"
    }).then((response) => {
      localStorage.clear()
      this.router.navigate(['/app/auth-form']);
    });
  }

  public async checkPasswordAsync(password: string): Promise<boolean> {
   try {
      const response = await fetch(API_URL + `PasswordsMatching?userId=${parseInt(localStorage.getItem("userId")!)}&password=${password}`);
      const data = await response.json();
      return data;
   }
   catch (error) {
      console.error("Error in checkPasswordAsync:", error);
      return false;
    }
  }

  public RegisterSocialUser(): void{
    this.socialAuthService.authState.subscribe((user) => {
      localStorage.setItem("Login", user.name);
      localStorage.setItem("SocialUser", "true");
      localStorage.setItem("userPhoto", user.photoUrl);
      this.AddSocialUser(user.name, user.firstName, user.email, localStorage.getItem("Role")!, user.provider);
      this.GetUserInfoByUsername(user.name);
      Swal.fire("You registered successfully!");
      this.router.navigate(['/app/player-options-form']);
    });
  }

  private async AddSocialUser(username: string, name: string, email: string, role: string, provider: string): Promise<void>{
    try {
      let socialUser: SocialUser = {userName: username, name: name, email: email, role: role, provider: provider}

      await fetch(API_URL + "AddSocialUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(socialUser)
      });
    }
    catch (error) {
        console.error("Error in addSocialUserAsync:", error);
    }
  }

  public async GetUserInfoByUsername(username: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL2}GetUserInfoByUsername?username=${username}`, {
        method: "GET"
      });

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }

      if (response.status === 204) {
        console.log("No content returned. Username might not be found.");
        return;
      }

      const data = await response.json();

      console.log(data);

      localStorage.setItem("userId", data.id);
      localStorage.setItem("userMail", data.email);
      localStorage.setItem("Role", data.role);
      localStorage.setItem("userLevel", data.level);
      localStorage.setItem("coins", data.coins);
      localStorage.setItem("points", data.points);
      localStorage.setItem("overallPoints", data.overallPoints);
    } catch (error) {
      console.error("Error in GetUserInfo:", error);
    }
  }

  public async getUserInfoAsync(): Promise<any> {
    try {
      const userId = parseInt(localStorage.getItem("userId")!);

      const response = await fetch(`${API_URL2}GetUserInfo?id=${userId}`, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("An error occurred while fetching user info:", error);
    }
  }

  public async SentConfirmationMail(email: string, userId: number): Promise<void> {
    await fetch(API_URL3+ `ConfirmEmail?email=${email}&userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
