import {Component, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {RegisterModel} from "../RegisterModel";
@Component({
  selector: 'app-player-options-form',
  templateUrl: './player-options-form.component.html',
  styleUrls: ['./player-options-form.component.css']
})
export class PlayerOptionsFormComponent {
  private url: string = "https://localhost:7176/api/v1/Account/";
  constructor(private router: Router) {
  }
  public BackAuth(e: any): void{
    e.preventDefault();

    fetch(this.url + "Logout", {
      method: "GET"
    }).then((response) => {
      localStorage.removeItem("Login");
      localStorage.removeItem("newLogin");
      localStorage.removeItem("Username");
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
}
