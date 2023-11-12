import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PlayerOptionsFormComponent} from "../player-options-form/player-options-form.component";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})

export class ProfileFormComponent {
  role: string = "";
    constructor(private router: Router, private _originalRole: PlayerOptionsFormComponent) {
      this.role = _originalRole.role;
    }

  public ToSettings(): void{
      this.router.navigate(['/app/settings-choice-form']);
  }

  public ToStats(): void{
    localStorage.setItem("ToStats", "ToStats");
    this.router.navigate(['/app/choose-field-form']);
  }

  public ToTopResults(): void{
    this.router.navigate(['/app/choose-field-form']);
  }

  public ToYourQuizzes(): void{
    this.router.navigate(['/app/my-quizzes-form']);
  }

  public BackOptions(): void{
    this.router.navigate(['/app/player-options-form']);
  }
}
