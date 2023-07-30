import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import Swal from "sweetalert2";
import {LoginModel} from "../LoginModel";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})

export class AuthFormComponent{
  public isChecked: boolean = false;
  public isDisabled: boolean = true;
  private url: string = "https://localhost:7176/api/v1/Account/";
  public flag: boolean = true;
  public Visibility: boolean = false;
  @ViewChild('Login') nameKey!: ElementRef;
  @ViewChild('Guest') nameKey3!: ElementRef;
  @ViewChild('Password') nameKeyPassword!: ElementRef;

  constructor(private el: ElementRef, private router: Router) {
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

  public LogIn(e: any, login: string, password: string): void{
    e.preventDefault();

    let user: LoginModel = new LoginModel(login, password);

    if (login !== "" && password !== "")
    {
      fetch(this.url + "Login", {
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
        localStorage.setItem("Role", JSON.stringify(Object.values(userid)[11]));
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
}
