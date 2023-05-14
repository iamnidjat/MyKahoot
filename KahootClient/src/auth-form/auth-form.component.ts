import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../User'
import {RegisterModel} from "../RegisterModel";
import Swal from "sweetalert2";

const animateOnDivHeight = trigger('animateOnDivHeight', [
  state('firstHeight', style(
    {
      height: '450px'
    }
  )),
  state('lastHeight', style(
    {
      height: '650px'
    }
  )),
  transition('firstHeight => lastHeight', [animate('.5s ease')]),
  transition('lastHeight => firstHeight', [animate('.5s ease')])
]);
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  animations: [animateOnDivHeight]
})

export class AuthFormComponent{
  isChecked: boolean = false;
  private url: string = "https://localhost:7176/api/v1/Account/";
  public flag: boolean = true;
  @ViewChild('Login') nameKey!: ElementRef;
  @ViewChild('newLogin') nameKey2!: ElementRef;
  @ViewChild('Guest') nameKey3!: ElementRef;

  constructor(private el: ElementRef, private router: Router) {
    localStorage.removeItem("Login");
    localStorage.removeItem("newLogin");
    localStorage.removeItem("Username");
  }

  public LogIn(e: any, login: string, password: string): void{
    e.preventDefault();

    let user = new User(login, password);

    if (login !== "" && password !== "")
    {
      fetch(this.url + "Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then((response) => {
        console.log(user.id);
        if (response.status == 200)
        {
          localStorage.setItem("Login",this.nameKey.nativeElement.value)
          this.router.navigate(['/app/player-options-form']);
        }
        else {
          Swal.fire('Oops', 'Incorrect data!', 'error');
        }
      });
    }
    else
    {
      Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }

  public Register(e: any, login: string, password: string, cPassword: string, email: string, birthday: string): void{
    e.preventDefault();

    let registerModel = new RegisterModel(login, password, cPassword, email, new Date(birthday));

    if (password === cPassword && password.length >= 5)
    {
      console.log(JSON.stringify(registerModel));

      fetch(this.url + "Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerModel)
      }).then((response) => {
        if (response.status == 200)
        {
          localStorage.setItem("newLogin", this.nameKey2.nativeElement.value)
          Swal.fire("You registered successfully!");
          this.router.navigate(['/app/player-options-form']);
        }
        else
        {
          Swal.fire('Oops', 'Incorrect data!', 'error');
        }
      });
    }
    else
    {
       Swal.fire('Oops', 'Incorrect data!', 'error');
    }
  }
  public showRegister(e: any): void{
    e.preventDefault();

    this.flag = !this.flag;

    let formToggle = this.el.nativeElement.querySelector(".form-toggle");
    let formPanelOne = this.el.nativeElement.querySelector(".form-panel.one");
    let formPanelTwo = this.el.nativeElement.querySelector(".form-panel.two");

    if (!formToggle.classList.contains('visible'))
    {
      formToggle.classList.add('visible');
    }

    if (!formPanelOne.classList.contains('hidden'))
    {
      formPanelOne.classList.add('hidden');
    }

    if (!formPanelTwo.classList.contains('active'))
    {
      formPanelTwo.classList.add('active');
    }
  }

  public showLogin(e: any): void{
    e.preventDefault();

    this.flag = !this.flag;

    let formToggle = this.el.nativeElement.querySelector(".form-toggle");
    let formPanelOne = this.el.nativeElement.querySelector(".form-panel.one");
    let formPanelTwo = this.el.nativeElement.querySelector(".form-panel.two");

    if (formToggle.classList.contains('visible'))
    {
      formToggle.classList.remove('visible');
    }

    if (formPanelOne.classList.contains('hidden'))
    {
      formPanelOne.classList.remove('hidden');
    }

    if (formPanelTwo.classList.contains('active'))
    {
      formPanelTwo.classList.remove('active');
    }
  }

  public ToForgotPassword(): void{
    this.router.navigate(['/app/forgot-password-form']);
  }

  public SignInAsAGuest(): void{
    localStorage.setItem("Guest", this.nameKey3.nativeElement.innerText);
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  public RememberMe(username: string): void{
    this.isChecked = !this.isChecked;

    if (this.isChecked && username !== "")
    {
      localStorage.setItem("Username", this.nameKey.nativeElement.value)
    }
    else if (!this.isChecked && username !== "")
    {
      sessionStorage.setItem("Username", this.nameKey.nativeElement.value)
    }
    else
    {
      Swal.fire("Oops", "Enter credentials before checking \"Remember me\"", "error"); // !
    }
  }
}
