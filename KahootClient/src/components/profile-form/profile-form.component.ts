import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit{
  public userRole: string = localStorage.getItem('Role')!;

  constructor(private router: Router) {}

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

  public ToLeaderBoard(): void{
    this.router.navigate(['/app/leaderboard']);
  }

  public ToYourQuizzes(): void{
    this.router.navigate(['/app/my-quizzes-form']);
  }

  public BackOptions(): void{
    this.router.navigate(['/app/player-options-form']);
  }

  ngOnInit(): void {
     localStorage.removeItem("ToStats"); // Don't need anymore
  }
}
