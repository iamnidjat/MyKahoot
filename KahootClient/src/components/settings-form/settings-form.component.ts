import {Component} from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

const API_URL: string = "https://localhost:7176/api/v1/Account/";

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css']
})
export class SettingsFormComponent {
  public oldPassword: string = "";
  public newPassword: string = "";
  public cNewPassword: string = "";
  public visibility1: boolean = false; // for oldPassword value
  public visibility2: boolean = false; // for newPassword value
  public visibility3: boolean = false; // for cNewPassword value

  constructor(private router: Router, private location: Location) {}

  public async changePassword(e: any, oldPassword: string, newPassword: string, cNewPassword: string): Promise<void> {
    e.preventDefault();

    if (!localStorage.getItem("SocialUser")) {
      if (newPassword.length >= 5 && newPassword === cNewPassword)
      {
        await fetch(API_URL + `ChangePassword?login=${localStorage.getItem("Login")}&oldPassword=${oldPassword}&newPassword=${newPassword}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.status == 200)
          {
            Swal.fire('Your password was altered successfully!');
            this.router.navigate(['/app/settings-choice-form']);
          }
          else
          {
            Swal.fire('Oops', 'Incorrect data!', 'error');
            this.ClearChangePasswordInputs();
          }
        });
      }
      else
      {
        Swal.fire('Oops', 'Your password length must be more than 4 and you must confirm your new password correctly!', 'error');
        this.ClearChangePasswordInputs();
      }
    }
    else {
      Swal.fire('Oops', 'You are not eligible to change your password!', 'error');
      this.ClearChangePasswordInputs();
    }
  }

  private ClearChangePasswordInputs(): void
  {
    this.newPassword = '';
    this.cNewPassword = '';
    this.oldPassword = '';
  }

  public ChangeVisibilityOfPasswordField(password: string, propertyName: 'visibility1' | 'visibility2' | 'visibility3'): void {
    if (password !== "")
    {
      this[propertyName] = !this[propertyName];
    }
  }

  public backOptions(): void {
    this.location.back();
  }
}
