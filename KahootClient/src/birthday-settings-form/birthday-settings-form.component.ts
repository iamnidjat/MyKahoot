import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PopupSuccessFormComponent} from "../popup-success-form/popup-success-form.component";
import {PopupFailureFormComponent} from "../popup-failure-form/popup-failure-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-birthday-settings-form',
  templateUrl: './birthday-settings-form.component.html',
  styleUrls: ['./birthday-settings-form.component.css']
})
export class BirthdaySettingsFormComponent {
  private url: string = "https://localhost:7176/api/v1/Account/";
  constructor(private router: Router, private dialogRef : MatDialog) {
  }

  public changeBirthday(e:any, oldBirthday: string, newBirthday: string, cNewBirthday: string) {
    e.preventDefault();

    if (newBirthday !== cNewBirthday)
    {
      fetch(this.url + `ChangePassword?oldBirthday=${new Date(oldBirthday)}&newBirthday=${new Date(newBirthday)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        this.openSuccessDialog();
        this.router.navigate(['/app/settings-choice-form']);
      });
    }
    else
    {
      this.openFailureDialog();
    }
  }

  openSuccessDialog(){
    this.dialogRef.open(PopupSuccessFormComponent);
  };

  openFailureDialog(){
    this.dialogRef.open(PopupFailureFormComponent);
  };
}
