import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme: string = 'dark';
  private lightTheme: string = 'light';

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.lightTheme);
    }
  }

  public setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  public toggleTheme() {
    const currentTheme = localStorage.getItem('theme') === this.darkTheme ? this.lightTheme : this.darkTheme;
    this.setTheme(currentTheme);
  }

  public isDarkTheme() {
    return localStorage.getItem('theme') === this.darkTheme;
  }
}
