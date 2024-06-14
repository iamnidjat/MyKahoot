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
      // localStorage.removeItem('Login');
      // localStorage.removeItem('Role');
      // localStorage.removeItem('userId');
      // localStorage.removeItem('userMail');
      // localStorage.removeItem('photoURL');
      // localStorage.removeItem('IsMailChanged');
      // localStorage.removeItem('IsFrozen');
      // localStorage.removeItem("Username");
      // localStorage.removeItem("UsernameDate");
      // localStorage.removeItem("SocialUser"); // !
      localStorage.clear();

      this.router.navigate(['/app/auth-form']);
    });
  }

  public checkPassword(password: string): boolean{
    fetch(API_URL + `PasswordsMatching?userId=${parseInt(localStorage.getItem("userId")!)}&password=${password}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("DoesMatch", JSON.parse(JSON.stringify(data)));
    });
    return JSON.parse(localStorage.getItem("DoesMatch")!);
  }

  public RegisterSocialUser(): void{
    this.socialAuthService.authState.subscribe((user) => {
      localStorage.setItem("Login", user.name);
      localStorage.setItem("SocialUser", "true");
      this.AddSocialUser(user.name, user.firstName, user.email, localStorage.getItem("Role")!, user.provider);
      this.GetUserInfo(user.name);
      Swal.fire("You registered successfully!");
      this.router.navigate(['/app/player-options-form']);
    });
  }

  private async AddSocialUser(username: string, name: string, email: string, role: string, provider: string): Promise<void>{
    let socialUser: SocialUser = {userName: username, name: name, email: email, role: role, provider: provider}

    await fetch(API_URL + "AddSocialUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(socialUser)
    });
  }

  public async GetUserInfo(username: string): Promise<void>{
    await fetch(API_URL2 + `GetUserInfoByUsernameAsync?username=${username}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let userid = JSON.parse(JSON.stringify(data));
      localStorage.setItem("userId", JSON.stringify(Object.values(userid)[0]));
      localStorage.setItem("userMail", JSON.stringify(Object.values(userid)[8]));
      localStorage.setItem("Role", JSON.stringify(Object.values(userid)[13]));
    });
  }

  public async SentConfirmationMail(email: string, userId: number): Promise<void>
  {
    await fetch(API_URL3+ `ConfirmEmail?email=${email}&userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
