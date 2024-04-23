import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from "sweetalert2";
import {LoginModel} from "../../models/LoginModel";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {SocialUser} from "../../models/SocialUser";
import {SharedService} from "../../services/shared.service";
import { ReCaptchaV3Service } from 'ng-recaptcha';

const API_URL: string = "https://localhost:7176/api/v1/Account/";
const API_URL2: string = "https://localhost:7176/api/v1/UserInfo/";
const API_URL3: string = "https://localhost:7176/api/v1/CaptchaVerification/";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit, OnDestroy{
  public isChecked: boolean = false;
  public isDisabled: boolean = true;
  public flag: boolean = true;
  public visibility: boolean = false; // for userPassword visibility
  public userLogin: string = "";
  public userPassword: string = "";

  constructor(private el: ElementRef, private router: Router, private recaptchaV3Service: ReCaptchaV3Service,
              private socialAuthService: SocialAuthService, private sharedService: SharedService) {}

  ngOnDestroy(): void {
    localStorage.removeItem("isUserBot"); // Don't need anymore
  }

  private async sendTokenToServer(): Promise<string> {
      const token: string | undefined  = await this.recaptchaV3Service.execute('importantAction').toPromise();
      console.log("token => ", token);

      await fetch(API_URL3 + `verify-captcha?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }}).then(async (response) => {
          if (response.status === 200) {
            localStorage.setItem("isUserBot", "false");
          }
          else {
            localStorage.setItem("isUserBot", "true");
          }
      });
      return localStorage.getItem("isUserBot")!;
  }

  public async LogIn(e: any): Promise<void>{
    e.preventDefault();

    if (await this.sendTokenToServer() === "false") {
      let user: LoginModel = {userName: this.userLogin, password: this.userPassword};

      await fetch(API_URL + "Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then(async (response) => {
        if (response.status === 200) {
          localStorage.setItem("Login", this.userLogin);
          this.router.navigate(['/app/player-options-form']);
        } else {
          Swal.fire('Oops', 'Incorrect data!', 'error');
          this.userLogin = "";
          this.userPassword = "";

          this.visibility ? this.visibility = !this.visibility : this.visibility;
        }
        return await response.json();
      }).then(async (data) => {
        let userid = JSON.parse(JSON.stringify(data));
        localStorage.setItem("userId", JSON.stringify(Object.values(userid)[0]));
        localStorage.setItem("userMail", JSON.stringify(Object.values(userid)[8]));
        localStorage.setItem("Role", JSON.stringify(Object.values(userid)[13]));
        localStorage.setItem("photoURL", JSON.stringify(Object.values(userid)[15]));

        if (await this.CheckStatusOfAnAcc()) {
          await this.UnFreezeAnAcc();
          Swal.fire('Your account is unfrozen!');
        }
        localStorage.removeItem("IsFrozen"); // Don't need anymore
      });
    }
    else {
      Swal.fire('Oops', 'You are not allowed to authorize, you can be a bot!', 'error');
      this.userLogin = "";
      this.userPassword = "";
    }
  }

  public ToRegisterForm(): void{
    this.router.navigate(['/app/choose-account-type-form']);
  }

  public ToForgotPassword(): void{
    this.router.navigate(['/app/forgot-password-form']);
  }

  public SignInAsAGuest(): void{
    localStorage.setItem("Guest", "Guest");
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  public IsLoginFieldEmpty(): void{
      this.isDisabled = !this.isDisabled;
  }

  public RememberMe(username: string): void{
    this.isChecked = !this.isChecked;

    if (this.isChecked && username !== "") {
      localStorage.setItem("Username", this.userLogin);
      localStorage.setItem("UsernameDate", new Date().toLocaleDateString());
    }
  }

  public ChangeVisibility(): any {
    if (this.userPassword !== "")
    {
      this.visibility = !this.visibility;
    }
  }

  private async CheckStatusOfAnAcc(): Promise<boolean> {
    const response = await fetch(API_URL + `CheckStatusOfAcc?userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET",
    });

    const data = await response.json();
    localStorage.setItem("IsFrozen", JSON.parse(JSON.stringify(data)));
    return JSON.parse(localStorage.getItem("IsFrozen")!);
  }

  private async UnFreezeAnAcc(): Promise<void>{
    await fetch(API_URL + `UnfreezeAcc?userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    }
    });
  }

  private async DoesUserExist(username: string): Promise<boolean>{
    fetch(API_URL2 + `DoesUserExist?username=${username}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('data', data);
      localStorage.setItem("DoesUserExist", JSON.parse(JSON.stringify(data)));
    });
  // console.log(JSON.parse(localStorage.getItem("DoesUserExist")!));
  //   return JSON.parse(localStorage.getItem("DoesUserExist")!);
    const storedData = localStorage.getItem("DoesUserExist");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return false; // or handle the case where data is not available
    }
  }

  ngOnInit(): void {
    const access: string | null = localStorage.getItem("Username");

    if (access
      && (+new Date().valueOf() - (+new Date(localStorage.getItem("UsernameDate")!)).valueOf()) / (24 * 60 * 60 * 1000) <= 30) {
      this.router.navigate(['/app/player-options-form']);
    }
    else {
      localStorage.removeItem("Guest");
      localStorage.removeItem("Role");
      localStorage.removeItem('Login');
      localStorage.removeItem('Role');
      localStorage.removeItem('userId');
      localStorage.removeItem('userMail');
      localStorage.removeItem('photoURL');
    }

    this.socialAuthService.authState.subscribe(async (user) => {
      if (await !this.DoesUserExist(user.name))
      {
        localStorage.setItem("SocialUserFlag", "false");
        Swal.fire('Oops', 'You do not have an account! Please choose the account type!', 'error');
        this.router.navigate(['/app/choose-account-type-form']);
      }
      else
      {
        localStorage.setItem("Login", user.name);
        localStorage.setItem("photoURL", user.photoUrl);
        localStorage.setItem("SocialUser", "true");
        this.sharedService.GetUserInfo(user.name);

        // try { // dont work
        //   await this.a();
        // } catch (error) {
        // }
        this.router.navigate(['/app/player-options-form']); // Move navigation here
      }
      localStorage.removeItem("DoesUserExist");
    });
  }

  // async a(): Promise<void> {
  //   if (await this.CheckStatusOfAnAcc()) {
  //     await this.UnFreezeAnAcc();
  //     Swal.fire('Your account is unfrozen!');
  //   }
  //   localStorage.removeItem("IsFrozen"); // Don't need anymore
  // }

}
