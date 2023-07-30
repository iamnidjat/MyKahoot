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
    translate.use('en');
  }
  ngOnInit(): void {

  }

  public switchLang(lang: string): void{
    this.translate.use(lang);
  }
}
