import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');

    if (localStorage.getItem("lang") === "en")
    {
      translate.use('en');
    }
    else if (localStorage.getItem("lang") === "ru")
    {
      translate.use('ru');
    }
    else if (localStorage.getItem("lang") === "az")
    {
      translate.use('az');
    }
  }

  ngOnInit(): void {

  }

  public switchLang(lang: string): void{
    this.translate.use(lang);
    //localStorage.setItem("lang", lang);
  }
}
