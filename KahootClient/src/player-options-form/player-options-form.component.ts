import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookiesServiceComponent} from "../cookies-service/cookies-service.component";

@Component({
  selector: 'app-player-options-form',
  templateUrl: './player-options-form.component.html',
  styleUrls: ['./player-options-form.component.css']
})

export class PlayerOptionsFormComponent implements OnInit{
  private url: string = "https://localhost:7176/api/v1/Account/";
  role: string = "";
  private cookie: CookiesServiceComponent;

  constructor(private router: Router, private el: ElementRef, _cookie: CookiesServiceComponent) {
    if (localStorage.getItem('Role') === JSON.stringify("Teacher"))
    {
      this.role = 'Teacher';
    }
    else if (localStorage.getItem('Role') === JSON.stringify("Student"))
    {
      this.role = 'Student';
    }

    this.cookie = _cookie;
  }
  public BackAuth(e: any): void{
    e.preventDefault();

    fetch(this.url + "Logout", {
      method: "GET"
    }).then((response) => {
      localStorage.removeItem("Login");
      localStorage.removeItem("newLogin");
      localStorage.removeItem("Username");
      localStorage.removeItem("UsernameDate");
      localStorage.removeItem("Guest");
      localStorage.removeItem("Role");
      // localStorage.removeItem("UserMail");
      // localStorage.removeItem("UserBirthday");
      // localStorage.removeItem("name");
      // localStorage.removeItem("surname");
      // localStorage.removeItem("bMail");

      this.router.navigate(['/app/auth-form']);
    });
  }

  public ToSubjects(): void{
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  public ToCreateQuiz(): void{
    this.router.navigate(['/app/creating-quiz-option-form']);
  }

  public ToProfile(): void{
    this.router.navigate(['/app/profile-form']);
  }

  public ToReadMore(): void{
    window.open('https://openli.com/guides/cookie-consent', "_blank");
  }

  public AcceptCookies(): void{
    this.cookie.setCookie("username", localStorage.getItem("Login")! || localStorage.getItem("newLogin")!, 365);

    let wrapper = this.el.nativeElement.querySelector(".wrapper");

    wrapper.style.display = "none";
  }

  public DeclineCookies(): void{
    this.cookie.setCookie("username", localStorage.getItem("Login")! || localStorage.getItem("newLogin")!, 0);

    let wrapper = this.el.nativeElement.querySelector(".wrapper");

    wrapper.style.display = "none";
  }

  ngOnInit(): void {
    if (this.cookie.checkCookie("username") == (localStorage.getItem("Login")! || localStorage.getItem("newLogin")!))
    {
      let wrapper = this.el.nativeElement.querySelector(".wrapper");

      wrapper.style.display = "none";
    }
  }
}
