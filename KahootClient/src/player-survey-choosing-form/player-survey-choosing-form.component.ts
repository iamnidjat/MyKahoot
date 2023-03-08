import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-player-survey-choosing-form',
  templateUrl: './player-survey-choosing-form.component.html',
  styleUrls: ['./player-survey-choosing-form.component.css']
})

export class PlayerSurveyChoosingFormComponent {
  constructor(private router: Router) {
  }
  public BackOptions(): void{
    this.router.navigate(['/app/player-options-form']);
  }

}
