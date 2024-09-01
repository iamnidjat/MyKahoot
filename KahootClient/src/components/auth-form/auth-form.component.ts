import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from "sweetalert2";
import {LoginModel} from "../../models/LoginModel";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {SocialUser} from "../../models/SocialUser";
import {SharedService} from "../../services/shared.service";
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NgxSpinnerService } from 'ngx-spinner';

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
              private socialAuthService: SocialAuthService, private sharedService: SharedService,
              private spinner: NgxSpinnerService) {}

  ngOnDestroy(): void {
    localStorage.removeItem("isUserBot"); // Don't need anymore
  }

  private async sendTokenToServerAsync(): Promise<string> { //
      const token: string | undefined  = await this.recaptchaV3Service.execute('importantAction').toPromise();

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

  public async LogInAsync(e: any): Promise<void>{
    e.preventDefault();
    this.spinner.show();

    if (await this.sendTokenToServerAsync() === "false") {
      let user: LoginModel = {userName: this.userLogin, password: this.userPassword};

      //   await fetch(API_URL + "Login", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(user)
      //   }).then(async (response) => {
      //     if (response.status === 200) {
      //       localStorage.setItem("Login", this.userLogin);
      //       this.router.navigate(['/app/player-options-form']);
      //     } else {
      //       Swal.fire('Oops', 'Incorrect data!', 'error');
      //       this.userLogin = "";
      //       this.userPassword = "";
      //
      //       this.visibility ? this.visibility = !this.visibility : this.visibility;
      //     }
      //     return await response.json();
      //   }).then(async (data) => {
      //     if (data) {
      //       localStorage.setItem("userId", data.id);
      //       localStorage.setItem("userMail", data.email);
      //       localStorage.setItem("Role", data.role);
      //       localStorage.setItem("overallPoints", data.overallPoints);
      //       localStorage.setItem("userLevel", data.level);
      //       localStorage.setItem("points", data.points);
      //       localStorage.setItem("coins", data.coins);
      //       localStorage.setItem("userPhoto", data.photo);
      //
      //       const statusOfAcc = await this.CheckStatusOfAnAccAsync();
      //       if (statusOfAcc) {
      //         await this.UnFreezeAnAccAsync();
      //         Swal.fire('Your account is unfrozen!');
      //       }
      //     }
      //   }).catch((error) => {
      //     console.error("Error in LogInAsync:", error);
      //     Swal.fire("Something went wrong, try again later.");
      //   }).finally(() => {
      //     this.spinner.hide();
      //   });
      // }

      try {
        const response = await fetch(API_URL + "Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        });

        if (response.status === 200) {
          localStorage.setItem("Login", this.userLogin);
          const data = await response.json();

          localStorage.setItem("userId", data.id);
          localStorage.setItem("userMail", data.email);
          localStorage.setItem("Role", data.role);
          localStorage.setItem("overallPoints", data.overallPoints);
          localStorage.setItem("userLevel", data.level);
          localStorage.setItem("points", data.points);
          localStorage.setItem("coins", data.coins);
          localStorage.setItem("userPhoto", data.photo);

          const statusOfAcc = await this.CheckStatusOfAnAccAsync();
          if (statusOfAcc) {
            await this.UnFreezeAnAccAsync();
            Swal.fire('Your account is unfrozen!');
          }

          this.router.navigate(['/app/player-options-form']);
        } else {
          Swal.fire('Oops', 'Incorrect data!', 'error');
          this.userLogin = "";
          this.userPassword = "";

          this.visibility ? this.visibility = !this.visibility : this.visibility;
        }
      } catch (error) {
        console.error("Error in LogInAsync:", error);
        Swal.fire("Something went wrong, try again later.");
      } finally {
        this.spinner.hide();
      }
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
      localStorage.setItem("Username", username);
      localStorage.setItem("UsernameDate", new Date().toISOString());
    }
  }

  public ChangeVisibility(): any {
    if (this.userPassword !== "")
    {
      this.visibility = !this.visibility;
    }
  }

  private async CheckStatusOfAnAccAsync(): Promise<boolean> {
    const response = await fetch(API_URL + `CheckStatusOfAcc?userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "GET",
    });

    const data = await response.json();
    return data;
  }

  private async UnFreezeAnAccAsync(): Promise<void>{
    await fetch(API_URL + `UnfreezeAcc?userId=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    }
    });
  }

  private async DoesUserExistAsync(username: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL2}DoesUserExist?username=${username}`, {
        method: "GET"
      });

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return false;
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error in DoesUserExistAsync:", error);
      return false;
    }
  }

  ngOnInit(): void {
    const access: string | null = localStorage.getItem("Username");

    if (access
      && ((new Date().valueOf() - (new Date(localStorage.getItem("UsernameDate")!)).valueOf())) / (24 * 60 * 60 * 1000) <= 30) {
      this.router.navigate(['/app/player-options-form']);
    }
    else {
      localStorage.clear();
    }

    this.socialAuthService.authState.subscribe(async (user) => {
      const userExists = await this.DoesUserExistAsync(user.name);
      if (!userExists) {
        localStorage.setItem("SocialUserFlag", "false");
        Swal.fire('Oops', 'You do not have an account! Please choose the account type!', 'error');
        this.router.navigate(['/app/choose-account-type-form']);
      } else {
        localStorage.setItem("Login", user.name);
        localStorage.setItem("SocialUser", "true");
        localStorage.setItem("userPhoto", user.photoUrl);
        setTimeout(async () => {
          await this.sharedService.GetUserInfoByUsername(user.name);
        }, 100)
        this.router.navigate(['/app/player-options-form']);
      }
    });
  }
}
