import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent {
    constructor(private router: Router) {
    }

  public ToSettings(): void{
      this.router.navigate(['/app/settings-choice-form']);
  }

  public ToStats(): void{
    this.router.navigate(['/app/stats-form']);
  }

  public ToTopResults(): void{
    this.router.navigate(['/app/choose-field-form']);
  }

  public BackOptions(): void{
    this.router.navigate(['/app/player-options-form']);
  }

}
