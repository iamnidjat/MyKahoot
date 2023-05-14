import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.AutoLogin();
  }

    AutoLogin(): void{
    const access = localStorage.getItem("Username") || localStorage.getItem("newLogin");

    if (access) {
      this.router.navigate(['/app/player-options-form']);
    }
  }
}
