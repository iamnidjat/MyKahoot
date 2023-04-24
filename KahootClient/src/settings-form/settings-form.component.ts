import {Component, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {PopupFailureFormComponent} from "../popup-failure-form/popup-failure-form.component";
import {PopupSuccessFormComponent} from "../popup-success-form/popup-success-form.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css']
})
export class SettingsFormComponent {
 // @Injectable();
  public flag: boolean = false;
  private url: string = "https://localhost:7176/api/v1/Account/";

  constructor(private router: Router, private dialogRef : MatDialog) {
  }

  public changePassword(e: any, oldPassword: string, newPassword: string, cNewPassword: string)
  {
    e.preventDefault();

    if (newPassword === cNewPassword)
    {
      fetch(this.url + `ChangePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        this.openSuccessDialog();
      });
      //this.router.navigate(['/app/settings-choice-form']);
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
