import {Component, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-player-options-form',
  templateUrl: './player-options-form.component.html',
  styleUrls: ['./player-options-form.component.css']
})
export class PlayerOptionsFormComponent {
  constructor(private router: Router) {
  }
  public BackAuth(): void{
      this.router.navigate(['/app/auth-form']);
  }

  public ToSubjects(): void{
    this.router.navigate(['/app/player-survey-choosing-form']);
  }

  public ToCreateQuiz(): void{
    this.router.navigate(['/app/creating-test-form']);
  }

  public ToProfile(): void{
    this.router.navigate(['/app/profile-form']);
  }
}
