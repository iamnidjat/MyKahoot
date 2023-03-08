import { Component, ElementRef } from '@angular/core';
import {Router} from '@angular/router'; // for navigation

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})

export class AuthFormComponent {
  constructor(private el: ElementRef, private router: Router) {
  }

  public LogIn(login: string, password: string): void{
    if (login === "admin" && password === "admin"){
      this.router.navigate(['/app/player-options-form']); // навигация (~ RedirectToAction() in asp)
    }
  }
  public showRegister(e: any): void{
    e.preventDefault();

    let panelTwo: any = this.el.nativeElement.querySelector(".form-panel.two").scrollHeight;
    let formToggle = this.el.nativeElement.querySelector(".form-toggle");
    let formPanelOne = this.el.nativeElement.querySelector(".form-panel.one");
    let formPanelTwo = this.el.nativeElement.querySelector(".form-panel.two");
    let form = this.el.nativeElement.querySelector(".form");

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

    form.animate({
      'height': panelTwo
    }, 200);
  }

  public showLogin(e: any): void{
    e.preventDefault();

    let panelOne: any = this.el.nativeElement.querySelector(".form-panel.two").offsetHeight;
    let formToggle = this.el.nativeElement.querySelector(".form-toggle");
    let formPanelOne = this.el.nativeElement.querySelector(".form-panel.one");
    let formPanelTwo = this.el.nativeElement.querySelector(".form-panel.two");
    let form = this.el.nativeElement.querySelector(".form");

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

    form.animate({
      'height': panelOne
    }, 200);
  }
}
