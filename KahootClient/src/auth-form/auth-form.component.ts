import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router'; // for navigation
import { trigger, state, style, animate, transition } from '@angular/animations';

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

export class AuthFormComponent {
  //isChecked: boolean = false;
  public flag: boolean = true;
  @ViewChild('Login') nameKey!: ElementRef;
  constructor(private el: ElementRef, private router: Router) {
  }


  public LogIn(login: string, password: string): void{
    if (login === "admin" && password === "admin"){
      localStorage.setItem("Login",this.nameKey.nativeElement.value)
      this.router.navigate(['/app/player-options-form']); // навигация (~ RedirectToAction() in asp)
    }
  }

  public Register(login: string, password: string, cPassword: string, mail: string): void{

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

  public RememberMe(username: string): void{
    alert(username);
  }
}
