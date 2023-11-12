import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AppComponent} from "../app/app.component";
import {PlayerOptionsFormComponent} from "../player-options-form/player-options-form.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-navbar-form',
  templateUrl: './navbar-form.component.html',
  styleUrls: ['./navbar-form.component.css']
})

export class NavbarFormComponent implements OnInit{
  private variable: AppComponent;
  public username: string = localStorage.getItem("Login")! || localStorage.getItem("newLogin")!;
  private logout: PlayerOptionsFormComponent;
  public flag: boolean = false;
  public imageURL: string = "/assets/images/user.png";

  constructor(private router: Router, _variable: AppComponent, private el: ElementRef,
              _logout: PlayerOptionsFormComponent, public sanitizer: DomSanitizer) {
    this.variable = _variable;
    this.logout = _logout;
  }

  ngOnInit(): void {
     // this.imageURL = "http://localhost:4200/KahootWebApi//" + localStorage.getItem("photoURL")!.slice(1, localStorage.getItem("photoURL")!.length - 1);
      //alert(this.imageURL);
    if (localStorage.getItem("photoURL") != null)
    {
      this.imageURL = localStorage.getItem("photoURL")!;
    }
  }

  Search(request: string): any{ //!
    if (request !== '')
    {
      if (request.toLowerCase().includes("home") || request.toLowerCase().includes("menu") ||
        request.toLowerCase().includes("main") || request.toLowerCase().includes("меню") ||
        request.toLowerCase().includes("главное") || request.toLowerCase().includes("menü") ||
        request.toLowerCase().includes("əsas"))
      {
        this.router.navigate(['/app/player-options-form']);
      }
      else if (request.toLowerCase().includes("create") || request.toLowerCase().includes("creating") ||
        request.toLowerCase().includes("quiz") || request.toLowerCase().includes("создать") ||
        request.toLowerCase().includes("создание") || request.toLowerCase().includes("викторину") ||
        request.toLowerCase().includes("викторины")|| request.toLowerCase().includes("viktorina")
        || request.toLowerCase().includes("yaratmaq"))
      {
        this.router.navigate(['/app/creating-quiz-option-form']);
      }
      else if (request.toLowerCase().includes("play") || request.toLowerCase().includes("играть") ||
        request.toLowerCase().includes("oyna"))
      {
        this.router.navigate(['/app/player-survey-choosing-form']);
      }
      else if (request.toLowerCase().includes("profile") || request.toLowerCase().includes("профиль") ||
        request.toLowerCase().includes("profil"))
      {
        this.router.navigate(['/app/profile-form']);
      }
      else if (request.toLowerCase().includes("about") || request.toLowerCase().includes("про") ||
        request.toLowerCase().includes("нас") || request.toLowerCase().includes("bizim") || request.toLowerCase().includes("haqqında"))
      {
        this.router.navigate(['/app/about-form']);
      }
      else if (request.toLowerCase().includes("contact") || request.toLowerCase().includes("связь") ||
        request.toLowerCase().includes("əlaqə") || request.toLowerCase().includes("help")
        || request.toLowerCase().includes("support") || request.toLowerCase().includes("помощь")
        || request.toLowerCase().includes("поддержка") || request.toLowerCase().includes("kömək") || request.toLowerCase().includes("dəstək"))
      {
        this.router.navigate(['/app/contacts-form']);
      }
      else if (request.toLowerCase().includes("contact list") || request.toLowerCase().includes("data") ||
        request.toLowerCase().includes("данные") || request.toLowerCase().includes("informasiya"))
      {
        this.router.navigate(['/app/contact-list-form']);
      }
      else if (request.toLowerCase().includes("stat") || request.toLowerCase().includes("статистика") ||
        request.toLowerCase().includes("statistika"))
      {
        this.router.navigate(['/app/stats-form']);
      }
      else if (request.toLowerCase().includes("top") || request.toLowerCase().includes("топ") ||
        request.toLowerCase().includes("10") || request.toLowerCase().includes("rating")
        || request.toLowerCase().includes("reytinq") || request.toLowerCase().includes("рейтинг"))
      {
        this.router.navigate(['/app/choose-field-form']);
      }
      else if (request.toLowerCase().includes("quizzes") || request.toLowerCase().includes("my") ||
        request.toLowerCase().includes("мои") || request.toLowerCase().includes("mənim"))
      {
        this.router.navigate(['/app/my-quizzes-form']);
      }
      else if (request.toLowerCase().includes("edit") || request.toLowerCase().includes("редакт") ||
        request.toLowerCase().includes("redakt"))
      {
        this.router.navigate(['/app/my-profile-form']);
      }
      else if (request.toLowerCase().includes("delete") || request.toLowerCase().includes("удалить") ||
        request.toLowerCase().includes("silmək"))
      {
        this.router.navigate(['/app/delete-acc-form']);
      }
      else if (request.toLowerCase().includes("settings") || request.toLowerCase().includes("настройки") ||
        request.toLowerCase().includes("ayarlar"))
      {
        this.router.navigate(['/app/settings-choice-form']);
      }
      else if (request.toLowerCase().includes("change") || request.toLowerCase().includes("изменить") ||
        request.toLowerCase().includes("dəyiş"))
      {
        this.router.navigate(['app/settings-choice-form']);
      }
      else{
        Swal.fire('Oops', 'Incorrect data!', 'error');
      }
    }
  }

  switchLang(lang: string): void {
    this.variable.switchLang(lang);
  }

  toggleMenu(): void{
    let subMenu = this.el.nativeElement.querySelector("#subMenu");

    subMenu.classList.toggle("open-menu");
  }

  ToProfile(): void{
    this.router.navigate(['/app/my-profile-form']);
  }

  ToSendFeedback(): void{
    this.router.navigate(['/app/contacts-form']);
  }

  ToSettings(): void{
    this.router.navigate(['/app/settings-choice-form']);
  }

  ToDeleteAcc(): void{
    this.router.navigate(['/app/delete-acc-form']);
  }

  OpenPhotoModalWindow(): void{
    this.flag = true;
  }

  Logout(e: any): void{
    this.logout.BackAuth(e);
  }
  changeTheme(): void{
    // if (localStorage.getItem("mode") !== "dark") {
    //   localStorage.setItem("mode", "dark");
    // }
    // else {
    //   localStorage.setItem("mode", "light");
    // }
  }
}
