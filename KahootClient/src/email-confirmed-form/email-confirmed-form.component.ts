import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-email-confirmed-form',
  templateUrl: './email-confirmed-form.component.html',
  styleUrls: ['./email-confirmed-form.component.css']
})
export class EmailConfirmedFormComponent implements OnInit{
  private url: string = "https://localhost:7176/api/v1/CredentialsChanging/";
  constructor() {
  }

  ngOnInit(): void {
    this.setFlagToTrue();
  }

  private setFlagToTrue(): void{
    fetch(this.url + `ChangeEmailConfirmationChangingToTrue?id=${parseInt(localStorage.getItem("userId")!)}`, {
      method: "POST",
        headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
