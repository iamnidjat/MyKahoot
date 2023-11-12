import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import Swal from "sweetalert2";
import {LoginModel} from "../LoginModel";
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {DeletedAcc} from "../DeletedAcc";
import {User} from "../User";
import {SocialUser} from "../SocialUser";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})

export class AuthFormComponent implements OnInit{
  public isChecked: boolean = false;
  public isDisabled: boolean = true;
  private url: string = "https://localhost:7176/api/v1/Account/";
  private url2: string = "https://localhost:7176/api/v1/UserInfo/";
  public flag: boolean = true;
  public Visibility: boolean = false;
  @ViewChild('Login') nameKey!: ElementRef;
  @ViewChild('Guest') nameKey3!: ElementRef;
  @ViewChild('Password') nameKeyPassword!: ElementRef;

  constructor(private el: ElementRef, private router: Router, private socialAuthService: SocialAuthService) {
    //localStorage.removeItem("Login");
   // localStorage.removeItem("Username");
    localStorage.removeItem("Guest");
    localStorage.removeItem("userId");
   // localStorage.removeItem("Role");
    localStorage.removeItem("RandomLogin");
    localStorage.removeItem("newLogin");
    localStorage.removeItem("testFormat");
    localStorage.removeItem("Guest");

    // const access: string | null = localStorage.getItem("Username") && localStorage.getItem("CurrentUsage");
    const access: string | null = localStorage.getItem("Username");

    if (access
      && (+new Date().valueOf() - (+new Date(localStorage.getItem("UsernameDate")!)).valueOf()) / (24 * 60 * 60 * 1000) <= 30) {
      this.router.navigate(['/app/player-options-form']);
    }
    else {
      localStorage.removeItem("Username");
      localStorage.removeItem("UsernameDate");
      localStorage.removeItem("Login");
    }
  }

  public async LogIn(e: any, login: string, password: string): Promise<void>{
    e.preventDefault();

    let user: LoginModel = new LoginModel(login, password);

    if (login !== "" && password !== "")
    {
        await fetch(this.url + "Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then((response) => {
        if (response.status == 200)
        {
          localStorage.setItem("Login",this.nameKey.nativeElement.value)
          this.router.navigate(['/app/player-options-form']);
        }
        else
        {
          Swal.fire('Oops', 'Incorrect data!', 'error');
          this.ClearLoginInputs();

          if (this.Visibility)
          {
            this.Visibility = !this.Visibility;
          }
        }
        return response.json();
    }).then((data) => {
        let userid = JSON.parse(JSON.stringify(data));
        localStorage.setItem("userId", JSON.stringify(Object.values(userid)[0]));
        localStorage.setItem("userMail", JSON.stringify(Object.values(userid)[8]));
        localStorage.setItem("Role", JSON.stringify(Object.values(userid)[13]));
        localStorage.setItem("photoURL", JSON.stringify(Object.values(userid)[15]));

        if (this.CheckStatusOfAnAcc(e))
        {
          this.UnFreezeAnAcc(e, parseInt(localStorage.getItem("userId")!));
        }
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
      this.ClearLoginInputs();

      if (this.Visibility)
      {
        this.Visibility = !this.Visibility;
      }
    }
  }

  public ToRegisterForm(): void{
    this.router.navigate(['/app/choose-account-type-form']);
  }
  public ToForgotPassword(): void{
    this.router.navigate(['/app/forgot-password-form']);
  }

  public SignInAsAGuest(): void{
    localStorage.setItem("Guest", this.nameKey3.nativeElement.innerText);
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  public IsLoginFieldEmpty(): any{
      this.isDisabled = !this.isDisabled;
  }

  public RememberMe(username: string): void{
    this.isChecked = !this.isChecked;

    if (this.isChecked && username !== "") {
      localStorage.setItem("Username", this.nameKey.nativeElement.value);
      localStorage.setItem("UsernameDate", new Date().toLocaleDateString());
    }
    else if (!this.isChecked && username !== "")
    {
      sessionStorage.setItem("Username", this.nameKey.nativeElement.value);
    }
  }

  public ChangeVisibility(): any {
    if (this.nameKeyPassword.nativeElement.value !== "")
    {
      this.Visibility = !this.Visibility;
    }
  }

  private ClearLoginInputs(): any
  {
    this.nameKey.nativeElement.value = '';
    this.nameKeyPassword.nativeElement.value = '';
  }

  private CheckStatusOfAnAcc(e: any): boolean{
    e.preventDefault();

    fetch(this.url + `CheckStatusOfAcc?username=${parseInt(localStorage.getItem("Login")!)}`, {
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("IsFrozen", JSON.parse(JSON.stringify(data)));
    });

    return JSON.parse(localStorage.getItem("IsFrozen")!);
  }

  private async UnFreezeAnAcc(e: any, userId: number): Promise<void>{
    e.preventDefault();

    await fetch(this.url + `UnfreezeAcc?userId=${userId}`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    }
    });
  }

  private DoesUserExist(username: string): boolean{
    fetch(this.url2 + `DoesUserExist?username=${username}`, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem("DoesUserExist", JSON.parse(JSON.stringify(data)));
    });

    return JSON.parse(localStorage.getItem("DoesUserExist")!);
  }

  private async GetUserInfo(username: string): Promise<void>{
    await fetch(this.url2 + `GetUserInfoByUsernameAsync?username=${username}`, {
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

  ngOnInit(): void { // !
    this.socialAuthService.authState.subscribe((user) => {
      if (!this.DoesUserExist(user.name))
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
        this.GetUserInfo(user.name);
        this.router.navigate(['/app/player-options-form']);
      }
    });
  }

  // public async DeleteAcc(e: any): Promise<void>{
  //   e.preventDefault();
  //
  //   let deletedAcc: DeletedAcc = new DeletedAcc(localStorage.getItem('Login')! || localStorage.getItem('newLogin')!, localStorage.getItem('userMail')!, "Freezing time expired");
  //
  //   await fetch(this.url + `DeleteAcc?userId=${localStorage.getItem('userId')!}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(deletedAcc)
  //   }).then((response) => {
  //
  //   });
  // }
  //
  // public async SendingNotification(e: any): Promise<void>{
  //   e.preventDefault();
  //
  //   await fetch(this.url + `SendingNotification?username=${localStorage.getItem('Login')!}&email=${localStorage.getItem('userMail')!}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  // }
}
