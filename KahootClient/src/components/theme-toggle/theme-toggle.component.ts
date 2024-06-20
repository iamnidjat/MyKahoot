import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggleTheme()">
      {{ themeService.isDarkTheme() ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
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
