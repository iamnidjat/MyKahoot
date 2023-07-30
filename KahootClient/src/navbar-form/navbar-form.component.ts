import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AppComponent} from "../app/app.component";
import {PlayerOptionsFormComponent} from "../player-options-form/player-options-form.component";

@Component({
  selector: 'app-navbar-form',
  templateUrl: './navbar-form.component.html',
  styleUrls: ['./navbar-form.component.css']
})
export class NavbarFormComponent {
  private variable: AppComponent;
  public username: string = localStorage.getItem("Login")! || localStorage.getItem("newLogin")!;
  private logout: PlayerOptionsFormComponent;

  constructor(private router: Router, _variable: AppComponent, private el: ElementRef,
              _logout: PlayerOptionsFormComponent) {
    this.variable = _variable;
    this.logout = _logout;
  }

  Search(request: string): any{ //!
    if (request !== '')
    {
      switch(request.toLowerCase())
      {
        case 'Home'.toLowerCase(): case 'Main page'.toLowerCase(): case 'MyKahoot'.toLowerCase():
        case 'My Kahoot'.toLowerCase(): case 'Main menu'.toLowerCase(): case 'Menu'.toLowerCase():
          this.router.navigate(['/app/player-options-form']);
          break;
        case 'Create a quiz'.toLowerCase():  case 'Create quiz'.toLowerCase():
        case 'Creating a quiz'.toLowerCase(): case 'Creating quiz'.toLowerCase():
          this.router.navigate(['/app/creating-quiz-option-form']);
          break;
        case 'Play'.toLowerCase(): case 'Play Menu'.toLowerCase():
          this.router.navigate(['/app/player-survey-choosing-form']);
          break;
        case 'Profile'.toLowerCase(): case 'Profile Menu'.toLowerCase():
          this.router.navigate(['/app/profile-form']);
          break;
        case 'About'.toLowerCase(): case 'About us'.toLowerCase():
        case 'About MyKahoot'.toLowerCase():  case 'About My Kahoot'.toLowerCase():
          this.router.navigate(['/app/about-form']);
          break;
        case 'Contact'.toLowerCase(): case 'Contacts'.toLowerCase():
        case 'Contact MyKahoot'.toLowerCase(): case 'Contacts MyKahoot'.toLowerCase():
        case 'Contact My Kahoot'.toLowerCase(): case 'Contacts My Kahoot'.toLowerCase(): //!
          this.router.navigate(['/app/contacts-form']);
          break;
        case 'Stat'.toLowerCase(): case 'Stats'.toLowerCase():
        case 'Statistics'.toLowerCase():
          this.router.navigate(['/app/stats-form']);
          break;
        case 'Top-10'.toLowerCase(): case 'Top-10 rating'.toLowerCase():
        case 'Top-10 result'.toLowerCase(): case 'Top-10 results'.toLowerCase():
          this.router.navigate(['/app/choose-field-form']);
          break;
        case 'My quizzes'.toLowerCase(): case 'My quiz'.toLowerCase():
          this.router.navigate(['/app/my-quizzes-form']);
          break;
        case 'Settings'.toLowerCase(): case 'Setting'.toLowerCase():
          this.router.navigate(['/app/settings-choice-form']);
          break;
        case 'Change password'.toLowerCase():
          this.router.navigate(['/app/settings-form']);
          break;
        case 'Change birthday'.toLowerCase():
          this.router.navigate(['/app/birthday-settings-form']);
          break;
        default:
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
