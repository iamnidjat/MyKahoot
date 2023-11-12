import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

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
    localStorage.setItem("lang", lang);
  }
}
