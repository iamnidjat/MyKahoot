import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <button (click)="toggleTheme()" [ngClass]="{'theme-switch-button': true, 'light-theme': !themeService.isDarkTheme(), 'dark-theme': themeService.isDarkTheme()}">
      <i class="fas fa-sun"></i>
      <i class="fas fa-moon"></i>
      <div class="toggle"></div>
    </button>
  `,
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
