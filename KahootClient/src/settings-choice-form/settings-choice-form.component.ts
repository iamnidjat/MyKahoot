import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings-choice-form',
  templateUrl: './settings-choice-form.component.html',
  styleUrls: ['./settings-choice-form.component.css']
})
export class SettingsChoiceFormComponent {

  constructor(private router: Router) {
  }

  public ToPasswordChanging(): void{
    this.router.navigate(['/app/settings-form']);
  }

  public ToBirthdayChanging(): void{
    this.router.navigate(['/app/birthday-settings-form']);
  }


  public BackOptions(): void{
    this.router.navigate(['/app/profile-form']);
  }
}
